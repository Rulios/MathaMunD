//Initialize the global scope variables
var actualTotalCorrectResult;
var pythagorasCheck;
var perCheck;
var timesPRep = 0; //Times in which users clicks #Arrow2
var usrAnswer = 0; //Times the user answered correctly

///// Questions Variable /////////////
var pythagorasQuestions = [];
var perAQuestions = [];
var UserState = false; //Variable to detech if user has first entered

$(document).ready(function(){

	$('#startCustom').click(function(e){

    actualTotalCorrectResult = 0;
  //Algorithm to get all the values of the Checkboxes
	var selected_value = []; // initialize empty array 

   	 $("input[name=items1]:checked").each(function(){

        selected_value.push($(this).val());
       

   	 });

   	 //This part is to verify if modes are selected
   	 //to get to the custom page
   	 if (selected_value == '') {
   	 	e.preventDefault();
   	 	alert('SELECCIONE UNO O MÁS MODOS!');


   	 }else{//this part is to check the modes selected

    pythagorasCheck = checkSelectedModes(selected_value, 'Pythagoras');
    perCheck = checkSelectedModes(selected_value, 'Perimeter');
      
  //Hide ModalBox
     $('#modal').css('display', 'none');
  // Hide all 'play' Selection page 
      //$('#allPlayPage').slideUp(2000);    
      //$('#allPlayPage').hide(2000);
      $('#allPlayPage').css('display', 'none');
  // Shows all 'custom' page    

      $('#title').text('Personalizada');
      //$('#allCustom').slideUp(1000);
      $('#allCustom').css('display', 'block');

        var range = 0;
        
        $('#inputCustom').focus();
        
        if (pythagorasCheck == true && perCheck == true) {
          randomizeCustomModes('all');//All means all selected modes

        }else if (pythagorasCheck == true) {
          randomizeCustomModes('1'); //1 means theory of Pythagoras

        }else if(perCheck == true){
          randomizeCustomModes('2'); //2 means area and perimeter
          
        }

     }

	});

	$('#inputCustom').focus();


  $('#btnAnswer').click(function(){

    var userValue = $('#inputCustom').val();
   
    if (userValue == 0 ) {  //Check if user entered a value

      alert('RESPUESTA INVÁLIDA! SIEMPRE PUEDES RESPONDER ALGO!');

    }else{


      if (userValue == actualTotalCorrectResult) { //check if the value is corect
      usrAnswer += 1;  
      showTags ('Right', 'Show')

      }else{
        
        showTags('Wrong', 'Show');

      }

      $("#btnAnswer").addClass('disable');
      $('#Arrow2').css('display', 'inline-block');

    }


  });


/*----------------- Repetition of the problem and randomization ---------*/
$('#Arrow2Container').click(function() {

 if (timesPRep < 10) {
  showTags('none', 'Hide');

  if (pythagorasCheck == true && perCheck == true) {
          randomizeCustomModes('all');//All means all selected modes

        }else if (pythagorasCheck == true) {
          randomizeCustomModes('1'); //1 means theory of Pythagoras

        }else if(perCheck == true){
          randomizeCustomModes('2'); //2 means area and perimeter
          
        }

      }else{

        showResults();
      } 



    });

});



function randomizeCustomModes(context){

  var randomMode;
  

  timesPRep += 1;

//Initialize the generate
if (context == 'all') {

    //I don't know I've got to put 3 as parameter, it seems on only an
    //possibility of generating _context 1. But having 3 it solves this problem
    //and generates  _context 2.
    context = generate(3 ,false);

    if (context == '1') {
      generatePythagoras();
    }else if (context == '2') {
      //areaAndPerimeter();
      generateQuestionsAreaAndPerimeter();
    }

    }else if (context == '1') { //Pythagoras

      generatePythagoras();

    }else if (context == '2') { //Area And Perimeter

      //areaAndPerimeter();
      generateQuestionsAreaAndPerimeter();

  }

}

function checkSelectedModes(arrSelected , requester){

  //The parameter of receiver is to know what variable is requesting it

   var found = false;
   var strToPerimeter = 'Areas y Perímetros';
   var strToPythagoras = 'Teorema de Pitagoras';

        //See if the variable that is requesting  is
//[0] = 'Teorema de Pitagoras'
        //Pythagoras
        if (requester == 'Pythagoras') {

            if (arrSelected[0] == strToPythagoras) {
              found = true;
             
            }
//[1] = 'Areas y Perimetros'
          //Perimeter or Area  
        }else{

          for(var i = 0; i < arrSelected.length; i ++){

            if (requester == 'Perimeter') {

              if (arrSelected[i] == strToPerimeter) {
                found = true;
                
              }

            }  

          }
            

        } 
      
        return found;

}




