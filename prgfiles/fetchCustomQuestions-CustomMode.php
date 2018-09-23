<?php 

$host = "localhost";
$user = "root";
$pw = "getrekt123";
$db = "mathaforum";

$mode = "Teorema de Pitagoras";//$_GET['mode'];


$conn = mysql_connect($host, $user) or $conn = mysql_connect($host, $user, $db) or die ("Problemas al Conectar");

mysql_select_db($db, $conn) or die ("Problemas al Conectar Base de Datos");

$registro = mysql_query("SELECT question FROM customquestions WHERE mode ='".$mode."'") or die ('Problemas en la consulta: '.mysql_error());

//MySql returns an associative array
$data = array();

while ($row = mysql_fetch_array($registro)) {

	# code...
	
	 $data[] = $row;
}

$arrlength = count($data);

for ($i=0; $i < $arrlength; $i++) { 

	
	$texto = $data[$i]["question"];
	
	$strLength = strlen($texto) ;
	
	//$texto = implode(" ",$data[$i]);
	
	# code...
	$codificacion = mb_detect_encoding($texto, "UTF-8, ISO-8859-1");
	
	//echo $texto;
	$texto = iconv($codificacion, 'UTF-8', $texto);
	
	//$texto = substr($texto, $strLength);

	echo $texto;
	
	array_push($data, $texto);
	//$data[] = $texto;

}




echo json_encode($data);

 ?>