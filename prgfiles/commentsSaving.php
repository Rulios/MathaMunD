<?php 

	$host = "localhost";
	$user = "root";
	$pw = "getrekt123";
	$db = "mathaforum";

	$id = $_POST['id'];
	$name = $_POST['name'];
	$comment = $_POST['comment'];


	$con = mysql_connect($host, $user, $pw) or die ('problemas al conectar server');


mysql_select_db($db, $con ) or die ('Problemas al conectar la base de datos');

mysql_query("INSERT INTO commentsofquestions (id, name, comment) VALUES ('$id' , '$name' , '$comment') ", $con) ;

 ?>