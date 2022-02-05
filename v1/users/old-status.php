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
		$chk_cdate = mysqli_query($dbLink,"select id from tbl_status where cdate='".date('Y-m-d')."' and user_id='".mysqli_real_escape_string($dbLink,$data->uid)."'");
		$chk_cstatus_num = mysqli_num_rows($chk_cdate);
		if($chk_cstatus_num>0)
		{				
			$row_cdate = mysqli_query($dbLink,"select * from tbl_status where user_id='".mysqli_real_escape_string($dbLink,$data->uid)."' and schedule_type='Current Date' 
			and cdate='".date('Y-m-d')."' limit 0,1");
			$row = mysqli_fetch_object($row_cdate);	
			
			// Employee information //
			$employee_array = array();
			
			$emp_query =  mysqli_query($dbLink,"select id,full_name from tbl_staff where uid='".mysqli_real_escape_string($dbLink,$data->uid)."'");
			while($row_emp = mysqli_fetch_object($emp_query)){
			    array_push($employee_array,$row_emp);
			}
			
			echo json_encode(array("response"=>200,"status"=>"OK","list"=>$row,"emp_list"=>$employee_array));
			exit;													
		
		}													  
	
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