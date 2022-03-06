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
	   $number_rows_chk = mysqli_query($dbLink,"select id,status_type,isEnabled from push_notification_settings where user_id='".mysqli_real_escape_string($dbLink,$data->uid)."' and status_type='new_message'");		
       $row_status = mysqli_fetch_object($number_rows_chk);
       
       $number_rows_chk_own = mysqli_query($dbLink,"select id,status_type,isEnabled from push_notification_settings where user_id='".mysqli_real_escape_string($dbLink,$data->uid)."' and status_type='own_stat_changes'");		
       $row_status_own = mysqli_fetch_object($number_rows_chk_own);
       
       $number_rows_chk_ar = mysqli_query($dbLink,"select id,status_type,isEnabled from push_notification_settings where user_id='".mysqli_real_escape_string($dbLink,$data->uid)."' and status_type='assist_request'");		
       $row_status_ar = mysqli_fetch_object($number_rows_chk_ar);
       
       $number_rows_chk_pr = mysqli_query($dbLink,"select id,status_type,isEnabled from push_notification_settings where user_id='".mysqli_real_escape_string($dbLink,$data->uid)."' and status_type='plan_request'");		
       $row_status_pr = mysqli_fetch_object($number_rows_chk_pr);
       
       $number_rows_chk_pr = mysqli_query($dbLink,"select id,status_type,isEnabled from push_notification_settings where user_id='".mysqli_real_escape_string($dbLink,$data->uid)."' and status_type='plan_request'");		
       $row_status_pr = mysqli_fetch_object($number_rows_chk_pr);
       
       $number_rows_chk_br = mysqli_query($dbLink,"select id,status_type,isEnabled from push_notification_settings where user_id='".mysqli_real_escape_string($dbLink,$data->uid)."' and status_type='bill_request'");		
       $row_status_br = mysqli_fetch_object($number_rows_chk_br);
       
        $secure_code_qry = mysqli_query($dbLink,"select secure_code,IsAuthView from secure_messages_code where user_id='".mysqli_real_escape_string($dbLink,$data->uid)."'");
        $row_secure_code = mysqli_fetch_object($secure_code_qry);
       
       
       echo json_encode(array("response"=>200,"status"=>"OK","secure_code"=>$row_secure_code->secure_code,"isEnabled"=>$row_status->isEnabled,
       "status_type"=>$row_status->status_type,"own_status_type"=>"own_stat_changes","own_is_enable"=>$row_status_own->isEnabled,
       "ar_type"=>"assist_request","ar_is_enable"=>$row_status_ar->isEnabled,
       "pr_type"=>"plan_request","pr_is_enable"=>$row_status_pr->isEnabled,
       "br_type"=>"bill_request","br_is_enable"=>$row_status_br->isEnabled,
       "view_code"=>$row_secure_code->IsAuthView
       ));
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