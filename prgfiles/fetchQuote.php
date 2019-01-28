<?php 

$host = "localhost";
$user = "root";
$pw = "getrekt123";
$db = "mathaforum";

$language = $_GET['lang'];
$language = 'es';

$con = mysql_connect($host, $user) or die ('Problemas al conectar con el servidor');

// $con = mysql_connect($host, $user, $pw) or $con = mysql_connect($host, $user, $db) or $con = mysql_connect($host, $user) or die ('problemas al conectar server');

mysql_select_db($db, $con) or die ('Problemas al conectar la base de datos');

 $registro = mysql_query("SELECT quote, author, authorbio FROM quotes WHERE lang = '".$language. "'") or die ('Problemas en la consulta: '.mysql_error());


$data = array();

while ($row = mysql_fetch_array($registro)) {

	# code...
	
	 $data[] = $row;
}


$arrlength = count($data);
$data2 = array();
for ($i=0; $i < $arrlength; $i++) { 

	//the property should be replaced for the Data Type
	$texto = $data[$i]["quote"];
	
	//$strLength = strlen($texto) ;
	//$strLength2 = strlen($texto2);
	//$texto = implode(" ",$data[$i]);
	
	# code...
	$codificacion = mb_detect_encoding($texto, "UTF-8, ISO-8859-1");
	//$codificacion2 = mb_detect_encoding($texto2, "UTF-8, ISO-8859-1");
	
	//echo $texto;
	$texto = iconv($codificacion, 'UTF-8', $texto);
	
	//$texto = substr($texto, $strLength);

	//echo $texto  ."<br>";
	
	//array_push($data2, $data[$i]["genre"],$texto);
	$data2[$i]['quote'] = $texto;
	$data2[$i]['authorbio'] = $data[$i]["authorbio"];
		//$data[] = $texto;

}



for ($i=0; $i < $arrlength; $i++) { 

	//the property should be replaced for the Data Type
	$texto = $data[$i]["author"];
	//$texto = implode(" ",$data[$i]);
	# code...
	$codificacion = mb_detect_encoding($texto, "UTF-8, ISO-8859-1");
	
	//echo $texto;
	$texto = iconv($codificacion, 'UTF-8', $texto);
	
	//$texto = substr($texto, $strLength);

	//echo $texto  ."<br>";
	
	//array_push($data2, $data[$i]["genre"],$texto);
	$data2[$i]['author'] = $texto;
	//print_r($data2);
	//$data[] = $texto;

}

echo json_encode($data2);




 ?>