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
		    
    		$sql_query = mysqli_query($dbLink,"select call_notes,date_format(date_added,'%M %D, %Y')as date_added from tbl_call_logs 
    		where user_id='".mysqli_real_escape_string($dbLink,$data->uid)."' and id='".mysqli_real_escape_string($dbLink,$data->messageID)."'");
    		$row_message = mysqli_fetch_object($sql_query);
    		
    		$original_array = array("call_notes"=>stripslashes($row_message->call_notes),"date_submitted"=>$row_message->date_added);
    		
            
            $call_request_query = mysqli_query($dbLink,"select call_request,date_added,assign_status,assign_to_id,date_format(date_added,'%M %D, %Y')as date_added,message_id,id from 
            tbl_message_call where user_id='".mysqli_real_escape_string($dbLink,$data->uid)."' and message_id='".mysqli_real_escape_string($dbLink,$data->messageID)."'");
            
            $comments_array = array();
           
            while($row_commnt = mysqli_fetch_object($call_request_query))
                array_push($comments_array,$row_commnt);
		    
		    if(count($comments_array)>0){	
		        
				foreach($comments_array as $key=> $cmt_val)
				{
					
					$reply_array = array();
					$user_info_qry = mysqli_query($dbLink,"select name,role from tbl_registration where id='".$cmt_val->assign_to_id."'");
					$user_rows = mysqli_fetch_object($user_info_qry);
					if($user_rows->role=="Admin"){$uname="Admin";}else{$uname=$user_rows->name;}
					$cmt_val->uname = ($uname?$uname:'Not assigned yet') ;
				
				   $reply_message_query = mysqli_query($dbLink,"select call_request from tbl_message_call where 
				   message_id='".mysqli_real_escape_string($dbLink,$cmt_val->message_id)."' and user_id='".$cmt_val->assign_to_id."'");
				   while($row_reply = mysqli_fetch_assoc($reply_message_query))
				   {
				        $reply_array[]=$row_reply;
				   } 
				   
				   $comments_array[$key]->reply_info = $reply_array;
				   
				
				}
		    }          
		        
		    echo json_encode(array("response"=>200,"status"=>"OK","comment_listing"=>$comments_array,"org_message"=>$original_array));
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