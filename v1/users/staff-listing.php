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
		$staff_listing = getConditionalData('tbl_staff','uid',$data->uid,'full_name','asc',$dbLink);
	    
	    
	    $chk_smc = mysqli_query($dbLink,"select IsAuthView from secure_messages_code where user_id='".mysqli_real_escape_string($dbLink,$data->uid)."' and IsAuthView='Yes'");
		if(mysqli_num_rows($chk_smc)>0){
		    $update_code = mysqli_query($dbLink,"update secure_messages_code set IsAuthView='No' where user_id='".mysqli_real_escape_string($dbLink,$data->uid)."'");
		    
		}
		
		// Check payment status of this user //
		$chk_ps = mysqli_query($dbLink,"select id from tbl_registration where id='".mysqli_real_escape_string($dbLink,$data->uid)."' and payment_status='Unpaid'");
		if(mysqli_num_rows($chk_ps)>0)
		{
		    $payment_user_status="Unpaid";
		    
		    $chk_card_update = mysqli_query($dbLink,"select * from tbl_registration where id='".mysqli_real_escape_string($dbLink,$data->uid)."' and ccnumber IS NOT NULL and cvv IS NOT NULL and expiryMonth IS NOT NULL and expiryYear IS NOT NULL"); 
		    if(mysqli_num_rows($chk_card_update)==0){
		        $payment_method='not_updated';
		    }
		    else{
		        $payment_method='updated';
		    }
		    
		}
		else
		{
		    $chk_card_update = mysqli_query($dbLink,"select * from tbl_registration where id='".mysqli_real_escape_string($dbLink,$data->uid)."' and ccnumber IS NOT NULL and cvv IS NOT NULL and expiryMonth IS NOT NULL and expiryYear IS NOT NULL");
		    if(mysqli_num_rows($chk_card_update)==0){
		        $payment_method='not_updated';
		    }
		    else{
		        $payment_method='updated';
		    }
		    
		    $payment_user_status="Paid";
		    
		}
	    
	    
	    
	    echo json_encode(array("response"=>200,"status"=>"OK","listing"=>$staff_listing,"payment_status"=>$payment_user_status,"payment_method"=>$payment_method));
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