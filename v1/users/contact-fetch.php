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
	    $row = fetchRowColumn('tbl_registration','id',$data->uid,$dbLink,array("id","name","email","address","last_name","business","phone"));											
		
		$chk_smc = mysqli_query($dbLink,"select IsAuthView from secure_messages_code where user_id='".mysqli_real_escape_string($dbLink,$data->uid)."' and IsAuthView='Yes'");
		if(mysqli_num_rows($chk_smc)>0){
		    $update_code = mysqli_query($dbLink,"update secure_messages_code set IsAuthView='No' where user_id='".mysqli_real_escape_string($dbLink,$data->uid)."'");
		    
		}
		
		
	    echo json_encode(array("response"=>200,"status"=>"OK",
		"user_records"=>array("id"=>(int)$row->id,"first_name"=>stripslashes($row->name),"email"=>$row->email,
		"last_name"=>$row->last_name,"phone"=>$row->phone,"business"=>$row->business)));
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