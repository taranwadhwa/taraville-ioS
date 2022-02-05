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
	   $number_rows_chk = mysqli_query($dbLink,"select id from push_notification_settings where user_id='".mysqli_real_escape_string($dbLink,$data->uid)."' and status_type='".mysqli_real_escape_string($dbLink,$data->status_type)."'");		
       if(mysqli_num_rows($number_rows_chk)==0)
       {
           if(isset($data->enable_status) and $data->enable_status==true){$enabled=0;}else{$enabled=1;}
           $sql_ins = "insert into push_notification_settings(user_id,status_type,isEnabled)VALUE('".mysqli_real_escape_string($dbLink,$data->uid)."','".mysqli_real_escape_string($dbLink,$data->status_type)."','".$enabled."')";
           mysqli_query($dbLink,$sql_ins);
           
       }
       else
       {
           if(isset($data->enable_status) and $data->enable_status==true){$enabled=0;}else{$enabled=1;}
           $sql_up = "update push_notification_settings set isEnabled='".$enabled."' where user_id='".mysqli_real_escape_string($dbLink,$data->uid)."' and status_type='".mysqli_real_escape_string($dbLink,$data->status_type)."'";
           mysqli_query($dbLink,$sql_up);
           
           
       }
       echo json_encode(array("response"=>200,"status"=>"OK","isEnabled"=>$enabled));
	   exit;
	
	}
	else
	{
		echo json_encode(array("response"=>400,"status"=>"Unauthorize user."));
		exit;
	
	}		
		
	
	
}
else
{
	echo json_encode(array("response"=>400,"status"=>"bad request"));
	exit;

}

?>