<?php
require_once __DIR__ .'../../config/config.ini';
require_once __DIR__ .'../../db/connection.php';
require_once __DIR__ .'../../common/functions.php';
$dbLink = connectDB();

$data = json_decode(file_get_contents('php://input'));

if(!empty($data->user_token))
{	
	$query_fire = mysqli_query($dbLink,"select id,plan_id from tbl_registration where token='".mysqli_real_escape_string($dbLink,$data->user_token)."' 
	and id='".mysqli_real_escape_string($dbLink,$data->uid)."'");
	$chk = mysqli_num_rows($query_fire);
	if($chk > 0)
	{
		// Check payment status of this user //
		$chk_ps = mysqli_query($dbLink,"select id from tbl_registration where id='".mysqli_real_escape_string($dbLink,$data->uid)."' and payment_status='Unpaid'");
		if(mysqli_num_rows($chk_ps)>0)
		{
		    $cs_query = mysqli_query($dbLink,"select * from tbl_common_settings where id='1'");
		    $row_cs = mysqli_fetch_object($cs_query);
		    
		    $pshead=$row_cs->popup_after_head;
		    $pstext=$row_cs->popup_after;
		    
		}
		else
		{
		    $cs_query = mysqli_query($dbLink,"select * from tbl_common_settings where id='1'");
		    $row_cs = mysqli_fetch_object($cs_query);
		    
		    $pshead=$row_cs->popup_before_head;
		    $pstext=$row_cs->popup_before;
		    
		}
		 echo json_encode(array("response"=>200,"status"=>"OK","head_text"=>$pshead,"further_text"=>$pstext));
	    
	    
	}
	else
	{
		echo json_encode(array("response"=>402,"status"=>"Unauthorize user or your session has been expired.Please logout and login again."));
		exit;
	
	}						
	
}
else
{
	echo json_encode(array("response"=>400,"status"=>"Bad request"));
	exit;

}
?>