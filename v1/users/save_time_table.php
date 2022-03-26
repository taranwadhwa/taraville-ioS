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
		
		
		 $monday=($data->isMondayChkbox==true?'1':'0');
		 $tuesday=($data->isTuesdayCheckbox==true?'1':'0');
		 $wednesday=($data->isWednesdayCheckbox==true ?'1':'0');
		 $thursday=($data->isThursdayCheckbox==true ?'1':'0');
		 $friday=($data->isFridayCheckbox==true ?'1':'0');
		 $saturday=($data->isSaturdayCheckbox==true ?'1':'0');
		 $sunday=($data->isSundayCheckbox==true ?'1':'0');
		
		 $sql_old_info = mysqli_query($dbLink,"select id from day_wise_time_table where uid='".validation_post($data->uid,$dbLink)."'");
		 $row_old_info = mysqli_fetch_object($sql_old_info); 
		       
	     if(mysqli_num_rows($sql_old_info)==0)	
	     {
	         $array_column = array("uid","isCheckboxSelectedMonday","isCheckboxSelectedTuesday","isCheckboxSelectedWednesday","isCheckboxSelectedThursday","isCheckboxSelectedFriday",
	         "isCheckboxSelectedSaturday","isCheckboxSelectedSunday","fromMondayDatePicker","toMondaysDatePicker","fromTuesdayDatePicker","toTuesdayDatePicker","fromWednesdayDatePicker",
	         "toWednesdayDatePicker","fromThursdayDatePicker","toTursdayDatePicker","fromFridayDatePicker","toFridayDatePicker","fromSaturdayDatePicker","toSaturdayDatePicker",
	         "fromSundayDatePicker","toSundayDatePicker");
	         
	         $array_val = array(validation_post($data->uid,$dbLink),$monday,$tuesday,$wednesday,$thursday,$friday,$saturday,$sunday,
	         $data->fromMondayDatePicker,$data->toMondaysDatePicker,$data->fromTuesdayDatePicker,$data->toTuesdayDatePicker,$data->fromWednesdayDatePicker,
	         $data->toWednesdayDatePicker,$data->fromThursdayDatePicker,$data->toTursdayDatePicker,$data->fromFridayDatePicker,$data->toFridayDatePicker,
	         $data->fromSaturdayDatePicker,$data->toSaturdayDatePicker,$data->fromSundayDatePicker,$data->toSundayDatePicker);
	         
	         insert('day_wise_time_table',$array_column,$array_val,$dbLink);
	         
	     }
	     else{
	         $combine = array("uid"=>validation_post($data->uid,$dbLink),"isCheckboxSelectedMonday"=>$monday,"isCheckboxSelectedTuesday"=>$tuesday,
	         "isCheckboxSelectedWednesday"=>$wednesday,"isCheckboxSelectedThursday"=>$thursday,"isCheckboxSelectedFriday"=>$friday,"isCheckboxSelectedSaturday"=>$saturday,
	         "isCheckboxSelectedSunday"=>$sunday,"fromMondayDatePicker"=>$data->fromMondayDatePicker,"toMondaysDatePicker"=>$data->toMondaysDatePicker,
	         "fromTuesdayDatePicker"=>$data->fromTuesdayDatePicker,"toTuesdayDatePicker"=>$data->toTuesdayDatePicker,"fromWednesdayDatePicker"=>$data->fromWednesdayDatePicker,
	         "toWednesdayDatePicker"=>$data->toWednesdayDatePicker,"fromThursdayDatePicker"=>$data->fromThursdayDatePicker,"toTursdayDatePicker"=>$data->toTursdayDatePicker,
	         "fromFridayDatePicker"=>$data->fromFridayDatePicker,"toFridayDatePicker"=>$data->toFridayDatePicker,"fromSaturdayDatePicker"=>$data->fromSaturdayDatePicker,
	         "toSaturdayDatePicker"=>$data->toSaturdayDatePicker,"fromSundayDatePicker"=>$data->fromSundayDatePicker,"toSundayDatePicker"=>$data->toSundayDatePicker);
	         
	         $conditionarry=array("uid"=>validation_post($data->uid,$dbLink));
	         
	         update('day_wise_time_table',$combine,$conditionarry,$dbLink);
	         
	     }
	    
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