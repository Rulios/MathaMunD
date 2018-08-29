$(document).ready(function(){

	
	
	var commentDiv;
		

	$('button').focus(function(){
			$('button').blur();
		});


	$('select').focus(function(){
		$('select').blur();
	})

		//Form to Ask MATHAFORUM BTN

		$('#ask').click(function(){
		    $('#modal').css('display', 'block');
	});

		//Form to ask JUGAR BTN (CUSTOM SELECTION OF SUBJECTs)
		$('#Practice').click(function(){
		    $('#modal').css('display', 'block');
	});
		
	// When the user clicks on <span> (x), close the modal
	var span = document.getElementsByClassName("close")[0];

	span.onclick = function(){
		$('#modal').css('display', 'none');
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event){
		
		if (event.target.nodeName == 'DIV') {
			$('#modal').css('display', 'none');
			
		}
	}


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
				



					

				
				},

				error: function(jqXHR, status, error){

					
					$('#sent').html('No enviado');

				},

				complete: function(jqXHR, state){
					$('#frmAskBtn').prop("disabled", true);
					$('#frmAskBtn').css("background-color", "#727272FF");
					$('#frmAskBtn').val("ENVIADO!");
					$('#modal').css('display', 'none');
					


					
				},

				timeout: 5000

				});

				$('form[name=filterSlct]').submit();

	
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
	});



	

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


				alert('Gracias por contribuir! Procederemos a la revisión de la pregunta! Estamos conscientes de que un ambiente sano es lo mejor!');

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

		if (nombre == '') {
			alert('Ingresa un nombre');
		}else{

		$.ajax({
			url: 'prgfiles/commentsSaving.php',
			type: 'GET',
			data: {
				id : id,
				name: nombre,
				comment: comentario
			},

			success: function(){

				$('form[name=setComments]').submit();
				
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

		}

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

				var strToDisplay = '<b>'+ name+ '</b>' + ': ' + comment + '<br>';
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

repeatCheckOverlapping();



	
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

					var elementId = []; //array for storing elements id	

					if (data == "") {
						$('#forumFooter').css("position", "absolute");
					}else{

					var row = [];
					var name;
					var area;
					var problem;
					var posdata;

					for (var i in data.reverse()){ 
 					//data.reverse() is used to arrange to the most recent data
					row = data[i];	
					elementId.push(row[0]);
					
					name = row[1];
					area = row[2];
					problem = row[3];
					posdata =  row[4];	

					//button creations

					var btnReport = document.createElement('BUTTON');
					var txtForBtnReport = document.createTextNode('Reportar');

					btnReport.appendChild(txtForBtnReport);
					btnReport.setAttribute('id', 'reportBtn');
					btnReport.setAttribute('class', 'hvr-grow');
					btnReport.setAttribute('value' , elementId[i]);

					var btnComment = document.createElement('BUTTON');
					var txtForBtnComment = document.createTextNode('Comentar');

					btnComment.appendChild(txtForBtnComment);
					btnComment.setAttribute('id', 'commentBtn' );
					btnComment.setAttribute('class' , 'hvr-grow');
					btnComment.setAttribute('value' , elementId[i]);

					var divElements = document.createElement('DIV');

					divElements.setAttribute('style', 'border: 2px solid #5EB549;');
					
					divElements.setAttribute('value', elementId[i]);
					divElements.setAttribute('name', 'divItem');

					var frmToComment = document.createElement('FORM');

					frmToComment.setAttribute('action', 'prgfiles/commentsSaving.php');
					frmToComment.setAttribute('method', 'GET');
					frmToComment.setAttribute('name', 'commentFrm');
					frmToComment.setAttribute('class', 'toDisplayNone');
					frmToComment.setAttribute('id', elementId[i]);
				
					
					var nameInput = document.createElement('input');

					nameInput.setAttribute('type', 'text');
					nameInput.setAttribute('placeholder', 'Nombre...');
					nameInput.setAttribute('name', 'name');
					nameInput.setAttribute('id', elementId[i]);

					var commentInput = document.createElement('input');

					commentInput.setAttribute('type', 'text');
					commentInput.setAttribute('placeholder', 'Comentario...');
					commentInput.setAttribute('name', 'comment');
					commentInput.setAttribute('id', elementId[i] );
					commentInput.setAttribute('maxlength', '140');

					var hideId = document.createElement('input');

					hideId.setAttribute('value', elementId[i]);
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

					var hiddenDiv = document.createElement('DIV');
					
					hiddenDiv.setAttribute('id', 'hiddenDiv');
					

					//////////////////////////////////////////////////

					var hiddenFrmToCommentaries = document.createElement('form');
					hiddenFrmToCommentaries.setAttribute('method', 'GET');
					hiddenFrmToCommentaries.setAttribute('action', 'prgfiles/loadComments.php');
					hiddenFrmToCommentaries.setAttribute('name', 'setComments');
					hiddenFrmToCommentaries.setAttribute('id', elementId[i]);
					hiddenFrmToCommentaries.setAttribute('class', 'toDisplayNone');


					var hiddenInput = document.createElement('input');
					hiddenInput.setAttribute('value', elementId[i]);
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
					$('#content').append(hiddenDiv);



					

					}

				

					
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
		
}


//This only works on Mathaforum.html!
var checker;
function repeatCheckOverlapping(){
	checker = setInterval(collidesWith, 500);
}

//If content overlaps the footer
function collidesWith (element1, element2) {

	var element1 = $('#ForumSection');
	var element2 = $('#forumFooter');
	
    var PosElement1 = {
    	top: $(element1).position().top,
    	left: $(element1).position().left,	
    	right: Number($(element1).position().left) + Number($(element1).width()),
    	bottom: Number($(element1).position().top) + Number($(element1).height())};

  	var PosElement2 = {
    	top: $(element2).position().top,
    	left: $(element2).position().left,
    	right: Number($(element2).position().left) + Number($(element2).width()),
    	bottom: Number($(element2).position().top) + Number($(element2).height())};

	// PosElement1.right > PosElement2.left && PosElement1.left < PosElement2.right && PosElement1.top < PosElement2.bottom && PosElement1.bottom > PosElement2.top

    if (PosElement1.bottom >= PosElement2.top) {
        // Do your stuff here

        $('#forumFooter').css("position", "relative");

    }
    
}


function resetCommTemp(){

	var cronTemp;

	cronTemp = setInterval(function(){

		addCommentReg();


	}, 6000);

}


function addCommentReg(){

		$('form[name=setComments]').submit();
}
