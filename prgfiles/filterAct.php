<?php 


$host = "localhost";
$user = "root";
$pw = "getrekt123";
$db = "mathaforum";

$data = $_GET['filter'];

$con = mysql_connect($host, $user, $pw) or die ('problemas al conectar server');

mysql_select_db($db, $con ) or die ('Problemas al conectar la base de datos');

 $registro = mysql_query("SELECT * FROM questions WHERE area='$data'") or die ('Problemas en la consulta: '.mysql_error());


$data = array();

while ($row = mysql_fetch_row($registro)) {

	# code...

	$data[] = $row;
}


echo json_encode($data);


 ?>