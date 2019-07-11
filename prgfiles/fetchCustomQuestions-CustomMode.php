<?php 

$host = "localhost";
$user = "root";
$pw = "getrekt123";
$db = "mathaforum";

$pw = "";

$mode = $_GET['mode'];

$conn =mysqli_connect($host, $user, $pw);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

mysqli_select_db($conn, $db) or die ("Problemas al Conectar Base de Datos");

$registro = mysqli_query($conn, "SELECT question, formula, inputType FROM customquestions WHERE mode ='".$mode."'") or die ('Problemas en la consulta: '.mysqli_error($conn));

//MySql returns an associative array
$data = array();

while ($row = mysqli_fetch_array($registro)) {

	# code...
	
	 $data[] = $row;
}

//Convert codification

$arrlength = count($data);
$data2 = array(); //Used for formulas

for ($i=0; $i < $arrlength; $i++) { 

	//the property should be replaced for the Data Type
	$texto = $data[$i]["question"]; 
	
	$strLength = strlen($texto) ;
	
	//$texto = implode(" ",$data[$i]);
	
	# code...
	$codificacion = mb_detect_encoding($texto, "UTF-8, ISO-8859-1");
	
	//echo $texto;
	$texto = iconv($codificacion, 'UTF-8', $texto);
	
	//$texto = substr($texto, $strLength);
	$data2[$i]['question'] = $texto;
	//Used for formulas
	$data2[$i]['formula'] = $data[$i]["formula"];
	//Used for Input Types
	$data2[$i]['inputType'] = $data[$i]["inputType"];
	//echo $texto;
	
	//array_push($data, $texto);
	//$data[] = $texto;

}

echo json_encode($data2);

 ?>