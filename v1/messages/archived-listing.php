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
		//$messages_listing = getConditionalData('tbl_call_logs','user_id',$data->uid,'id','desc',$dbLink);
		
        $messages_listing = array();
		$sql_query = mysqli_query($dbLink,"select * from tbl_call_logs where user_id='".mysqli_real_escape_string($dbLink,$data->uid)."' and message_status='archive'");
		while($row_message = mysqli_fetch_object($sql_query)){
			array_push($messages_listing,$row_message);
		}
		if(count($messages_listing)>0){
		    foreach($messages_listing as $mlsit_val){
		        $number_of_comments = mysqli_query($dbLink,"select id from tbl_message_comments where 
		        message_id='".mysqli_real_escape_string($dbLink,$mlsit_val->id)."' and user_id='".mysqli_real_escape_string($dbLink,$data->uid)."'");
		        
		        if(mysqli_num_rows($number_of_comments)>0){
		            $mlsit_val->numberOfComments = mysqli_num_rows($number_of_comments);
		        }else{
		            $mlsit_val->numberOfComments = 0;
		        }
		        $mlsit_val->fdate_added = date('M d, Y',strtotime($mlsit_val->date_added));
		        
		        
		    }
		    
		    echo json_encode(array("response"=>200,"status"=>"OK","listing"=>$messages_listing,"number_of_records"=>count($messages_listing)));
		    exit;
		    
		}
		else{
		     echo json_encode(array("response"=>202,"status"=>"EMPTY","number_of_records"=>0));
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
	echo json_encode(array("response"=>400,"status"=>"Bad request"));
	exit;

}
?>