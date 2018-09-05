<?php 

$host = "localhost";
$user = "root";
$pw = "getrekt123";
$db = "mathaforum";

$mode = $_GET['mode'];


$con = mysql_connect($host, $user) or die ('Problemas al conectar con el servidor');

mysql_select_db($db, $con) or die ('Problemas al conectar la base de datos');


$registro = mysql_query("SELECT * FROM questionselection WHERE mode = '$mode'") or die ('Problemas en la consulta: '.mysql_error());


$data = array();

while ($row = mysql_fetch_array($registro)) {

	# code...
	
	 $data[] = $row;
}


echo json_encode($data);

 ?>