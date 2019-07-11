<?php 


$host = "localhost";
$user = "root";
$pw = "getrekt123";
$db = "mathaforum";

$data = $_GET['filter'];

$pw= "";

$conn =mysqli_connect($host, $user, $pw);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

mysqli_select_db($conn, $db) or die ('Problemas al conectar con la base de datos');	

if ($data == "All") {
	# code...
	 $registro = mysqli_query($conn, "SELECT * FROM questions") or die ('Problemas en la consulta: '.mysql_error());
	
}else{
	 $registro = mysqli_query($conn, "SELECT * FROM questions WHERE area='$data'") or die ('Problemas en la consulta: '.mysql_error());
}

 


$data = array();

while ($row = mysqli_fetch_row($registro)) {

	# code...

	$data[] = $row;
}


echo json_encode($data);


 ?>