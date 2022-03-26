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
	    $row = fetchRowColumn('tbl_registration','id',$data->uid,$dbLink,array("id","name","email","address","last_name","business","phone","website","description","hooperations","token","plan_id","ccnumber","expiryYear","cvv","expiryMonth","hours_of_operations_to","hours_of_operations_from","billing_zipcode","IAuthorizeChk"));											
		
	    $plan_info = fetchRowColumn('tbl_plans','id',$row->plan_id,$dbLink,array("name")); 
	    
	    
	    $chk_smc = mysqli_query($dbLink,"select IsAuthView from secure_messages_code where user_id='".mysqli_real_escape_string($dbLink,$data->uid)."' and IsAuthView='Yes'");
		if(mysqli_num_rows($chk_smc)>0){
		    $update_code = mysqli_query($dbLink,"update secure_messages_code set IsAuthView='No' where user_id='".mysqli_real_escape_string($dbLink,$data->uid)."'");
		    
		}
	    
	    
	    // Time table information //
	    $time_table_query = mysqli_query($dbLink,"select * from day_wise_time_table where uid='".mysqli_real_escape_string($dbLink,$data->uid)."'");
	    $row_time_table = mysqli_fetch_object($time_table_query);
	    $isCheckboxSelectedMonday = ($row_time_table->isCheckboxSelectedMonday==true?true:false);
	    $isCheckboxSelectedTuesday = ($row_time_table->isCheckboxSelectedTuesday==true?true:false);
	    $isCheckboxSelectedWednesday = ($row_time_table->isCheckboxSelectedWednesday==true?true:false);
	    $isCheckboxSelectedThursday = ($row_time_table->isCheckboxSelectedThursday==true?true:false);
	    $isCheckboxSelectedFriday = ($row_time_table->isCheckboxSelectedFriday==true?true:false);
	    $isCheckboxSelectedSaturday = ($row_time_table->isCheckboxSelectedSaturday==true?true:false);
	    $isCheckboxSelectedSunday = ($row_time_table->isCheckboxSelectedSunday==true?true:false);
	    
	     echo json_encode(array("response"=>200,"status"=>"OK","token"=>$row->token,
		"user_records"=>array("id"=>(int)$row->id,"first_name"=>stripslashes($row->name),"email"=>$row->email,"address"=>stripslashes($row->address),
		"last_name"=>$row->last_name,"phone"=>$row->phone,"website"=>$row->website,"description"=>$row->description,"business"=>$row->business,
		"plan_name"=>$plan_info->name,"cc_number"=>$row->ccnumber,"expiryMonth"=>$row->expiryMonth,"expiryYear"=>$row->expiryYear,"cvv"=>$row->cvv,
		"hooperations"=>$row->hooperations,"hours_of_operations_to"=>$row->hours_of_operations_to,"hours_of_operations_from"=>$row->hours_of_operations_from,
		"biling_zipcode"=>$row->billing_zipcode,"IAuthorizeChk"=>$row->billing_zipcode,"isCheckboxSelectedMonday"=>$isCheckboxSelectedMonday,
		"isCheckboxSelectedTuesday"=>$isCheckboxSelectedTuesday,"isCheckboxSelectedWednesday"=>$isCheckboxSelectedWednesday,
		"isCheckboxSelectedThursday"=>$isCheckboxSelectedThursday,"isCheckboxSelectedFriday"=>$isCheckboxSelectedFriday,"isCheckboxSelectedSaturday"=>$isCheckboxSelectedSaturday,
		"isCheckboxSelectedSunday"=>$isCheckboxSelectedSunday,"fromMondayDatePicker"=>$row_time_table->fromMondayDatePicker,"toMondaysDatePicker"=>$row_time_table->toMondaysDatePicker,
		"fromTuesdayDatePicker"=>$row_time_table->fromTuesdayDatePicker,"toTuesdayDatePicker"=>$row_time_table->toTuesdayDatePicker,"fromWednesdayDatePicker"=>$row_time_table->fromWednesdayDatePicker,
        "toWednesdayDatePicker"=>$row_time_table->toWednesdayDatePicker,"fromThursdayDatePicker"=>$row_time_table->fromThursdayDatePicker,"toTursdayDatePicker"=>$row_time_table->toTursdayDatePicker,        		
        "fromFridayDatePicker"=>$row_time_table->fromFridayDatePicker,"toFridayDatePicker"=>$row_time_table->toFridayDatePicker,"fromSaturdayDatePicker"=>$row_time_table->fromSaturdayDatePicker,
        "toSaturdayDatePicker"=>$row_time_table->toSaturdayDatePicker,"fromSundayDatePicker"=>$row_time_table->fromSundayDatePicker,"toSundayDatePicker"=>$row_time_table->toSundayDatePicker        
		)));
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