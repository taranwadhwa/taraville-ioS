<?php
require_once __DIR__ .'../../config/config.ini';
require_once __DIR__ .'../../db/connection.php';
require_once __DIR__ .'../../common/functions.php';
$dbLink = connectDB();

$data = json_decode(file_get_contents('php://input'));

if(!empty($data->user_token))
{	
	$query_fire = mysqli_query($dbLink,"select id,plan_id from tbl_registration where token='".mysqli_real_escape_string($dbLink,$data->user_token)."' 
	and id='".mysqli_real_escape_string($dbLink,$data->uid)."'");
	$chk = mysqli_num_rows($query_fire);
	if($chk > 0)
	{
		$user_rows = mysqli_fetch_object($query_fire);
		
		switch($data->filter)
		{
			case 'Today':
				$date_added=date('Y-m-d');
				$check_operator="=";
			break;
			
			case 'Last 7 days':
				$date_added = date('Y-m-d', strtotime(date('Y-m-d'). ' - 7 day'));
				$check_operator=">=";
			break;
			
			case 'Last 30 days':
				$date_added = date('Y-m-d', strtotime(date('Y-m-d'). ' - 30 day'));
				$check_operator=">=";
			break;
			
			case 'Last 3 months':
				$date_added = date('Y-m-d', strtotime(date('Y-m-d'). ' - 90 day'));
				$check_operator=">=";
			break;
						
			default:
				$date_added=date('Y-m-d');
				$check_operator="=";
			break;	
		
		}
		
		// Plan information //		
		$plan_info = fetchRow('tbl_plans','id',$user_rows->plan_id,$dbLink);
		
		
		// Total calls taken //		
		$count_calls = mysqli_query($dbLink,"select count(id)as calls_taken from tbl_call_logs where user_id='".mysqli_real_escape_string($dbLink,$data->uid)."' 
		and date_added ".$check_operator." '".$date_added."'");
		$row_count_calls = mysqli_fetch_object($count_calls);		
		
		if(isset($row_count_calls->calls_taken) and $row_count_calls->calls_taken>0){$calls_taken=$row_count_calls->calls_taken;}else{$calls_taken=0;}
		
		// Calls left //
		try{
			if($plan_info->calls_number > 0)
			{
				$left_calls = $plan_info->calls_number - $calls_taken;
			}
			else{
				$left_calls = 0;
			}	
		}
		catch(Exception $e){echo 'Message: ' .$e->getMessage();}	
		
	
		
		// Most popular city //
		$popular_city_query = mysqli_query($dbLink,"select tcl.city_id,c.name FROM tbl_call_logs tcl join cities c on(tcl.city_id=c.id) where 
		user_id='".mysqli_real_escape_string($dbLink,$data->uid)."' and date_added ".$check_operator." '".$date_added."'  GROUP  BY city_id HAVING COUNT(city_id) > 1");
		$popular_cty_rows = mysqli_fetch_object($popular_city_query);
		
		$city_name = (isset($popular_cty_rows->name)?$popular_cty_rows->name:'-');
				
		//Total outbound calls //
		$count_outboundcalls = mysqli_query($dbLink,"select count(id)as outbound_calls from tbl_message_call where user_id='".mysqli_real_escape_string($dbLink,$data->uid)."'
		and date_added ".$check_operator."  '".$date_added."'");
		$row_count_obcalls = mysqli_fetch_object($count_outboundcalls);		
		$calls_obtaken = $row_count_obcalls->outbound_calls;
		
		$outbound_calls = (isset($calls_obtaken)?$calls_obtaken:'0');
		
		// Most frequent caller //
		$sql_query = mysqli_query($dbLink,"select name from tbl_call_logs where user_id='".mysqli_real_escape_string($dbLink,$data->uid)."' 
		and date_added ".$check_operator." '".$date_added."'    GROUP  BY name HAVING COUNT(name) > 1");
		$row_caller = mysqli_fetch_object($sql_query);	
		
		if(isset($row_caller->name) and $row_caller->name){$caller_name=$row_caller->name;}else{$caller_name="-";}
		
		
		// Spam calls //
		$spam_query = mysqli_query($dbLink,"SELECT count(id)as numberOfSpam FROM `tbl_call_logs` where action_taken='Spam' 
		and user_id='".mysqli_real_escape_string($dbLink,$data->uid)."' and date_added ".$check_operator." '".$date_added."'");
		$number_spam_row = mysqli_fetch_object($spam_query);
		
		if(isset($number_spam_row->numberOfSpam) and $number_spam_row->numberOfSpam>0){$number_of_spam=$number_spam_row->numberOfSpam;}else{$number_of_spam=0;}
		
		// Most popular days //
		$sql_query_pd = mysqli_query($dbLink,"select date_format(date_added,'%W')as popular_day from tbl_call_logs where user_id='".mysqli_real_escape_string($dbLink,$data->uid)."' 
		and date_added ".$check_operator." '".$date_added."'  GROUP  BY date_added HAVING COUNT(date_added) > 1");
		$row_caller_pd = mysqli_fetch_object($sql_query_pd);
		
		if(isset($row_caller_pd->popular_day) and $row_caller_pd->popular_day){$popular_day=$row_caller_pd->popular_day;}else{$popular_day="-";}
		
		// Number of messages //
		$squery_messages = mysqli_query($dbLink,"select count(id) as numberMessages from tbl_message_comments where user_id='".mysqli_real_escape_string($dbLink,$data->uid)."' 
		and date_added ".$check_operator." '".$date_added."'");
		$row_messages = mysqli_fetch_object($squery_messages);	
		
		if(isset($row_messages->numberMessages) and $row_messages->numberMessages>0){$numberOfMessages=$row_messages->numberMessages;}else{$numberOfMessages=0;}
		
	
		echo json_encode(array("response"=>200,"status"=>"OK","crecords"=>array(
			array("name"=>"Calls taken","population"=>$calls_taken,"color"=>"#B33F40","legendFontColor"=>"#B33F40","legendFontSize"=>"14"),
			array("name"=>"Messages","population"=>$numberOfMessages,"color"=>"#6577B3","legendFontColor"=>"#6577B3","legendFontSize"=>"14"),
			array("name"=>"Calls left","population"=>$left_calls,"color"=>"#48A14D","legendFontColor"=>"#48A14D","legendFontSize"=>"14")),
			"other_records"=>array("outbound_calls"=>$outbound_calls,"popular_city"=>$city_name,"caller_name"=>$caller_name,
			"spam_calls"=>$number_of_spam,"popular_day"=>$popular_day,"selected_filter"=>$data->filter)));
		exit;
		
		
	}
	else
	{
		echo json_encode(array("response"=>402,"status"=>"Unauthorize user or your session has been expired.Please logout and login again."));
		exit;
	
	}						
	
}
else
{
	echo json_encode(array("response"=>400,"status"=>"Bad request"));
	exit;

}
?>