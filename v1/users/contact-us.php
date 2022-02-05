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
		    $row = fetchRowColumn('tbl_registration','id',$data->uid,$dbLink,array("id","name","email","business","phone"));
		
		    $e_content = "Hello <strong>Administrator</strong><br><br>";
            $e_content .= "Contact form enquiry has been submitted on ". date('Y-m-d')." Below is the user information.<br><br>";
            $e_content .="<strong>Name:  ".$row->name."</strong><br><br>";
            $e_content .="<strong>Email: ".$row->email."</strong><br><br>";
            $e_content .="<strong>Business name: ".$row->business."</strong><br><br>";
            $e_content .="<strong>Phone #: ".$row->phone."</strong><br><br>";
            $e_content .="<strong>Reason: ".$data->labelTwo."</strong><br><br>";
            $e_content .="<strong>Comments: ".$data->comments."</strong><br><br>";
            
            $e_content .= "Regards<br><br>";
            $e_content .= "Taras office";
            $from_email = "info@tarasoffice.com";
            
            $headers = "From: " . $from_email . PHP_EOL;
            $headers .= "MIME-Version: 1.0" . PHP_EOL;
            $headers .= "Content-type: text/html; charset=utf-8" . PHP_EOL;
            $mail = mail('havetruss@gmail.com', 'Contact us notification - Taras office', $e_content, $headers);

		    echo json_encode(array("response"=>200,"status"=>"OK"));
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