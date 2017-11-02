<?php 

$host = "localhost";
$user = "root";
$pw = "getrekt123";
$db = "mathaforum";

$nombre = $_POST['name'];
$area = $_POST['group1'];
$problema = $_POST['postP'];
$posdata = $_POST['postD'];


	# code...

	$conn = mysql_connect($host, $user, $pw) or die ("Problemas al Conectar");

	mysql_select_db($db, $conn) or die ("Problemas al Conectar Base de Datos");

	mysql_query("INSERT INTO questions (name, area, problem, posdata) VALUES ('$nombre' , '$area' , '$problema', '$posdata') ", $conn)  or die ("Problemas al insertar");



 ?>
 