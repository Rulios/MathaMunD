<?php 

	$host = "localhost";
	$user = "root";
	$pw = "getrekt123";
	$db = "mathaforum";

	$id = $_GET['id'];
	$name = $_GET['name'];
	$comment = $_GET['comment'];


	$con = mysql_connect($host, $user, $pw) or $con = mysql_connect($host, $user, $db) or $con = mysql_connect($host, $user) or die ('problemas al conectar server');


mysql_select_db($db, $con) or die ('Problemas al conectar la base de datos');

mysql_query("INSERT INTO commentsofquestions (id, name, comment) VALUES ('$id' , '$name' , '$comment') ", $con) ;

echo "hehco";

 ?>