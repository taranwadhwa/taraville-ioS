<?php
require_once __DIR__ . 'common/config.ini';
require_once __DIR__ . 'db/connection.php';
require_once __DIR__ . 'common/functions.php';
$dbLink = connectDatabase();
$data = json_decode(file_get_contents('php://input'));

if(!empty($data->user_name) and !empty($data->password))
{

	$chk = rowCount('tbl_token','user_name',$data->user_name,$dbLink);
	if($chk > 0)
	{
		$row = fetchRow('tbl_token','user_name',$data->user_name,$dbLink);
		$verify = password_verify($data->password,$row->password);						
		if($verify > 0)
		{
			
			$sqlQry = mysqli_query($dbLink,"select token,expiry from tbl_token where id='1'");
			$existRowToken = mysqli_fetch_assoc($sqlQry);
						
			if($existRowToken['token'] and $existRowToken['expiry'] >= strtotime(date('Y-m-d')))
			{
				echo json_encode(array("response"=>200,"status"=>"OK","token"=>$existRowToken['token'],"expiry"=>$existRowToken['expiry']));
				exit;		
			}
			else
			{			
				$token_array = array();
				$random_token = generate_random_token();			
				
				$current_date = strtotime(date('Y-m-d'));
				$expiry_time = strtotime("+1 month", $current_date);					
				
				$update = mysqli_query($dbLink,"update tbl_token set token='".$random_token."',expiry='".$expiry_time."',expiry_date='".date('Y-m-d h:i:s')."' where id='1'");
							
				echo json_encode(array("response"=>200,"status"=>"OK","token"=>$random_token,"expiry"=>$expiry_time));
				exit;
				
			}
				
			
		
		}
		else
		{
			echo json_encode(array("response"=>401,"status"=>"Invalid password."));
			exit;
		
		}
		
	
	}
	else
	{
		echo json_encode(array("response"=>402,"status"=>"Invalid username."));
		exit;
	
	}

}
else
{
	echo json_encode(array("response"=>400,"status"=>"bad request"));
	exit;
}

//echo password_hash("HappyDel13@#!615VerNa", PASSWORD_DEFAULT);
//exit;
?>