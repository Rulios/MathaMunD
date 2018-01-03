var n1 ;
var n2 ;
var CorrectAnswer = 0;
var timesRepeated = 0;




function onLeaveAction(){
	window.onbeforeunload = function() {

   return "Do you really want to leave our brilliant application?";
   //if we return nothing here (just calling return;) then there will be no pop-up question at all
   //return;
}
}

function disableBeforeUnload() {

	//This function is used to prevent that when ShowFinish is enabled
	//It wouldn't pop up the message of onBeforeUnload.
    window.onbeforeunload = null;
}



function generate(){

	return Math.floor(Math.random() * 100);

}



function ShowValues(mode){



	 contador_s = 0;

	var tMode ;


	if (mode == 'Add') {

		tMode = 'Suma';

	}else if (mode == 'Substract') {

		tMode = 'Resta';

	}else if (mode == 'Multiplication') {

		tMode = 'Multiplicación';
	}else if (mode == 'Division') {

		tMode = 'Division'
	}

	//This is to track the count of new problems
	//In which means, if the user is on a # of problem
	if (timesRepeated != 10){

		timesRepeated += 1;
		 document.getElementById('Numeration').innerHTML = tMode + "&nbsp #" + timesRepeated;

	}else{ //If timesRepeated hits 10 (means 10 times), it will display the result
		disableBeforeUnload();

		// document.getElementById('all').style.display = 'none';
		// document.getElementById('Results').innerHTML =  CorrectAnswer + ' de 10';
		// document.getElementById('ShowFinish').style.display = 'block';
		displayResults();
	}




	n1 = generate();
	n2 = generate();

	while(n1 == 0 || n1 <= 10){
		n1 = generate();
	}

	while(n2 == 0){
		n2 = generate();
	}


	//Esta parte representa que pues como 
	//No se puede insertar signos tales como
	//el negativo, entonces creará un BUG
	//Entonces esta parte funciona para que 
	//El primer numero, en este caso n1, sea mayor
	//a n2, y que el resultado no sea negativo
	if (mode == 'Substract') {

		if (n1 < n2) {
			//Creates a variable named 'temporary'
			//to hold n2 value
			//so with that n1 can have the Not changed
			//value of variable n2
			var temporary;

			temporary = n2;
			n2 = n1;
			n1 = temporary;

		}

	}else if (mode == 'Multiplication') {

		n1 = Math.floor(Math.random() * 25);
		n2 = Math.floor(Math.random() * 10);

	}else if (mode == 'Division') {


		var totalTemporaryDiv = 0 ;

		do{ //This DO is to run once time the code

			//Maybe this can be unnecessary , but I'm just randoming on lower numbers
			//by the difficulty, and randoming again if the number I get is 
			//equal to 1 or 0, because that is just too easy

			n1 = Math.floor(Math.random() * 50);
			n2 = Math.floor(Math.random() * 25);
		
			while(n1 == 0 | n1 == 1){
				n1 = Math.floor(Math.random() * 50);
			}

			while(n2 == 0 | n2 == 1){
				n2 = Math.floor(Math.random() * 25);
			}

			if (n2 > n1) {

			//Creates a variable named 'temporary'
			//to hold n2 value
			//so with that n1 can have the Not changed
			//value of variable n2
			var temporary;

			temporary = n2;
			n2 = n1;
			n1 = temporary;

			}

			//check if the division has remains ,if not
			//the numbers should be displayed, else
			//random it again or do the process again

			totalTemporaryDiv = n1 % n2;
			totalTemporaryDiv = Math.floor(totalTemporaryDiv);
			
		}
		while(totalTemporaryDiv != 0);


		
	}

	document.getElementById('UserInput').focus();

	document.getElementById('n1').innerHTML = n1;
	document.getElementById('n2').innerHTML = n2 +  "&nbsp =";

	document.getElementById('Segundos').style.color = '#41D628';
	Temp(mode);		 

	
}





//Código o Algoritmo para recibir solo Numeros
//Dentro de un UserInput en HTML
function justNumbers(e)
        {
        var keynum = window.event ? window.event.keyCode : e.which;
        if ((keynum == 8) || (keynum == 46))
        return true;
         
        return /\d/.test(String.fromCharCode(keynum));
        }


