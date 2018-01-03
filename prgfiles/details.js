$(document).ready(function(){

	
	var commentDiv;
		

	$('button').focus(function(){
			$('button').blur();
		});


	$('select').focus(function(){
		$('select').blur();
	})

		//Form to Ask

		$('#ask').click(function(){

		var cronToggle;	

		clearTimeout(cronToggle);

		cronTogle = setTimeout(function(){
			$('#frmToAsk').slideToggle('slow');
		},200);	
				

				

	});

		$('#Practice').click(function(){

			$('#spnToCustom').animate({width:'toggle'}, 1000);
			
		});

///////////////////////AJAX///////////////////////////////////
			
	//La parte de e.preventDefault() sirve 
			//para prevenir de que el action del form
			//nos redireccione a formSuggestion.php
			$('form[name=frmForum]').submit(function(e){

				
				e.preventDefault();

				var urlG = "prgfiles/insertar.php";
				var methodF = "POST";
				var	name = $('#name').val();
				var problema = $('#postP').val();
				var posdata = $('#postD').val();
				var area = $('select[name=slctArea]').val();

				$.ajax({

					

					url: urlG,
					type: methodF,
					data: {name: name, group1: area ,postP: problema, postD: posdata}
				,

				

				success: function(respond){
				


					
					$('#sent').html('Enviado!');

				
				},

				error: function(jqXHR, status, error){

					
					$('#sent').html('No enviado');

				},

				complete: function(jqXHR, state){
					console.log('Complete: '  + state);

					
				},

				timeout: 5000

				});



	
			});			


	///////// FILTER action /////////////////////////


	$('body').on('focus', '#commentBtn', function(e){
		this.blur();
	});

	$('body').on('focus', '#reportBtn', function(e){
		this.blur();
	});


	$('#reportBtn').focus(function() {
		/* Act on the event */

		this.blur();
	});

	$('#selectFilter').change(function(){

		$('#content').html('');
		$('form[name=filterSlct]').submit();
	
	});

	$('form[name=filterSlct]').submit(function(event){

		loadAjaxForum(event);
		

		});


	//This part is executed when the page is loaded
	//that actives the AJAX function of finding questions
	$('#forum').ready(function(){

		$('#content').html('');
		$('#content').css({'display' : 'block'});


		$('form[name=filterSlct]').submit();
		resetCommTemp();
	})



	

	var stateOfSlide = {id: 0, state : false};
	
	//When the commentButton is clicked
	$('body').on('click', '#commentBtn', function(e){

		var valOfbtn = $(this).attr('value');
		stateOfSlide.id = $(this).attr('value');
		var cronCommentToggle;

		clearTimeout(cronCommentToggle);

		cronCommentToggle = setTimeout(function(){

			

			if (stateOfSlide.state == false) {
			 $('form[id="'+ valOfbtn + '"][name=commentFrm]').slideDown('1000');
			 stateOfSlide.state = true;
			}else{
			$('form[id="'+ valOfbtn + '"][name=commentFrm]').slideUp('1000');
			stateOfSlide.state = false;
			}
	

			},200);



			// $('form[id="'+ valOfbtn + '"][name=commentFrm]').slideToggle('1000');
			// $('form[id="'+ valOfbtn + '"][name=commentFrm]').toggleClass('toDisplayNone');

		

	});

//This acts when the report button is clicked
//It automatically fills a form which is sent to the database
//The report system works with human intervention, which means
//that the report and the question is checked by a person
//which decides whether or not to eliminate the question.
	$('body').on('click', '#reportBtn', function(e){

		var valueOfReport = $(this).attr('value');

				var frmToReport = document.createElement('FORM');

					frmToReport.setAttribute('action', 'prgfiles/reportQuestions.php');
					frmToReport.setAttribute('method', 'POST');
					frmToReport.setAttribute('name', 'reportFrm');
					frmToReport.setAttribute('class', 'toDisplayNone');
					frmToReport.setAttribute('id', valueOfReport);
				
				var idInput = document.createElement('input');

					idInput.setAttribute('type', 'text');
					idInput.setAttribute('name', 'id');
					idInput.setAttribute('value', valueOfReport);

		frmToReport.append(idInput);
		$('#content').append(frmToReport);			

		$('form[name=reportFrm][id="'+ valueOfReport + '"]').submit();

					
	});

	$('#content').on('submit', 'form[name=reportFrm]', function(e){

		e.preventDefault();
		var id = $(this).attr('id');
		
		$.ajax({
			url: 'prgfiles/reportQuestions.php',
			type: 'POST',
			data: {
				id : id,
			},

			success: function(){


				alert('Gracias por contribuir! Procederemos a la revisión de la pregunta! Estamos concientes de que un ambiente sano es lo mejor!');

			}
		})
			.done(function() {
				//console.log("success");
			})

			.fail(function() {
				//console.log("error");
				
			})

			.always(function() {
				//console.log("complete");
			
			});

	});


	


	$('#content').on('submit', 'form[name=commentFrm]', function(e){

		e.preventDefault();

		

		var id = $(this).attr('id');
		var nombre = $(' input[ id="'+ id + '"]').val();
		var comentario = $('input[name="comment"][id="'+ id + '"]').val();

		$.ajax({
			url: 'prgfiles/commentsSaving.php',
			type: 'POST',
			data: {
				id : id,
				name: nombre,
				comment: comentario
			},

			success: function(){


				

			}
		})
			.done(function() {
				//console.log("success");
			})

			.fail(function() {
				//console.log("error");
				alert('Problemas al enviar comentario...');
			})

			.always(function() {
				//console.log("complete");
			$('form[id="'+ id + '"][name=commentFrm]').slideToggle('1000');
			$('form[id="'+ id + '"][name=commentFrm]').toggleClass('toDisplayNone');
			});

	});

	//To load Comments///////////////////////////////////////////

	$('#content').on('submit', 'form[name=setComments]', function(e){

		e.preventDefault();

		var id = $(this).attr('id');
		

		$.ajax({
		url: 'prgfiles/loadComments.php',
		type: 'GET',
		dataType: 'json',
		data: {id: id},

		success: function(data){



			

			for (var i in data){

				var row = data[i];

				var name  = row[1];
				var comment = row[2];

				var strToDisplay = '<b>'+ name+ '</b>' + ': ' + comment+ '<br>'
				var txtOfDivToMatch = $('div[value="'+ row[0] + '"][name=divItem]').html();
				var strToMatch =  strToDisplay;
				

				var valMatched = txtOfDivToMatch.search(strToMatch);
				
		
		// This If is to verify if valMatched has encountered some same comments
				if (valMatched == -1) {
					
					$('div[value="'+ row[0] + '"][name=divItem]').append(strToDisplay);
				}

				
			
				

			}




		}
	})
	.done(function() {
		// console.log("success");
	})
	.fail(function() {
		// console.log("error");
	})
	.always(function() {
		// console.log("complete");

		
	});
	



	});


	
});




