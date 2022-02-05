<?php
require_once __DIR__ .'../../config/config.ini';
require_once __DIR__ .'../../db/connection.php';
require_once __DIR__ .'../../common/functions.php';
$dbLink = connectDB();

$data = json_decode(file_get_contents('php://input'));

if(!empty($data->user_token))
{	
	$query_fire = mysqli_query($dbLink,"select id from tbl_registration where token='".mysqli_real_escape_string($dbLink,$data->user_token)."' 
	and id='".mysqli_real_escape_string($dbLink,$data->uid)."'");
	$chk = mysqli_num_rows($query_fire);
	if($chk > 0)
	{
		$listing = array();

		$query_listing = mysqli_query($dbLink,"select tcl.*,DATE_FORMAT(tcl.date_added, '%b %d, %Y')as fdate_added from tbl_call_logs tcl where user_id='".mysqli_real_escape_string($dbLink,$data->uid)."' 
		and (name LIKE '%".mysqli_real_escape_string($dbLink,trim($data->search_txt))."%' or phone ='".mysqli_real_escape_string($dbLink,trim($data->search_txt))."'
		or email LIKE '%".mysqli_real_escape_string($dbLink,trim($data->search_txt))."%')");
		if(mysqli_num_rows($query_listing)>0)
		{
			while($row_list = mysqli_fetch_object($query_listing)){
				array_push($listing,$row_list);			
			}
			echo json_encode(array("response"=>200,"status"=>"OK","listing"=>$listing));
			exit;
			
		}
		else{
			echo json_encode(array("response"=>202,"status"=>"EMPTY"));
			exit;
		}
		
		
	}
	else
	{
		echo json_encode(array("response"=>402,"status"=>"Unauthorize user."));
		exit;
	
	}						
	
}
else
{
	echo json_encode(array("response"=>400,"status"=>"Bad request"));
	exit;

}
?>