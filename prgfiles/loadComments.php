<?php 

$host = "localhost";
$user = "root";
$pw = "getrekt123";
$db = "mathaforum";

$id = $_GET['id'];

$pw = '';
$conn =mysqli_connect($host, $user, $pw);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}


// $conn = mysql_connect($host, $user, $pw) or $conn = mysql_connect($host, $user, $db) or $conn = mysql_connect($host, $user) or die ('problemas al conectar server');

mysqli_select_db($conn, $db) or die ('Problemas al conectar con la base de datos');	

 $registro = mysqli_query($conn, "SELECT * FROM commentsofquestions WHERE id = $id") or die ('Problemas en la consulta: '.mysqli_error());


$data = array();

while ($row = mysqli_fetch_array($registro)) {

	# code...
	
	 $data[] = $row;
}


echo json_encode($data);





 ?>