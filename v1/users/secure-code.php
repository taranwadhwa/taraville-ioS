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
	  $check_code_entry = mysqli_query($dbLink,"select id from secure_messages_code where user_id='".mysqli_real_escape_string($dbLink,$data->uid)."'");
	  if(mysqli_num_rows($check_code_entry)==0)
	  {
        $ins_sql = "insert into secure_messages_code(user_id,secure_code)VALUES('".mysqli_real_escape_string($dbLink,$data->uid)."','".mysqli_real_escape_string($dbLink,$data->secure_lock_code)."')";
	    mysqli_query($dbLink,$ins_sql);
	      
	  }
	  else
	  {
	      $update_qry = "update secure_messages_code set secure_code='".mysqli_real_escape_string($dbLink,@$data->secure_lock_code)."' where user_id='".mysqli_real_escape_string($dbLink,$data->uid)."'";
          mysqli_query($dbLink,$update_qry);    
            	      
	  }
	   echo json_encode(array("response"=>200,"status"=>"OK","secure_code"=>@$data->secure_lock_code));
	
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