function generatePythagoras(context){
//Function to random get some questions

//Initialize values of the sides
// a and b are short sides
//and C is the longest side
var a = 0;
var b = 0;
var c = 0;

//Randomize the type, so it can have to A, To B, To C

   if (context == 1) { //Having a and b but need to solve C

  
        do{

      a = generate(15);
      b = generate(15);

      var notDecimal = false;//This variable is to check if 
                //the result is going decimal
                // if is false means that has decimal
                // else it doesn't have

      var beforeRoot;//variable to get value before Square Root


      beforeRoot = Math.pow(a, 2) + Math.pow(b, 2);
     

      var squareRoot;

      squareRoot = Math.sqrt(beforeRoot); //Get the Square Root

      if (squareRoot % 1 != 0){
        notDecimal = false;
      }else{
        notDecimal = true;
      }

    }while(notDecimal == false)

    actualTotalCorrectResult = Math.sqrt(Math.pow(a,2) + Math.pow(b,2));
    //generatePythagorasQuestions(1, a, b, 0);
////////////////////////////////////////////////////////////////////
   }else if(context == 2){//having a and c but need to solve B

    do{

        do{//To check if Hypotenuse is bigger than legs

          a = generate(15);
          c = generate(15);

        }while(c <= a);



      var notDecimal = false;//This variable is to check if 
                //the result is going decimal
                // if is false means that has decimal
                // else it doesn't have

      var beforeRoot;//variable to get value before Square Root


      beforeRoot = Math.pow(a, 2) - Math.pow(c, 2);
      beforeRoot = changeToPositive(beforeRoot);

      var squareRoot;

      squareRoot = Math.sqrt(beforeRoot); //Get the Square Root

      if (squareRoot % 1 != 0){
        notDecimal = false;
      }else{
        notDecimal = true;
      }

    }while(notDecimal == false)

    actualTotalCorrectResult = Math.sqrt(Math.pow(c,2) - Math.pow(a,2));
    //generatePythagorasQuestions(2, a, 0 , c);


   }else if(context == 3){//having b and c but need to solve a

    do{

        do{//To check if Hypotenuse is bigger than longest

          b = generate(15);
          c = generate(15);

        }while(c <= b);



      var notDecimal = false;//This variable is to check if 
                //the result is going decimal
                // if is false means that has decimal
                // else it doesn't have

      var beforeRoot;//variable to get value before Square Root

      beforeRoot = Math.pow(c, 2) - Math.pow(b, 2);
      beforeRoot = changeToPositive(beforeRoot);

      var squareRoot;

      squareRoot = Math.sqrt(beforeRoot); //Get the Square Root

      if (squareRoot % 1 != 0){
        notDecimal = false;
      }else{
        notDecimal = true;
      }

    }while(notDecimal == false)

    console.log('Before Root' + beforeRoot);
    console.log('Square Root' + squareRoot);

    actualTotalCorrectResult = Math.sqrt(Math.pow(c,2) - Math.pow(b,2));
    //generatePythagorasQuestions(3, 0, b, c);
  }

    //See structure//
    //It Ajax's the questions from the DB, to then direct to the 
    //HTML conversion

    return [a,b,c];

}






function generate(range ,needZero){

  var n ;
  range += 1; //add 1, Don't know why, but it fix some accuracy problems

  if (needZero == true) {

     n = Math.floor(Math.random() * range);

  }else if(typeof needZero == 'undefined' || needZero == false){

      do{

         n = Math.floor(Math.random() * range);
 
      }while(n == 0)

  }

  return n; 
  

}

function changeToPositive(n){

  if (n < 0) {

    n = n * -1;

  }

  return n;

}

