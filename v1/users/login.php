<?php
require_once __DIR__ .'../../config/config.ini';
require_once __DIR__ .'../../db/connection.php';
require_once __DIR__ .'../../common/functions.php';
$dbLink = connectDB();

$data = json_decode(file_get_contents('php://input'));


if(!empty($data->email) and !empty($data->password))
{
	if (filter_var($data->email, FILTER_VALIDATE_EMAIL)) 
	{
		$chk = rowCount('tbl_registration','email',$data->email,$dbLink);
		if($chk > 0)
		{
			$row = fetchRowColumn('tbl_registration','email',$data->email,$dbLink,array("id","name","email","business","token","password","expiry_time_stamp","last_name","phone","account_status"));
			$verify = password_verify($data->password,$row->password);
			
			
			if($verify > 0 and $row->account_status=="Active")
			{								
				// generate token starts //
				if($row->expiry_time_stamp >= strtotime(date('Y-m-d')))	
				{
				 	
				 	
				 	$sql = "update tbl_registration set device_id='".$data->push_token."' where id='".mysqli_real_escape_string($dbLink,$row->id)."'";
					mysqli_query($dbLink,$sql);
				 	
				 	/*$securelySeededHash = hash('sha256', random_bytes(32));
					$user_concat_token = $securelySeededHash;
					$current_date = strtotime(date('Y-m-d'));
					$expiry_time = strtotime("+30 days", $current_date);	
					
					$sql = "update tbl_registration set token='".$user_concat_token."',expiry_time_stamp='".$expiry_time."' where id='".mysqli_real_escape_string($dbLink,$row->id)."'";
					mysqli_query($dbLink,$sql);
					
					$new_token_query = mysqli_query($dbLink,"select token from tbl_registration where id='".mysqli_real_escape_string($dbLink,$row->id)."'");
					$row_new_token = mysqli_fetch_object($new_token_query);
					*/
					
                    $file_name = '../logs/users-activity.txt';
                    $txt = "************Login Activity when expiry is greater than current time**************".PHP_EOL."Login Email: ".$data->email." ".PHP_EOL."Login at: ".date('Y-m-d h:i a').PHP_EOL;
                    $myfile = file_put_contents($file_name, $txt.PHP_EOL , FILE_APPEND | LOCK_EX);
                    
					
					 
					 echo json_encode(array("response"=>200,"status"=>"OK","rem_token"=>$row->token,"id"=>$row->id,"bname"=>$row->business,
					"user_records"=>array("id"=>(int)$row->id,"name"=>stripslashes($row->name),"email"=>$row->email,"business"=>stripslashes($row->business),
					"last_name"=>$row->last_name,"phone"=>$row->phone)));
					 exit;	
    					 
				}
				else
				{
					$securelySeededHash = hash('sha256', random_bytes(32));
					$user_concat_token = $securelySeededHash;
					
					$current_date = strtotime(date('Y-m-d'));
					$expiry_time = strtotime("+90 days", $current_date);
					
					$sql = "update tbl_registration set token='".$user_concat_token."',expiry_time_stamp='".$expiry_time."',device_id='".$data->push_token."' 
					where id='".mysqli_real_escape_string($dbLink,$row->id)."'";
					mysqli_query($dbLink,$sql);
					
				
				
				    $file_name = '../logs/users-activity.txt';
                    $txt = "************Login Activity**************".PHP_EOL."Login Email: ".$data->email." ".PHP_EOL."Login at: ".date('Y-m-d h:i a').PHP_EOL;
                    $myfile = file_put_contents($file_name, $txt.PHP_EOL , FILE_APPEND | LOCK_EX);
				
				
					// New token //
					 $ntoken_row = fetchRowColumn('tbl_registration','id',$row->id,$dbLink,
					 array("id","name","email","business","token","password","expiry_time_stamp","last_name","phone","business"));										
					 echo json_encode(array("response"=>200,"status"=>"OK","rem_token"=>$ntoken_row->token,"id"=>$ntoken_row->id,
					 "bname"=>$ntoken_row->business,"user_records"=>array($ntoken_row)));
					 exit;	
				
				}
					
			}
			else
			{
				echo json_encode(array("response"=>401,"status"=>"Invalid password or your account status has been suspended."));
				exit;
			}
			
		}
		else
		{
			echo json_encode(array("response"=>402,"status"=>"Invalid email."));
			exit;
		
		}		
		
	}
	else
	{
		echo json_encode(array("response"=>400,"status"=>"bad request"));
		exit;
	}
	
}
else
{
	echo json_encode(array("response"=>400,"status"=>"bad request"));
	exit;

}
?>