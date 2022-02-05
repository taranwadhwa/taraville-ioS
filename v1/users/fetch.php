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
	    $row = fetchRowColumn('tbl_registration','id',$data->uid,$dbLink,array("id","name","email","address","last_name","business","phone","website","description","hooperations","token","plan_id","ccnumber","expiryYear","cvv","expiryMonth","hours_of_operations_to"));											
		
	    $plan_info = fetchRowColumn('tbl_plans','id',$row->plan_id,$dbLink,array("name")); 
	    
	    echo json_encode(array("response"=>200,"status"=>"OK","token"=>$row->token,
		"user_records"=>array("id"=>(int)$row->id,"first_name"=>stripslashes($row->name),"email"=>$row->email,"address"=>stripslashes($row->address),
		"last_name"=>$row->last_name,"phone"=>$row->phone,"website"=>$row->website,"description"=>$row->description,"business"=>$row->business,
		"plan_name"=>$plan_info->name,"cc_number"=>$row->ccnumber,"expiryMonth"=>$row->expiryMonth,"expiryYear"=>$row->expiryYear,"cvv"=>$row->cvv,
		"hooperations"=>$row->hooperations,"hours_of_operations_to"=>$row->hours_of_operations_to)));
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