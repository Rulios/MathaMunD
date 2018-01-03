<?php 

$host = "localhost";
$user = "root";
$pw = "getrekt123";
$db = "mathaforum";

$id = $_POST['id'];



	# code...

	$conn = mysql_connect($host, $user) or $conn = mysql_connect($host, $user, $db) or die ("Problemas al Conectar");

	mysql_select_db($db, $conn) or die ("Problemas al Conectar Base de Datos");

	mysql_query("INSERT INTO reportquestions (id) VALUES ('$id') ", $conn)  or die ("Problemas al insertar");



 ?>