function generatePythagorasQuestions(){


    $('#keyWords').text('');
    $('#MainTitleCustom').text('Teorema de Pitágoras');


    $('#keyWords').append(' <b><u> Hipotenusa:</u> </b> Lado de mayor longitud de un Triángulo Rectángulo. <br> ');
    $('#keyWords').append('<b><u> Catetos</u> </b> : Lados de menor longitud de un Triángulo Rectángulo.');

    if (UserState == false) { //Means that first loaded state

      UserState = true;

       //Callback - Fetch Questions
       fetchCustomQuestions("TPYTHG",function(questions){

        var questionsContext1 = [];
        var questionsContext2 = [];
        var questionsContext3 = [];
        pythagorasQuestions = StrToArraySeparation(questions);
        console.log(pythagorasQuestions);
        var x = 0;
        for(i = 0; i < pythagorasQuestions.length; i++){

          x = (questionIdentification(pythagorasQuestions[i], "TPYTHG"));

          switch(x){

            case 1:

            questionsContext1.push(pythagorasQuestions[i]);

            break;

            case 2:
            questionsContext2.push(pythagorasQuestions[i]);

            break;

            case 3:
            questionsContext3.push(pythagorasQuestions[i]);

            break;    
          }
        }
      });
    }

    var rdn = 0;
    var context = 0;
    var string;
    var values = [];
    context = generate(3,false); //Get the context
    switch(context){

      case 1: 

      rdn = generate(questionsContext1.length, false);
      values = generatePythagoras(context);
      string = stringReplaceValue(a,b,c,questionsContext1[(rdn - 1)]);

      break;

      case 2:

      rdn = generate(questionsContext2.length, false);
      values = generatePythagoras(context);
      string = stringReplaceValue(a,b,c,questionsContext2[(rdn - 1)]);

      break;

      case 3:

      rdn = generate(questionsContext3.length, false);
      values = generatePythagoras(context);
      string = stringReplaceValue(a,b,c,questionsContext3[(rdn - 1)]);

      break;
    }
    
    //Context means the side to solve it

    
    
    
    var questionsDescription = $('#DescriptionCustom');
    
    //We use generate() with noNeedOfZero
    //But when sending to stringReplaceValue we put rdn-1
    //To substract from the rdn, to prevent matching rdn with the Array of the Question
    //To prevent undefined, and because JS array asignations begins in 0.

    if (pythagorasSideCheck == 1) {

      rdn = generate(questionsContext1.length, false);
      
      string = stringReplaceValue(a,b,c,questionsContext1[(rdn - 1)]);
      console.log("arrLength" + questionsContext1.length +'rdn' + (rdn-1));
      questionsDescription.text(string);

    }else if (pythagorasSideCheck == 2) {

      rdn = generate(questionsContext2.length, false);
      
      string = stringReplaceValue(a,b,c,questionsContext2[(rdn - 1)]);
      console.log("arrLength" + questionsContext2.length +'rdn' + (rdn-1));
      questionsDescription.text(string);

    }else if (pythagorasSideCheck == 3) {

      rdn = generate(questionsContext3.length, false);
      
      string = stringReplaceValue(a,b,c,questionsContext3[(rdn - 1)]);
      console.log("arrLength" + questionsContext3.length +'rdn' + (rdn-1));
      questionsDescription.text(string);
      

    }
      
     $('#NProblem').text('#' + timesPRep);
     string = "";

    

}

function areaAndPerimeter(){
   console.log('AR');
   var rnd = generate(2, false);
   var a,b ;

  
   // 1 = Area
   // 2 = Perimeter

   if (rnd == 1) { //AREA OF Square or Rectangle

  
      a = generate(20, false);
      b = generate(20, false);
   
      if (a == b) {
        
        actualTotalCorrectResult = a * b;
        generateQuestionsAreaAndPerimeter("AreaSquare", a, b);

      }else {
       
        actualTotalCorrectResult = a * b;
        generateQuestionsAreaAndPerimeter("AreaRectangle", a, b);
      }

   }else if  (rnd == 2){ //PERIMETER OF SQUARE OR RECTANGLE

      var i = generate(2, false);

      if (i == 1) { // Perimter of Square

        do{
          a = generate(20, false);
          b = generate(20, false);
        }while (a =! b);
        actualTotalCorrectResult = a + b;
        generateQuestionsAreaAndPerimeter("PerimeterSquare", a, b);
      

      } else if (i == 2 ){ //Perimeter of Rectangle
          a = generate(20, false);
          b = generate(20, false);
         
          actualTotalCorrectResult = a + b;
        generateQuestionsAreaAndPerimeter("PerimeterRectangle", a, b);  
      } 

   }

  var c = undefined; //this is just to fill parameters

  
}

function generateQuestionsAreaAndPerimeter(/*context, a , b*/){
  alert("hola");

  fetchCustomQuestions(undefined,undefined,undefined, "A&PSR");
  alert(perAQuestions);

  $('#FormulaDescriptionCustom').text('');
  $('#keyWords').text('');
  $('#imgPythagoras').css('display' , 'none');

  var questionsDescription = $('#DescriptionCustom');

  

  var rdn = generate(3,false);

    if (context == 'AreaSquare') {

      questionsDescription.html(questionsContext1[rdn]);
      $('#MainTitleCustom').text('Área de un Cuadrado');

    }else if (context == 'AreaRectangle'){

      questionsDescription.html(questionsContext2[rdn]);
      $('#MainTitleCustom').text('Área de un Rectángulo');

    }else if (context == 'PerimeterSquare') {

      questionsDescription.html(questionsContext3[rdn]);
      $('#MainTitleCustom').text('Perímetro de un Cuadrado');

    }else if (context == 'PerimeterRectangle') {

      questionsDescription.html(questionsContext4[rdn]);
      $('#MainTitleCustom').text('Perímetro de un Rectángulo');
    }

    $('#NProblem').text('#' + timesPRep);
}

