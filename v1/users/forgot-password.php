<?php
require_once __DIR__ . '../../common/config.ini';
require_once __DIR__ . '../../db/connection.php';
require_once __DIR__ . '../../common/functions.php';
$dbLink = connectDatabase();

$data = json_decode(file_get_contents('php://input'));

if(!empty($data->email) and filter_var($data->email, FILTER_VALIDATE_EMAIL))
{	
	$chk = rowCount('users','email',$data->email,$dbLink);
	if($chk > 0)
	{
	// Email send to the user //
		$row = fetchRowColumn('users','email',$data->email,$dbLink,array("id","name","email"));
		$message = '';
		
		$message .= "Hello <strong>".$row->name."</strong>.<br><br>";
		
		$message .= "Please click on below link to reset your password.<br><br>";
		
		$message .= '<tr>';
		$message .= '<td><a href="https://www.happydelivers.com/new-user-password.php?uid='.base64_encode($row->id).'" style="background-color:#FB4848; color:#fff; padding:3px;">CLICK HERE</a></td>';
		$message .= '</tr>';
		
		$message .= '<br>';
		
		$message .= "Thanks<br><br>";
		
		$to = $data->email;
		$subject = "Reset password notification - Happy Delivers";
		
		$headers = "MIME-Version: 1.0" . "\r\n";
		$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
		$headers .= 'From: <info@happydelivers.com>' . "\r\n";
		@mail($to,$subject,$message,$headers);
	
	// Email send to the user ends //
		echo json_encode(array("response"=>200,"status"=>"OK","message"=>"Please check your inbox for reset your new password."));
		exit;	
	
	}
	else
	{
		echo json_encode(array("response"=>402,"status"=>"INVALID","message"=>"Entered email does not exists."));
		exit;
	}		
	
}
else
{
	echo json_encode(array("response"=>400,"status"=>"bad request"));
	exit;

}
?>