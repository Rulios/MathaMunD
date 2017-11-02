$(document).ready(function(){

			//La parte de e.preventDefault() sirve 
			//para prevenir de que el action del form
			//nos redireccione a formSuggestion.php
			$('form[name=frmForum]').submit(function(e){

				
				e.preventDefault();

				var urlG = "insertar.php";
				var methodF = "POST";
				var	name = $('#name').val();
				var problema = $('#postP').val();
				var posdata = $('#postD').val();
				var area = $('input[name=group1]').val();

				$.ajax({

					

					url: 'js/insertar.php',
					type: 'POST',
					data: {name: name, group1: area ,postP: problema, postD: posdata}
				,

				

				success: function(respond){
					console.log('Success: '+ respond);

					alert("Completado " + respond);
				},

				error: function(jqXHR, status, error){

					console.log('Status: ' + status);
					console.log('Error ' + error);
					alert("Error " + status + error);

				},

				complete: function(jqXHR, state){
					console.log('Complete: '  + state);

					alert("Complete " + state);
				},

				timeout: 5000

				});

	
			});	
	
});

