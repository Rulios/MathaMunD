<?php 

$host = "localhost";
$user = "root";
$pw = "getrekt123";
$db = "mathaforum";

$id = $_POST['id'];

$pw = "";

	# code...

	$conn =mysqli_connect($host, $user, $pw);

	if (!$conn) {
	    die("Connection failed: " . mysqli_connect_error());
	}


	mysqli_select_db($conn, $db) or die ('Problemas al conectar con la base de datos');	

	mysqli_query($conn ,"INSERT INTO reportquestions (id) VALUES ('$id') ")  or die ("Problemas al insertar");



 ?>