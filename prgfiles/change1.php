<?php 


$host = "localhost";
$user = "root";
$pw = "getrekt123";
$db = "mathaforum";

//$language = $_GET['lang'];
$language = 'es';


$conn = mysql_connect($host, $user) or $conn = mysql_connect($host, $user, $db) or die ("Problemas al Conectar");

mysql_select_db($db, $conn) or die ("Problemas al Conectar Base de Datos");

$registro = mysql_query("SELECT id,question FROM customquestions") or die ('Problemas en la consulta: '.mysql_error());

//MySql returns an associative array
$data = array();

while ($row = mysql_fetch_array($registro)) {

	# code...
	
	 $data[] = $row;
}

$arrlength = count($data);
$data2 = array();
for ($i=0; $i < $arrlength; $i++) { 

	//the property should be replaced for the Data Type
	$texto = $data[$i]["question"]; 
	
	$strLength = strlen($texto) ;
	
	//$texto = implode(" ",$data[$i]);
	# code...
	$codificacion = mb_detect_encoding($texto, "UTF-8, ISO-8859-1");
	
	//echo $texto;
	$texto = iconv($codificacion, 'UTF-8', $texto);
	$texto = str_replace('-*-', '', $texto);
	
	echo $texto;
	//$texto = substr($texto, $strLength);
	$data2[$i]['question'] = $texto;
	$data2[$i]['id'] = $data[$i]['id'];
	//Used for formulas
	
	//array_push($data, $texto);
	//$data[] = $texto;

}

// $arrlength = count($data2);

// for ($i=0; $i <$arrlength ; $i++) { 
// 	# code...
// 	$id = $data2[$i]['id'];
// 	$question = $data2[$i]['question'];

// 	$registro = mysql_query("UPDATE customquestions  SET question ='".$question."' WHERE id='".$id."'") or die ('Problemas en la consulta: '.mysql_error());
// }

 ?>