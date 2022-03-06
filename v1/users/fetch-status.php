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
	   	// Check prescehduled //		
	   	
	    $row=array();								
		$check_cd_status = mysqli_query($dbLink,"select id from tbl_status where user_id='".mysqli_real_escape_string($dbLink,$data->uid)."' 
		and schedule_type='Current Date' and cdate='".date('Y-m-d')."'");
		$cd_status_num = mysqli_num_rows($check_cd_status);		
		if($cd_status_num == 0)
		{
			insert('tbl_status',array("user_id","schedule_type","label_one","cdate"),
			array(validation_post($data->uid,$dbLink),'Current Date','Taking calls',date('Y-m-d')),$dbLink);							
		}
	
		
		$row_cdate = mysqli_query($dbLink,"select *,date_format(cdate,'%b %d, %Y')as fcdate from tbl_status where user_id='".mysqli_real_escape_string($dbLink,$data->uid)."' and schedule_type='Current Date' 
		and cdate='".date('Y-m-d')."' limit 0,1");
		$row = mysqli_fetch_object($row_cdate);	
		
		
		
		// Preschedule status //
		
		$check_psd_status = mysqli_query($dbLink,"select id from tbl_status where user_id='".mysqli_real_escape_string($dbLink,$data->uid)."' 
		and schedule_type='PreScheduled'");
		$psd_status_num = mysqli_num_rows($check_psd_status);		
		if($psd_status_num == 0)
		{
			insert('tbl_status',array("user_id","schedule_type","label_one"),
			array(validation_post($data->uid,$dbLink),'PreScheduled',''),$dbLink);							
		}
		
		// Preschedule status ends //
		
		$prescehdule_data = array();
		$preschedule_query = mysqli_query($dbLink,"select *,date_format(fdate,'%b %d, %Y')as pfdate, date_format(tdate,'%b %d, %Y')as ptdate
		from tbl_status where  user_id='".mysqli_real_escape_string($dbLink,$data->uid)."' and schedule_type='PreScheduled'");
		while($row_prescheinfo = mysqli_fetch_object($preschedule_query)){
			array_push($prescehdule_data,$row_prescheinfo);
		}		
		echo json_encode(array("response"=>200,"status"=>"OK","csstatus"=>$row,"psstatus"=>$prescehdule_data,"psstatus_len"=>count(@$prescehdule_data),"csstatus_len"=>"1"));
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