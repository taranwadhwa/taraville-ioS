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
		if($data->message_id)
		{
			$chk_unlock_code =  mysqli_query($dbLink,"select id from secure_messages_code where secure_code='".mysqli_real_escape_string($dbLink,$data->private_code)."' 
			and user_id='".mysqli_real_escape_string($dbLink,$data->uid)."'");			
			$chk_code = mysqli_num_rows($chk_unlock_code);
			if($chk_code > 0)
			{	
				$update_message = mysqli_query($dbLink,"update tbl_call_logs set message_type='No' where id='".mysqli_real_escape_string($dbLink,$data->message_id)."' 
				and user_id='".mysqli_real_escape_string($dbLink,$data->uid)."'");
				
				echo json_encode(array("response"=>200,"status"=>"OK"));
				exit;			
			
			}
			else{
				echo json_encode(array("response"=>202,"status"=>"INVALID"));
				exit;
			
			}
			
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