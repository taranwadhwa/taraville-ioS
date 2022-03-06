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
		$sql_count_qry = mysqli_query($dbLink,"select count(id) as numOfMessages from tbl_call_logs 
		where msg_read_status='Unread' and user_id='".mysqli_real_escape_string($dbLink,$data->uid)."'");
		$row_cnt_msg = mysqli_fetch_object($sql_count_qry);
	    
	    echo json_encode(array("response"=>200,"status"=>"OK","badge_cnt"=>$row_cnt_msg->numOfMessages));
		exit;	
       
	
		
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