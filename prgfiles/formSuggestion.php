<?php


	$nombre = $_POST['realname'];
	$mensaje = $_POST['comments'];
	$asunto = "Sugerencia o comentario";
	$destino = "robert_lu20@hotmail.com";
	$desde = "FROM:". "mathamund_Suggestions";
	

	$sent= mail($destino,$asunto, $mensaje, $desde );

	if ($sent) {
		# code...
		echo "Correo enviado";
	}else{
		echo "Correo no enviado";
	}



	
?>