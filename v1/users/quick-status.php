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
	   	// Check prescehduled //		
	   	
	    $row=array();								
		$check_cd_status = mysqli_query($dbLink,"select id,label_one from tbl_status where user_id='".mysqli_real_escape_string($dbLink,$data->uid)."' 
		and schedule_type='Current Date' and cdate='".date('Y-m-d')."'");
		$cd_status_num = mysqli_num_rows($check_cd_status);		
		if($cd_status_num > 0)
		{
			$row_cstatus = mysqli_fetch_assoc($check_cd_status);
			
			if($row_cstatus['label_one']=='Taking calls')
			{
			    $label_one = "Not taking calls";
			    $label_two = "Until further notice";
			}
			else
			{
			    $label_one = "Taking calls";
			    $label_two = "Until further notice";
			}
			
			$sql_upd = "update tbl_status set label_one='".$label_one."', label_two='".$label_two."' where user_id='".mysqli_real_escape_string($dbLink,$data->uid)."' 
			and schedule_type='Current Date' and cdate='".date('Y-m-d')."'";
			mysqli_query($dbLink,$sql_upd);
				
		}
		
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
			$body = "Your current status was changed.";
			$subtitle = "Status Request";
			
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
	
		
		$row_cdate = mysqli_query($dbLink,"select *,date_format(cdate,'%b %d, %Y')as fcdate from tbl_status where user_id='".mysqli_real_escape_string($dbLink,$data->uid)."' and schedule_type='Current Date' and cdate='".date('Y-m-d')."' limit 0,1");
		$row = mysqli_fetch_object($row_cdate);	
				
		echo json_encode(array("response"=>200,"status"=>"OK","csstatus"=>$row,"csstatus_len"=>'1'));
		exit;
	  	
	
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