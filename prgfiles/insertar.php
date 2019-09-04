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

	#check if the strings has quotations mark
	#to prevent confusion with MySQL it adds /

	$strpos = strpos($nombre, "'");
	if($strpos != false){
		$nombre = addcslashes($nombre, "'");
	}

	$strpos = strpos($area, "'");
	if($strpos != false){
		$area = addcslashes($area, "'");
	}

	$strpos = strpos($problema, "'");
	if($strpos != false){
		$problema = addcslashes($problema, "'");
	}

	$strpos = strpos($posdata, "'");
	if($strpos != false){
		$posdata = addcslashes($posdata, "'");
	}
		
	$conn = mysqli_connect($host, $user, $pw);

	if (!$conn) {
		die("Connection failed: " . mysqli_connect_error());
	}

	mysqli_select_db($conn, $db) or die ("Problemas al Conectar Base de Datos");

	mysqli_query($conn, "INSERT INTO questions (name, area, problem, posdata) VALUES ('$nombre' , '$area' , '$problema', '$posdata') ")  or die ("Problemas al insertar").mysqli_error($conn);



 ?>
 