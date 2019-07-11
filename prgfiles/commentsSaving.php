<?php 

	$host = "localhost";
	$user = "root";
	$pw = "getrekt123";
	$db = "mathaforum";

	$id = $_GET['id'];
	$name = $_GET['name'];
	$comment = $_GET['comment'];

	$pw = "";
	$conn =mysqli_connect($host, $user, $pw);

	if (!$conn) {
	    die("Connection failed: " . mysqli_connect_error());
	}


mysqli_select_db($conn, $db) or die ('Problemas al conectar con la base de datos');	

mysqli_query($conn,"INSERT INTO commentsofquestions (id, name, comment) VALUES ('$id' , '$name' , '$comment') ") ;

echo "hehco";

 ?>