function loadAjaxForum(event){

		
			
			event.preventDefault();
			var filter = $('select[name=filter]').val();

			$.ajax({
				url: 'prgfiles/filterAct.php',
				type: 'GET',
				data: {filter: filter},
				dataType:'json',

				success: function (data){

					

					for (var i in data){

					var row = data[i];
					
					var name = row[1];
					var area = row[2];
					var problem = row[3];
					var posdata =  row[4];

					//button creations

					var btnReport = document.createElement('BUTTON');
					var txtForBtnReport = document.createTextNode('Reportar');

					btnReport.appendChild(txtForBtnReport);
					btnReport.setAttribute('id', 'reportBtn');
					btnReport.setAttribute('class', 'hvr-grow');
					btnReport.setAttribute('value' , row[0]);

					var btnComment = document.createElement('BUTTON');
					var txtForBtnComment = document.createTextNode('Comentar');

					btnComment.appendChild(txtForBtnComment);
					btnComment.setAttribute('id', 'commentBtn' );
					btnComment.setAttribute('class' , 'hvr-grow');
					btnComment.setAttribute('value' , row[0]);

					var divElements = document.createElement('DIV');

					divElements.setAttribute('style', 'border: 2px solid #5EB549;');
					
					divElements.setAttribute('value', row[0]);
					divElements.setAttribute('name', 'divItem');

					var frmToComment = document.createElement('FORM');

					frmToComment.setAttribute('action', 'prgfiles/commentsSaving.php');
					frmToComment.setAttribute('method', 'POST');
					frmToComment.setAttribute('name', 'commentFrm');
					frmToComment.setAttribute('class', 'toDisplayNone');
					frmToComment.setAttribute('id', row[0]);
				
					
					var nameInput = document.createElement('input');

					nameInput.setAttribute('type', 'text');
					nameInput.setAttribute('placeholder', 'Nombre...');
					nameInput.setAttribute('name', 'name');
					nameInput.setAttribute('id', row[0]);

					var commentInput = document.createElement('input');

					commentInput.setAttribute('type', 'text');
					commentInput.setAttribute('placeholder', 'Comentario...');
					commentInput.setAttribute('name', 'comment');
					commentInput.setAttribute('id', row[0] );
					commentInput.setAttribute('maxlength', '140');

					var hideId = document.createElement('input');

					hideId.setAttribute('value', row[0]);
					hideId.setAttribute('name', 'id');
					hideId.setAttribute('class', 'toDisplayNone');

					var submitButtonComment = document.createElement('input');

					submitButtonComment.setAttribute('type', 'submit');
					submitButtonComment.setAttribute('name', 'submit');

					var labelName = document.createElement('label');
					var nameText = document.createTextNode('Nombre: ')
					labelName.appendChild(nameText);

					var labelComment = document.createElement('label');
					var commentText = document.createTextNode('Comentario:');
					labelComment.appendChild(commentText);

					frmToComment.append(labelName);
					frmToComment.append(nameInput);

					frmToComment.append(labelComment);
					frmToComment.append(commentInput);
					frmToComment.append(hideId);
					frmToComment.append(submitButtonComment);

					//////////////////////////////////////////////////

					var hiddenFrmToCommentaries = document.createElement('form');
					hiddenFrmToCommentaries.setAttribute('method', 'GET');
					hiddenFrmToCommentaries.setAttribute('action', 'prgfiles/loadComments.php');
					hiddenFrmToCommentaries.setAttribute('name', 'setComments');
					hiddenFrmToCommentaries.setAttribute('id', row[0]);
					hiddenFrmToCommentaries.setAttribute('class', 'toDisplayNone');


					var hiddenInput = document.createElement('input');
					hiddenInput.setAttribute('value', row[0]);
					hiddenInput.setAttribute('type', 'text');
					hiddenInput.setAttribute('name', 'id');

					hiddenFrmToCommentaries.append(hiddenInput);

					

					//////////////////////////////////////////////////
				
					$('#content').append("<b>Nombre:</b> " + name + "<br><b>Area: </b>" + area + "<br><b>Problema: </b>" + problem + "<br><b>Posdata: </b>" + posdata + " ");
					$('#content').append(btnReport);
					$('#content').append(btnComment);
					$('#content').append('<br> <br>');
					$('#content').append(frmToComment);
					$('#content').append('<br> <br>');
					$('#content').append('<b>Comentarios:</b>');
					$('#content').append(hiddenFrmToCommentaries);
					$('#content').append(divElements);

					
					}

			

				}

			})
			.done(function() {
				//console.log("success");

			})

			.fail(function() {
				//console.log("error");
			})

			.always(function() {
				//console.log("complete");
				
				$('form[name=setComments]').submit();
				

			});
		
			

		;

}


function resetCommTemp(){

	var cronTemp;

	cronTemp = setInterval(function(){

		addCommentReg();


	}, 2500);

}


function addCommentReg(){



		$('form[name=setComments]').submit();


	




}