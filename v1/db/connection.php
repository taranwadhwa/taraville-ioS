<?php
date_default_timezone_set('America/New_York');
function connectDB()
{
	$dbLink = mysqli_connect("localhost","Taraoffice","Taranjittara21#","tara_office");
	return $dbLink;
}
?>