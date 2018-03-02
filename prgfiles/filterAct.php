<?php 


$host = "localhost";
$user = "root";
$pw = "getrekt123";
$db = "mathaforum";

$data = $_GET['filter'];



$con = mysql_connect($host, $user) or $con = mysql_connect($host,$user,$db) or die ('problemas al conectar server');

mysql_select_db($db, $con) or die ('Problemas al conectar la base de datos');

if ($data == "All") {
	# code...
	 $registro = mysql_query("SELECT * FROM questions") or die ('Problemas en la consulta: '.mysql_error());

	
}else{
	 $registro = mysql_query("SELECT * FROM questions WHERE area='$data'") or die ('Problemas en la consulta: '.mysql_error());
}

 


$data = array();

while ($row = mysql_fetch_row($registro)) {

	# code...

	$data[] = $row;
}


echo json_encode($data);


 ?>