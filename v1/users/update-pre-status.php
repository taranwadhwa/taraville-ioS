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
	   	
		if($data->fromDate and $data->toDate)	
		{			
			$explode_fdate = explode("/",$data->fromDate);//0m1d/2yyyy
			$new_from_date = $explode_fdate[2].'-'.$explode_fdate[0].'-'.$explode_fdate[1];
			
			$explode_tdate = explode("/",$data->toDate);//0m1d/2yyyy
			$new_to_date= $explode_tdate[2].'-'.$explode_tdate[0].'-'.$explode_tdate[1];
			
			$from_dayname = date('D', strtotime($new_from_date));
			$to_dayname = date('D', strtotime($new_to_date));
			
			$fdformat = date("M d, Y",strtotime($new_from_date));
			$tdformat = date("M d, Y",strtotime($new_to_date));
			
			$full_string = $from_dayname.', '.$fdformat.', '.$data->fromTime.' - '.$to_dayname.', '.$tdformat.', '.$data->toTime;
			
			update('tbl_status',array("label_one"=>validation_post($data->labelOne,$dbLink),"label_two"=>validation_post($data->labelTwo,$dbLink),
			"employee_name"=>validation_post($data->labelThree,$dbLink),"fdate"=>mysqli_real_escape_string($dbLink,$new_from_date),
			"tdate"=>mysqli_real_escape_string($dbLink,$new_to_date),"ftime"=>mysqli_real_escape_string($dbLink,$data->fromTime),
			"ttime"=>mysqli_real_escape_string($dbLink,$data->toTime),"other_info"=>validation_post($data->other_label,$dbLink),"ps_fulltext"=>$full_string),
			array("user_id"=>validation_post($data->uid,$dbLink),"id"=>validation_post($data->status_id,$dbLink)),$dbLink);	 					
			
			
    		// Check push notification //
    		$status_setting = push_notifications_settings(mysqli_real_escape_string($dbLink,$data->uid),'own_stat_changes',$dbLink);
    		
    		if($status_setting=="1")
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
    			$body = "Your prescheduled status was changed.";
    			$subtitle = "Prescheduled Status Request";
    			
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
			
			
			
			
			
			echo json_encode(array("response"=>200,"status"=>"OK"));
			exit;					
			
		}
		else{
			echo json_encode(array("response"=>300,"status"=>"From and to date are required to enter."));
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