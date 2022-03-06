<?php
require_once __DIR__ .'../../config/config.ini';
require_once __DIR__ .'../../db/connection.php';
require_once __DIR__ .'../../common/functions.php';
$dbLink = connectDB();

$data = json_decode(file_get_contents('php://input'));


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
		"expiryMonth"=>validation_post(encrypt_string($data->expiryMonth),$dbLink),
		"expiryYear"=>validation_post(encrypt_string($data->expiryYear),$dbLink),
		"ccnumber"=>validation_post($data->ccnumber,$dbLink),
		"cvv"=>validation_post($data->cvv,$dbLink),
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