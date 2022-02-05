<?php
require_once __DIR__ .'../../config/config.ini';
require_once __DIR__ .'../../db/connection.php';
require_once __DIR__ .'../../common/functions.php';
$dbLink = connectDB();

$data = json_decode(file_get_contents('php://input'));

if(!empty($data->email))
{
	if (filter_var($data->email, FILTER_VALIDATE_EMAIL)) 
	{
		$chk = rowCount('tbl_registration','email',$data->email,$dbLink);
		if($chk > 0)
		{
	       // Email notification //
	        $sql_query = mysqli_query($dbLink,"select name,id from tbl_registration where email='".mysqli_real_escape_string($dbLink,$data->email)."'");
	        $row_email = mysqli_fetch_object($sql_query);
            
            $e_content = "Hello <strong>".$row_email->name."</strong><br><br>";
            $e_content .= "Please <a href='https://tarasoffice.com/reset-password.php?mid=".$row_email->id."'>click here</a> to reset your password.<br><br>";
            $e_content .= "Regards<br><br>";
            $e_content .= "Taras office";
            $from_email = "info@tarasoffice.com";
            
            $headers = "From: " . $from_email . PHP_EOL;
            $headers .= "MIME-Version: 1.0" . PHP_EOL;
            $headers .= "Content-type: text/html; charset=utf-8" . PHP_EOL;
            $mail = mail($data->email, 'Reset password notification - Taras office', $e_content, $headers);
	    
		    echo json_encode(array("response"=>200,"status"=>"OK"));
		    exit;	
			
		}
		else
		{
			echo json_encode(array("response"=>402,"status"=>"Entered email does not exists."));
			exit;
		
		}		
		
	}
	else
	{
		echo json_encode(array("response"=>400,"status"=>"Invalid email format."));
		exit;
	}
	
}
else
{
	echo json_encode(array("response"=>400,"status"=>"bad request"));
	exit;

}
?>