<?php
require_once __DIR__ .'../../config/config.ini';
require_once __DIR__ .'../../db/connection.php';
require_once __DIR__ .'../../common/functions.php';
$dbLink = connectDB();

$data = json_decode(file_get_contents('php://input'));


require_once '../../../../public_html/push_notifications/vendor/autoload.php';

if(!empty($data->user_token))
{	
	$query_fire = mysqli_query($dbLink,"select id from tbl_registration where token='".mysqli_real_escape_string($dbLink,$data->user_token)."' 
	and id='".mysqli_real_escape_string($dbLink,$data->uid)."'");
	$chk = mysqli_num_rows($query_fire);
	if($chk > 0)
	{		
		if($data->message_id and $data->call_request)
		{			
			
			
			// insert //
			insert('tbl_message_call',array('message_id',"user_id","call_request","date_added","req_status","assign_status"),
			array(validation_post($data->message_id,$dbLink),validation_post($data->uid,$dbLink),validation_post($data->call_request,$dbLink),date('Y-m-d'),'Unread','Unassigned'),$dbLink);				
			
			// update call status starts//
			
			update('tbl_call_logs',array("message_call_status"=>"Assist Received","message_call_color"=>"B33F40"),array("id"=>validation_post($data->message_id,$dbLink)),$dbLink);
			
			
			$request_pnsetting = push_notifications_settings(mysqli_real_escape_string($dbLink,$data->uid),'assist_request',$dbLink);
			
			
			if($request_pnsetting=="1")
		    {
    			// Push notifications starts //
    			$user_info_push = mysqli_query($dbLink,"select id,name,device_id from tbl_registration where id='".mysqli_real_escape_string($dbLink,$data->uid)."'");
    			$row_user_info = mysqli_fetch_object($user_info_push);
    			
    			$channelName = 'user_'.$row_user_info->id;
    			$recipient= $row_user_info->device_id;//
    			
    			// You can quickly bootup an expo instance
    			$expo = \ExponentPhpSDK\Expo::normalSetup();
    			
    			// Subscribe the recipient to the server
    			$expo->subscribe($channelName, $recipient);
    			
    			$title="Taraville.";
    			$body = "Your assist request was received";
    			$subtitle = "Assist Request";
    			
    			// Build the notification data
    			$notification = ['title'=>$title,'body' => $body,'subtitle'=>$subtitle,'priority'=>'high','sound'=>'default'];
    			
    			// Notify an interest with a notification
    			$expo->notify([$channelName], $notification);
    						
    			// Build the notification data			
    			
    			try {
    			$instance = \ExponentPhpSDK\Expo::normalSetup();
    			//echo 'Succeeded! We have created an Expo instance successfully';
    			} catch (Exception $e) {
    			//echo 'Test Failed';
    			}
    			
		    }	
			
			
			// update call status ends //
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