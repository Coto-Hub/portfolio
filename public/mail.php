<?php
ini_set( 'display_errors', 1 );
error_reporting(E_ALL);
$from = "test@hostinger-tutorials.fr";
$to = "thomas.marty@etu.unilim.fr";
$subject = "Essai de PHP Mail";
$message = "PHP Mail fonctionne parfaitement";
$headers = "De :" . $from;
mail($to,$subject,$message, $headers);
echo "L'email a été envoyé.";
?>