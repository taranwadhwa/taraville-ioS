<?php
require_once __DIR__ .'../../config/config.ini';
require_once __DIR__ .'../../db/connection.php';
require_once __DIR__ .'../../common/functions.php';
$dbLink = connectDB();

$data = json_decode(file_get_contents('php://input'));

if(!empty($data->user_token))
{	
	$chk = rowCount('tbl_registration','token',$data->user_token,$dbLink);
	if($chk > 0)
	{
	    $row = fetchRowColumn('tbl_registration','id',$data->uid,$dbLink,array("password"));
		$verify = password_verify($data->password,$row->password);
		if($verify > 0)
		{								
		    $update_qry = mysqli_query($dbLink,"update secure_messages_code set IsAuthView='Yes',auth_view_date='".date('Y-m-d')."' where user_id='".mysqli_real_escape_string($dbLink,$data->uid)."'");
		    
		    echo json_encode(array("response"=>200,"status"=>"OK"));
		    exit;
		    
		}
		else
		{
		    echo json_encode(array("response"=>401,"status"=>"Invalid password."));
			exit;
		}
	
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