function showTags(state, action){

    //The parameter of _state means if it needs to show the Right or Wrong tag

    //The parameter of _action means the if it needs to close or open 
    //the tags.
    
    if (action == 'Show') {

      if (state == 'Right') {

        $('#Right').css('display', 'inline-block');
        $('#Right').css('position', 'relative');

      } else if (state == 'Wrong') {

       $('#Wrong').css('display', 'inline-block');
       $('#Wrong').css('position', 'relative');
     }

   } else if (action == 'Hide'){ //This includes all the animation hiding
      
      $('#Right').css('display', 'none');
      $('#Wrong').css('display', 'none');
      $('#inputCustom').val('');
      $('#btnAnswer').removeClass('disable');
      $('#Arrow2').css('display', 'none');

  }
}

function showResults(){
  


  if (usrAnswer <= 4) {
    $('#DescriptionCustom').css('color', 'red');
    

  } else if (usrAnswer >= 5 || usrAnswer <= 7) {
    $('#DescriptionCustom').css('color', 'yellow');
    

  }else if (usrAnswer >= 8) {
    $('#DescriptionCustom').css('color', 'green');
    
  }
  
  //Evaluate if the user is on Pc or Mobile, so it shows other description
  if (screen.width <= 768) {
    $('#DescriptionCustom').css('text-align' , 'center').css('font-size','40px');
  }else{
    $('#DescriptionCustom').css('text-align' , 'center').css('font-size','60px');
  }
  
  $('#DescriptionCustom').text('Has respondido ' + usrAnswer + ' de 10!');
  $('#DescriptionCustom').append("<br>");
  $('#ResultAndGo').css('display','none');
  $('#divAnswerCustom').css('display', 'none');
  $('#MainTitleCustom').css('display', 'none');
  $('#imgPythagoras').css('display', 'none');

}
//Javascript///////////////////////////fetch with AJAX
function fetchCustomQuestions(mode, callback){ //This is used to get the questions from the DB

var mode = mode;
var data = [];
var row = [];

      $.ajax({
        url: 'prgfiles/fetchCustomQuestions-CustomMode.php',
        type: 'GET',
        data: {mode: mode},
        datatype:'json',

      }).done(function(done){}, callback);
}


function StrToArraySeparation(strData){
  
  
  var text;

  text = strData.split("-*-");

  text.pop(); //Remove last element to remove the blank space

  return text;



}
//Function to see what context means
function questionIdentification(question, mode){//function to see which context
//Pythagoras
  var context;
  var aFound, bFound, cFound;

  if (mode == "TPYTHG") { //Pythagora's Theorem

    aFound = question.search("valorA");
    bFound = question.search("valorB");
    cFound = question.search("valorC");

    if ((aFound >= 0) && (bFound >= 0)) {
      context = 1;
    }else if ((aFound >= 0) && (cFound >= 0)) {
      context = 2;
    }else if ((bFound >= 0) && (cFound >= 0)) {
      context = 3;
    }


  }else if (mode == "A&PSR"){ //Area and perimeter of squares and rectangles
    var x = question.includes("área") || question.includes("Área");

    if (x == true) {
     
    }



  }

  

  return context;

}

function stringReplaceValue(a,b,c,question){


  console.log(a);
  console.log(b);
  console.log(c);

  if (a != 0 || typeof a =='undefined'){
  console.log("True");  
  question = question.replace('valorA', a);

  }

  if (b != 0 || typeof b =='undefined') {
  question = question.replace('valorB', b);
    
  }

  if(c != 0 || typeof c =='undefined'){
  question = question.replace('valorC', c);
    
  }

 



  

  return question;
}


//Javascript//////////////////////////Javascript/////Inputs / Browser

function onLeaveAction(){
	window.onbeforeunload = function() {

   return "Do you really want to leave our brilliant application?";
   //if we return nothing here (just calling return;) then there will be no pop-up question at all
   //return;
	}
}

function justNumbers(e){
        var keynum = window.event ? window.event.keyCode : e.which;
        if ((keynum == 8) || (keynum == 46))
        return true;
         
        return /\d/.test(String.fromCharCode(keynum));
       
 }
