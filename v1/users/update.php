<?php
require_once __DIR__ .'../../config/config.ini';
require_once __DIR__ .'../../db/connection.php';
require_once __DIR__ .'../../common/functions.php';
$dbLink = connectDB();

$data = json_decode(file_get_contents('php://input'));

require_once '../../../../public_html/push_notifications/vendor/autoload.php';

if(!empty($data->user_token))
{	
	$chk = rowCount('tbl_registration','token',$data->user_token,$dbLink);
	if($chk > 0)
	{
		if(isset($data->fromDate) and !empty($data->fromDate)){ $hof = $data->fromDate;}else{$hof = "";}
		if(isset($data->toDate) and !empty($data->toDate)){ $hot = $data->toDate;}else{$hot = "";}
		
		 $days_array = array("Mon"=>false,"Tue"=>false,"Wed"=>false);
		
		 $days_array["Mon"]=($data->isCheckboxSelectedMonday==true?'Mon:1,':'Mon:0,');
		 $days_array["Tue"]=($data->isCheckboxSelectedTuesday==true?'Tue:1,':'Tue:0,');
		 $days_array["Wed"]=($data->isCheckboxSelectedWednesday==true ?'Wed:1,':'Wed:0,');
		 $days_array["Thu"]=($data->isCheckboxSelectedThursday==true ?'Thu:1,':'Thu:0,');
		 $days_array["Fri"]=($data->isCheckboxSelectedFriday==true ?'Fri:1,':'Fri:0,');
		 $days_array["Sat"]=($data->isCheckboxSelectedSaturday==true ?'Sat:1,':'Sat:0,');
		 $days_array["Sun"]=($data->isCheckboxSelectedSunday==true ?'Sun:1,':'Sun:0,');
		
		 $hoop = $days_array["Mon"].$days_array["Tue"].$days_array["Wed"].$days_array["Thu"].$days_array["Fri"].$days_array["Sat"].$days_array["Sun"];
		 $trimmed_hoop = rtrim($hoop,",");
		
		
		// fetch existing ccinfo //
		   $sql_old_info = mysqli_query($dbLink,"select ccnumber from tbl_registration where id='".validation_post($data->uid,$dbLink)."'");
		   $row_old_info = mysqli_fetch_object($sql_old_info); 
		   
		   /*if($row_old_info->ccnumber!=encrypt_string($data->ccnumber))
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
    			$body = "Your payment method was updated.";
    			$subtitle = "payment method update Request";
    			
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
		       
		       // push notification ends //
		   }*/
	
	    // fetch existing cc info ends //
	    
	    $isAuthorize=($data->isAuthCheckBox==true?'1':'0');
	    $ccnumberLastFourDigits = substr($data->ccnumber, -4);
	    $ccNewNumber=str_pad($ccnumberLastFourDigits,16,"*",STR_PAD_LEFT);
	
		$combine = array("name"=>validation_post($data->fname,$dbLink),
		"last_name"=>validation_post($data->lname,$dbLink),
		"phone"=>validation_post($data->phone,$dbLink),
		"business"=>validation_post($data->buisness_name,$dbLink),
		"website"=>validation_post($data->website,$dbLink),
		"address"=>validation_post($data->address,$dbLink),
		"description"=>validation_post($data->description,$dbLink),
		"hooperations"=>$trimmed_hoop,
		"hours_of_operations_to"=>$hot,
		"hours_of_operations_from"=>$hof,
		"expiryMonth"=>validation_post($data->expiryMonth,$dbLink),
		"expiryYear"=>validation_post($data->expiryYear,$dbLink),
		"ccnumber"=>$ccNewNumber,
		"cvv"=>validation_post(encrypt_string($data->cvv),$dbLink),
		"billing_zipcode"=>validation_post($data->zipcode,$dbLink),
		"IAuthorizeChk"=>$isAuthorize
		);
		update('tbl_registration',$combine,array("id"=>validation_post($data->uid,$dbLink)),$dbLink);		
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