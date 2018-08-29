<?php 

$host = "localhost";
$user = "root";
$pw = "getrekt123";
$db = "mathaforum";

$id = $_GET['id'];


$con = mysql_connect($host, $user) or die ('Problemas al conectar con el servidor');

// $con = mysql_connect($host, $user, $pw) or $con = mysql_connect($host, $user, $db) or $con = mysql_connect($host, $user) or die ('problemas al conectar server');

mysql_select_db($db, $con) or die ('Problemas al conectar la base de datos');

 $registro = mysql_query("SELECT * FROM commentsofquestions WHERE id = $id") or die ('Problemas en la consulta: '.mysql_error());


$data = array();

while ($row = mysql_fetch_array($registro)) {

	# code...
	
	 $data[] = $row;
}


echo json_encode($data);






 ?>