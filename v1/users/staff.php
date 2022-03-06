<?php
require_once __DIR__ .'../../config/config.ini';
require_once __DIR__ .'../../db/connection.php';
require_once __DIR__ .'../../common/functions.php';
$dbLink = connectDB();

$data = json_decode(file_get_contents('php://input'));

if(!empty($data->user_token))
{	
	
	if (filter_var($data->email, FILTER_VALIDATE_EMAIL))
	{
    	$query_fire = mysqli_query($dbLink,"select id from tbl_registration where token='".mysqli_real_escape_string($dbLink,$data->user_token)."' 
    	and id='".mysqli_real_escape_string($dbLink,$data->uid)."'");
    	$chk = mysqli_num_rows($query_fire);
    	if($chk > 0)
    	{				
    		$staff_email_cnt = rowCount('tbl_staff','email',$data->email,$dbLink);
    		if($staff_email_cnt==0){
    			insert('tbl_staff',array("uid","user_token","full_name","position","email","phone"),
    			array(validation_post($data->uid,$dbLink),validation_post($data->user_token,$dbLink),
    			validation_post($data->full_name,$dbLink),validation_post($data->position,$dbLink),
    			validation_post($data->email,$dbLink),validation_post($data->phone,$dbLink)),$dbLink);		
    	
    			echo json_encode(array("response"=>200,"status"=>"OK"));
    			exit;	
    			
    		}
    		else{
    			echo json_encode(array("response"=>202,"status"=>"EXISTS"));
    			exit;			
    		}
    		
    	}
    	else
    	{
    		echo json_encode(array("response"=>402,"status"=>"Unauthorize user."));
    		exit;
    	
    	}
    	
	}
	else{
    	echo json_encode(array("response"=>402,"status"=>"Invalid email."));
		exit;
	}
	
}
else
{
	echo json_encode(array("response"=>400,"status"=>"Bad request"));
	exit;

}
?>