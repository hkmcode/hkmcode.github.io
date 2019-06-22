<?php 

$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];
$formcontent="From: $name \n Message: $message";
$recipient = "info@royalkwt.com";
$subject = "Contact Form- ".$subject;
$mailheader = "From: $email \r\n";
$status=mail($recipient, $subject, $formcontent, $mailheader) or die("Error!");
echo $status."Thank You!";

?>