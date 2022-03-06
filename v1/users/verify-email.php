<?php
require_once __DIR__ . '../../common/config.ini';
require_once __DIR__ . '../../db/connection.php';
require_once __DIR__ . '../../common/functions.php';
$dbLink = connectDatabase();

$data = json_decode(file_get_contents('php://input'));

if(!empty($data->email) and filter_var($data->email, FILTER_VALIDATE_EMAIL))
{
	$verify = rowCount('users','email',$data->email,$dbLink);		
	if($verify == 0)
	{															
		echo json_encode(array("response"=>200,"status"=>"OK","message"=>"Entered email is available for use."));
		exit;	
	}
	else
	{
		echo json_encode(array("response"=>401,"status"=>"Error","message"=>"Entered email is already registered.This can not be added."));
		exit;
	}
	
}
else
{
	echo json_encode(array("response"=>400,"status"=>"bad request"));
	exit;

}
?>