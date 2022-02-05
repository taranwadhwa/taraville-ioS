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
		
		$hours_of_operations_from = $hof;
		$hours_of_operations_to = $hot;
		
		$combine = array("name"=>validation_post($data->fname,$dbLink),
		"last_name"=>validation_post($data->lname,$dbLink),
		"phone"=>validation_post($data->phone,$dbLink),
		"business"=>validation_post($data->buisness_name,$dbLink),
		"website"=>validation_post($data->website,$dbLink),
		"address"=>validation_post($data->address,$dbLink),
		"description"=>validation_post($data->description,$dbLink),
		"hooperations"=>$hof,
		"hours_of_operations_to"=>$hot,
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