<?php
function getData($table,$order_column='',$order,$dbLink)
{

  $result = mysqli_query($dbLink,"select * from ".$table. " order by ".$order_column." $order");
       

   $rows = array();        

   while ($row = mysqli_fetch_object($result)) 

        $rows[] = $row;
    return $rows;



}



function getConditionalData($table,$col,$check,$order_column='',$order,$dbLink)
{

  $result = mysqli_query($dbLink,"select * from ".$table. " where ".$col." = '".mysqli_real_escape_string($dbLink,$check)."' order by ".$order_column." $order");
  $rows = array();        
  while ($row = mysqli_fetch_object($result)) 
        $rows[] = $row;
    return $rows;
}



function fetchRow($table,$col,$check,$dbLink)

{

    $row = mysqli_query($dbLink,"select * from ".$table." where ".$col."= '".mysqli_real_escape_string($dbLink,$check)."'");

	if($row == false) 

       return false;

	 

	$result_row = mysqli_fetch_object($row);

	return $result_row; 

   

}

function insert($table,$col,$col_val,$dbLink)
{
    
	$sqlQry = mysqli_query($dbLink,"insert into ".$table." (".implode(",",$col).") VALUES('".implode("','",$col_val)."')");
	return mysqli_insert_id($dbLink);
}


function update($table,$combine,$conditionarry,$dbLink)
{
		$sql="update $table set ";
		if($combine!="")
		{
			$cc = count($combine);
			$ii = 1;
			foreach($combine as $combine_key=> $comb_val)
			{
				if($ii==$cc)
				{
					$sql.=$combine_key.'="'.$comb_val.'"  ';
				}else{
					$sql.=$combine_key.'="'.$comb_val.'" , ';
				}$ii++;
			}
		}

		if($conditionarry!='')
		{
			$sql.=' where ';
			$c = count($conditionarry);
			$i = 1;
			foreach($conditionarry as $key=>$val)
			{
				if($i==$c){
					//$sql.="$key='$val' ";
					$sql.="$key='".mysqli_real_escape_string($dbLink,$val)."'";
				}
				else
				{
					//$sql.="$key='$val' and ";
					$sql.="$key='".mysqli_real_escape_string($dbLink,$val)."' and ";
				}
				$i++;

			}

		}
		
		mysqli_query($dbLink,$sql);

}


function delete($table,$col,$check)

{

	mysqli_query($dbLink,"delete from ".$table." where ".$col." = ".mysqli_real_escape_string($dbLink,$check));

	return true;



}

function token_validity($dbLink)
{

	$sqlQry = mysqli_query($dbLink,"select token,expiry_time_stamp from 3_8_1981_token where id='1'");
	$existRowToken = mysqli_fetch_assoc($sqlQry);
	if($existRowToken['token'] and $existRowToken['expiry_time_stamp'] >= strtotime(date('Y-m-d')))
	{
		return json_encode(array("response"=>200,"status"=>"OK","token"=>$existRowToken['token']));
	}
	else
	{
		return json_encode(array("response"=>400,"status"=>"ERROR"));
	}
}

function rowCount($table,$col,$check,$dbLink)

{

	$sqlQry = mysqli_query($dbLink,"select * from ".$table." where ".$col." = '".mysqli_real_escape_string($dbLink,$check)."'");		

	if(mysqli_num_rows($sqlQry)==0)

		return 0;

	else

		return mysqli_num_rows($sqlQry);



}

function fetchRowColumn($table,$col,$check,$dbLink,$array_columns) 
{

	$implode_col = implode(",",$array_columns);
	$row = mysqli_query($dbLink,"select ".$implode_col." from ".$table." where ".$col." = '".mysqli_real_escape_string($dbLink,$check)."'");
	if($row == false) 
       return false;
	$result_row = mysqli_fetch_object($row);
	return $result_row; 	
	
}
function validation_post($post,$dbLink){
	return mysqli_real_escape_string($dbLink,$post);

}
function random_strings($length_of_string)
{
  
    // String of all alphanumeric character
    $str_result = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  
    // Shuffle the $str_result and returns substring
    // of specified length
    return substr(str_shuffle($str_result),0,$length_of_string);
}
function encrypt_string($string)
{
	$plaintext = $string;
	$key = 'TARAVILLE-TA563ZEO3263E';
	$ivlen = openssl_cipher_iv_length($cipher="AES-128-CBC");
	$iv = openssl_random_pseudo_bytes($ivlen);
	$ciphertext_raw = openssl_encrypt($plaintext, $cipher, $key, $options=OPENSSL_RAW_DATA, $iv);
	$hmac = hash_hmac('sha256', $ciphertext_raw, $key, $as_binary=true);
	$ciphertext = base64_encode( $iv.$hmac.$ciphertext_raw );
	return $ciphertext;

}
function push_notifications_settings($user_id,$status_type,$dbLink)
{
    $quary = mysqli_query($dbLink,"select isEnabled from push_notification_settings where user_id='".$user_id."' and status_type='".$status_type."'");
    $status_row = mysqli_fetch_object($quary);
    return $status_row->isEnabled;
    
}

?>