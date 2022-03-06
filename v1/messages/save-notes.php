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
		if($data->message_id and $data->notes)
		{			
			// insert //
			insert('tbl_message_comments',array('message_id',"user_id","comments","date_added"),
			array(validation_post($data->message_id,$dbLink),validation_post($data->uid,$dbLink),validation_post($data->notes,$dbLink),date('Y-m-d')),$dbLink);				
			
			$file_name = '../logs/users-activity.txt';
            $txt = "************Saving comments**************".PHP_EOL."Saving comments by user id : ".$data->uid." ".PHP_EOL."At: ".date('Y-m-d h:i a').PHP_EOL."Message ID: ".$data->message_id.PHP_EOL;
            $myfile = file_put_contents($file_name, $txt.PHP_EOL , FILE_APPEND | LOCK_EX);
			
			
			echo json_encode(array("response"=>200,"status"=>"OK"));
			exit;	
						
		}
		else
		{
			echo json_encode(array("response"=>202,"status"=>"Invalid parameters."));
			exit;
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
	echo json_encode(array("response"=>400,"status"=>"Bad request."));
	exit;

}
?>