//Esta Funcion revisa si la el resultado y 
//lo que el usuario introdució esta correcto
function check(mode){

	
	var UserInput = document.getElementById('UserInput').value;

	stopInterval();

	if (UserInput != '') {

		if (mode == 'Add') {

		if (n1 + n2 == UserInput) {

			showRight_or_WrongTag(true);
			

		}else{

			showRight_or_WrongTag(false);
			
			
		} 

	}else if (mode == 'Substract') {

		if (n1 - n2 == UserInput) {

			showRight_or_WrongTag(true);
			
			

		}else{

			showRight_or_WrongTag(false);
			
			
		}

	}else if (mode == 'Multiplication') {

		if (n1 * n2 == UserInput) {

			showRight_or_WrongTag(true);
			
			

		}else{

			showRight_or_WrongTag(false);
			
			
		}
	}else if (mode == 'Division') {

		if (n1 / n2 == UserInput) {

			showRight_or_WrongTag(true);

		}else{
			showRight_or_WrongTag(false);
		}

	}
		
	}else{

		if (contador_s >= 16) {
			showRight_or_WrongTag(false);
		}else{
			alert('"HASTA QUE ESOS 15 SEGUNDOS NO SE ACABEN, AUN PODRÁS RESOLVERLO!"');
			Temp(mode);
		}

		

	}
}


function Temp(mode){

	
	s = document.getElementById("Segundos");



	cronometro = setInterval(function(){

		contador_s += 1 ;

		s.innerHTML = "Segundos Transcurridos: " + contador_s;

		if (contador_s >= 10) {
			s.style.color = '#EB1813'; 

		}

		if (contador_s >= 16 ){
			
		
				
			check(mode);

			
			s.style.color = '#5E5E5E'; 

			s.innerHTML = "TIEMPO AGOTADO!!!";

		}

		 }
		 ,1000)

}



function stopInterval(){

		clearInterval(cronometro);
		
		
	
}


function showRight_or_WrongTag(match){

	Right_tag = document.getElementById('Right');
 	Wrong_tag = document.getElementById('Wrong');
 	Arrow_tag = document.getElementById('Arrow');

	if (match == true) {

		if ( Right_tag.className.match(/(?:^|\s)animated fadeOutUp(?!\S)/)){
 		Right_tag.className = 'animated fadeInDown';
 		}

		if (Arrow_tag.className.match(/(?:^|\s)animated fadeOutUp(?!\S)/)){
 		Arrow_tag.className = 'animated fadeInLeft retrasoDeAnimacion_1';
 	    }

		Right_tag.style.display = 'block';
		Right_tag.style.color = '#16E842';
		Arrow_tag.style.display = 'block';
		CorrectAnswer += 1;

	}else{

		if (Wrong_tag.className.match(/(?:^|\s)animated fadeOutUp(?!\S)/)){
 		Wrong_tag.className = 'animated fadeInDown';
 		}

 		if (Arrow_tag.className.match(/(?:^|\s)animated fadeOutUp(?!\S)/)){
 		Arrow_tag.className = 'animated fadeInLeft retrasoDeAnimacion_1';
 	    }

		
		Wrong_tag.style.display = 'block';
		Wrong_tag.style.color = '#EF380F';
		Arrow_tag.style.display = 'block';
	}

}

function exitTags(mode){


	document.getElementById('UserInput').value = '';
	
	if (document.getElementById('Right').style.display == 'block'){

		document.getElementById('Right').className = 'animated fadeOutUp';
		
		document.getElementById('Arrow').className = 'animated fadeOutUp';

		

	}else if (document.getElementById('Wrong').style.display == 'block') {

		document.getElementById('Wrong').className = 'animated fadeOutUp';
		
		document.getElementById('Arrow').className = 'animated fadeOutUp';

		


	
	}

	document.getElementById('Arrow').style.display = 'none';
	document.getElementById('Right').style.display = 'none';
	document.getElementById('Wrong').style.display = 'none';

	ShowValues(mode);
}

function displayResults(){

	if (CorrectAnswer <= 4) {

		document.getElementById('Results').style.color = "red";

	} else if (CorrectAnswer >= 5 || CorrectAnswer <= 7) {

		document.getElementById('Results').style.color = "yellow";
	
	}else if (CorrectAnswer >= 8) {

		document.getElementById('Results').style.color = "green";
	}
	document.getElementById('all').style.display = 'none';
	document.getElementById('ShowFinish').style.display = 'block';
	document.getElementById('Results').innerHTML = "Respondistes " + CorrectAnswer + " de 10 problemas."
	

}







