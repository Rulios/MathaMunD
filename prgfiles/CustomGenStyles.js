var lang = 'es';

//Initialize the global scope variables
var actualTotalCorrectResult;
var pythagorasCheck;
var perCheck;
var timesPRep = 0; //Times in which users clicks #Arrow2
var usrAnswer = 0; //Times the user answered correctly


var UserStatePYTHG = false; //Variable to detech if user has first entered
var UserStateAYPSR = false;

//All names that are fetched from DB are sorted in these two arrays.
var femaleNames = [];
var maleNames = [];


//These variables can be added more if need more context

//TPYTHG - Pythagora's Theorem
var questionsContext1TPYTHG = [];
var questionsContext2TPYTHG = [];
var questionsContext3TPYTHG = [];  

//A&PSR - Area and Perimeter of square and rectangles
//& is a reserved character, so we replaced it by Y.
var questionsContext1AYPSR = []; //Area of Square
var questionsContext2AYPSR = []; //Area of Rectangles
var questionsContext3AYPSR = []; //Perimeter of Square
var questionsContext4AYPSR = []; //Perimeter of Rectangles



$(document).ready(function(){
 
  fetchNames();

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

      $('#windowTitle').text('Personalizada');
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
    context = generate(2 ,false);
 
    if (context == '1') {
      generatePythagorasQuestions();
    }else if (context == '2') {
      //areaAndPerimeter();
      generateQuestionsAreaAndPerimeter();
    }

    }else if (context == '1') { //Pythagoras

      generatePythagorasQuestions();

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

      a = generate(20);
      b = generate(20);

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

          a = generate(20);
          c = generate(20);

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

          b = generate(20);
          c = generate(20);

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
  //range += 1; //add 1, Don't know why, but it fix some accuracy problems

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

    var pythagorasQuestions = [];

    $('#keyWords').text('');
    $('#MainTitleCustom').text('Teorema de Pitágoras');

    if (UserStatePYTHG == false) { //Means that first loaded state

      UserStatePYTHG = true;

       //Callback - Fetch Questions
       fetchCustomQuestions("TPYTHG",function(questions){

        

        var rdn = 0;
        var context = 0;
        var string;
        var values = [];
        var a = 0;
        var b = 0;
        var c = 0;

        pythagorasQuestions = StrToArraySeparation(questions);
        
        var x = 0;
        for(i = 0; i < pythagorasQuestions.length; i++){

          x = (questionIdentification(pythagorasQuestions[i], "TPYTHG"));

          switch(x){

            case 1:

            questionsContext1TPYTHG.push(pythagorasQuestions[i]);

            break;

            case 2:
            questionsContext2TPYTHG.push(pythagorasQuestions[i]);

            break;

            case 3:
            questionsContext3TPYTHG.push(pythagorasQuestions[i]);

            break;    
          }
        }

        ///
        context = generate(3,false); //Get the context
        switch(context){

          //Context means the side to solve it
          //We use generate() with noNeedOfZero
          //But when sending to stringReplaceValue we put rdn-1
          //To substract from the rdn, to prevent matching rdn with the Array of the Question
          //To prevent undefined, and because JS array asignations begins in 0.
          case 1: 

          rdn = generate(questionsContext1TPYTHG.length, false);
          values = generatePythagoras(context);
          a = values[0];
          b = values[1];
          c = values[2];
          string = stringReplaceValue([a,b,c],questionsContext1TPYTHG[(rdn - 1)]);

          break;

          case 2:

          rdn = generate(questionsContext2TPYTHG.length, false);
          values = generatePythagoras(context);
          a = values[0];
          b = values[1];
          c = values[2];
          string = stringReplaceValue([a,b,c],questionsContext2TPYTHG[(rdn - 1)]);

          break;

          case 3:

          rdn = generate(questionsContext3TPYTHG.length, false);
          values = generatePythagoras(context);
          a = values[0];
          b = values[1];
          c = values[2];
          string = stringReplaceValue([a,b,c],questionsContext3TPYTHG[(rdn - 1)]);

          break;
          
        }

        var questionsDescription = $('#DescriptionCustom');
        string = checkIfName(string);
        questionsDescription.text(string);   
      });


    }else{

        context = generate(3,false); //Get the context

        switch(context){

          //Context means the side to solve it
          //We use generate() with noNeedOfZero
          //But when sending to stringReplaceValue we put rdn-1
          //To substract from the rdn, to prevent matching rdn with the Array of the Question
          //To prevent undefined, and because JS array asignations begins in 0.
          case 1: 

          rdn = generate(questionsContext1TPYTHG.length, false);
          values = generatePythagoras(context);
          a = values[0];
          b = values[1];
          c = values[2];
          string = stringReplaceValue([a,b,c],questionsContext1TPYTHG[(rdn - 1)]);

          break;

          case 2:

          rdn = generate(questionsContext2TPYTHG.length, false);
          values = generatePythagoras(context);
          a = values[0];
          b = values[1];
          c = values[2];
          string = stringReplaceValue([a,b,c],questionsContext2TPYTHG[(rdn - 1)]);

          break;

          case 3:

          rdn = generate(questionsContext3TPYTHG.length, false);
          values = generatePythagoras(context);
          a = values[0];
          b = values[1];
          c = values[2];
          string = stringReplaceValue([a,b,c],questionsContext3TPYTHG[(rdn - 1)]);

          break;
          alert(values);
        }

        var questionsDescription = $('#DescriptionCustom');
        string = checkIfName(string);
        questionsDescription.text(string);   


    }

    $('#keyWords').append('El teorema de pitágoras establece que en un triángulo rectángulo, el cuadrado del lado más largo es igual a la suma de sus dos lados más cortos al cuadrado. <br> <br> ')
    $('#keyWords').append(' <b><u> Hipotenusa:</u> </b> Lado más largo de un Triángulo Rectángulo, o sea, de un triángulo que contiene un vértice de 90°. <br> ');
    $('#keyWords').append('<b><u> Catetos</u> </b> : Lados de menor longitud de un Triángulo Rectángulo, o sea, de un triángulo que contiene un vértice de 90°.');
    


     $('#NProblem').text('#' + timesPRep);
     string = "";

    

}

function generateAYPSR(context){
   console.log('AR');
   var a,b;

   if (context == 1) { //AREA OF Square

  
      a = generate(20,false);
      b = a;
      actualTotalCorrectResult = a * b;

   }else if  (context == 2){ //AREA of Rectangle

      a = generate(20,false);
      b = generate(20,false);
      actualTotalCorrectResult = a * b;  

   }else if (context == 3){ //Perimeter of Squares

    
      a = generate(20,false);
      b = a;
      actualTotalCorrectResult = a + b;
    
      
   }else if (context == 4){ //Perimeter of Rectangles
      a = generate(20, false);
      b = generate(20, false);
      actualTotalCorrectResult = a + b;
   }

    return [a,b];

}

function generateQuestionsAreaAndPerimeter(){
  var perAQuestions = [];
  
  

  $('#FormulaDescriptionCustom').text('');
  $('#keyWords').text('');
  $('#imgPythagoras').css('display' , 'none');

if (UserStateAYPSR == false) {
  UserStateAYPSR = true;

  fetchCustomQuestions("A&PSR",function(question){

        var rdn = 0;
        var context = 0;
        var string;
        var values = [];
        var a = 0;
        var b = 0;

    perAQuestions = StrToArraySeparation(question);   
    var x = 0;
        for(i = 0; i < perAQuestions.length; i++){

          x = (questionIdentification(perAQuestions[i], "A&PSR"));

          switch(x){

            case 1:

            questionsContext1AYPSR.push(perAQuestions[i]);

            break;

            case 2:
            questionsContext2AYPSR.push(perAQuestions[i]);

            break;

            case 3:
            questionsContext3AYPSR.push(perAQuestions[i]);

            break;
            
            case 4:
            questionsContext4AYPSR.push(perAQuestions[i]);
          } 
        }


        context = generate(4,false); //Get the context

        
        switch(context){

          //Context means the side to solve it
          //We use generate() with noNeedOfZero
          //But when sending to stringReplaceValue we put rdn-1
          //To substract from the rdn, to prevent matching rdn with the Array of the Question
          //To prevent undefined, and because JS array asignations begins in 0.
          case 1: 

          rdn = generate(questionsContext1AYPSR.length, false);
          values = generateAYPSR(context);
          a = values[0];
          b = values[1];
          
          string = stringReplaceValue([a,b],questionsContext1AYPSR[(rdn - 1)]);

          break;

          case 2:

          rdn = generate(questionsContext2AYPSR.length, false);
          values = generateAYPSR(context);
          a = values[0];
          b = values[1];
          string = stringReplaceValue([a,b],questionsContext2AYPSR[(rdn - 1)]);

          break;

          case 3:

          rdn = generate(questionsContext3AYPSR.length, false);
          values = generateAYPSR(context);
          a = values[0];
          b = values[1];
          
          string = stringReplaceValue([a,b],questionsContext3AYPSR[(rdn - 1)]);

          break;

          case 4:

          rdn = generate(questionsContext4AYPSR.length, false);
          values = generateAYPSR(context);
          a = values[0];
          b = values[1];
          
          string = stringReplaceValue([a,b],questionsContext4AYPSR[(rdn - 1)]);

          break;
          
        }
       
     if (context == 1) {
      $('#MainTitleCustom').text('Área de un Cuadrado');
      $('#keyWords').text('Área: espacio de una superficie de una figura, o sea, la medida de la parte de adentro de una figura.');
    }else if (context == 2){
      $('#MainTitleCustom').text('Área de un Rectángulo');
      $('#keyWords').text('Área: espacio de una superficie de una figura, o sea, la medida de la parte de adentro de una figura.');
    }else if (context == 3) {
      $('#MainTitleCustom').text('Perímetro de un Cuadrado');
      $('#keyWords').text('Perímetro: distancia alrededor de una figura.');
    }else if (context == 4) {
      $('#MainTitleCustom').text('Perímetro de un Rectángulo');
      $('#keyWords').text('Perímetro: distancia alrededor de una figura.');
    }   

    var questionsDescription = $('#DescriptionCustom');
    string = checkIfName(string);
    questionsDescription.text(string);
    
  });



}else{

   context = generate(4,false); //Get the context

        
        switch(context){

          //Context means the side to solve it
          //We use generate() with noNeedOfZero
          //But when sending to stringReplaceValue we put rdn-1
          //To substract from the rdn, to prevent matching rdn with the Array of the Question
          //To prevent undefined, and because JS array asignations begins in 0.
          case 1: 

          rdn = generate(questionsContext1AYPSR.length, false);
          values = generateAYPSR(context);
          a = values[0];
          b = values[1];
          
          string = stringReplaceValue([a,b],questionsContext1AYPSR[(rdn - 1)]);

          break;

          case 2:

          rdn = generate(questionsContext2AYPSR.length, false);
          values = generateAYPSR(context);
          a = values[0];
          b = values[1];
          string = stringReplaceValue([a,b],questionsContext2AYPSR[(rdn - 1)]);

          break;

          case 3:

          rdn = generate(questionsContext3AYPSR.length, false);
          values = generateAYPSR(context);
          a = values[0];
          b = values[1];
          
          string = stringReplaceValue([a,b],questionsContext3AYPSR[(rdn - 1)]);

          break;

          case 4:

          rdn = generate(questionsContext4AYPSR.length, false);
          values = generateAYPSR(context);
          a = values[0];
          b = values[1];
          
          string = stringReplaceValue([a,b],questionsContext4AYPSR[(rdn - 1)]);

          break;
          
        }
       
     if (context == 1) {
      $('#MainTitleCustom').text('Área de un Cuadrado');
       $('#keyWords').text('Área: espacio de una superficie de una figura, o sea, la medida de la parte de adentro de una figura.');
    }else if (context == 2){
      $('#MainTitleCustom').text('Área de un Rectángulo');
       $('#keyWords').text('Área: espacio de una superficie de una figura, o sea, la medida de la parte de adentro de una figura.');
    }else if (context == 3) {
      $('#MainTitleCustom').text('Perímetro de un Cuadrado');
      $('#keyWords').text('Perímetro: distancia alrededor de una figura.');
    }else if (context == 4) {
      $('#MainTitleCustom').text('Perímetro de un Rectángulo');
      $('#keyWords').text('Perímetro: distancia alrededor de una figura.');
    }   

    var questionsDescription = $('#DescriptionCustom');
    string = checkIfName(string);
    questionsDescription.text(string);

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
  
  
  $('#DescriptionCustom').css('text-align', 'center');
  $('#DescriptionCustom').text('Has respondido ' + usrAnswer + ' de 10!');
  $('#DescriptionCustom').append("<br>");
  $('#DescriptionCustom').append("No importa el resultado, lo importante es que hayas aprendido!");
  $('#keyWords').css('font-size', '40px');
  $('#keyWords').text("LOS CAMPEONES SIGUEN JUGANDO HASTA QUE LO HACEN BIEN - Billie Jean King");
  $('#ResultAndGo').css('display','none');
  $('#divAnswerCustom').css('display', 'none');
  $('#MainTitleCustom').css('display', 'none');
  $('#imgPythagoras').css('display', 'none');

}
//Javascript///////////////////////////fetch with AJAX
function fetchNames(){

    $.ajax({
      url: 'prgfiles/fetchNames.php',
      type: 'GET',
      data: {lang: lang},
      datatype:'json',

      success: function(data){
        
        data = JSON.parse(data); //JSON string to JS object
        console.log(data);


        for(var i = 0; i < data.length; i++){
          
          if(data[i].genre == "female"){
            femaleNames.push(data[i].name);
          }else if (data[i].genre == "male") {
            maleNames.push(data[i].name);
          }

        }      
        
      }
    });
}

function randomizeName(genre){

  var name = "";

  if (genre == "M") {

    name = maleNames[generate(maleNames.length, true)];

  }else if (genre == "F"){

    name = femaleNames[generate(femaleNames.length, true)];

  }

  
  return name;

}

function checkIfName(string){
 //to check if the question has a name and need to replace it
 //Available to 10 names. (Means that nombreF or nombreM will go until ...
 // nombreF10 or nombreM10)
 var selectedNames = [];
 var foundF = string.search('nombreF1');
 var foundM = string.search('nombreM1');

 if ((foundF >= 0) || (foundM >= 0)) {

  for (var i = 0; i < 10; i++){

    foundF = string.search('nombreF' + i);
    foundM = string.search('nombreM' + i);

    if (foundF >= 0) {

      var name = randomizeName('F');
      alert('Femenino');
      for(var x = 0; x < selectedNames.length; x++){
        while (name == selectedNames[x]) {
          name = randomizeName('F');
        }
      }
      alert(name);
      selectedNames.push(name);
      do{
        string = string.replace('nombreF' + i, name);
      }while(string.search('nombreF' + i) >= 0)
    }



    if (foundM >= 0) {
      var name = randomizeName('M');
      alert("Masculino");
      for(var x = 0; x < selectedNames.length; x++){ //check if has the same coincidence
        while (name == selectedNames[x]) {
          name = randomizeName('M');
        }
      }
      alert(name);
      selectedNames.push(name);
      do{
      string = string.replace('nombreM' + i, name);
      }while(string.search('nombreM' + i) >= 0)

    }
}

}

return string;

}

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
    var y = question.includes("Perímetro") || question.includes("perímetro");
    
    aFound = question.search("valorA");
    bFound = question.search("valorB");

    if (x == true) { // ARea
      
      if ((aFound >= 0) && (bFound >= 0)) {
        context = 2; //Area of Rectangles
      }else if ((aFound >= 0) || (bFound = 0)){
        context = 1; // Area of Squares
      }
     
    }


    if (y == true){ // Perimeter
      
      if ((aFound >= 0) && (bFound >= 0)) {
        context = 4; //Area of Rectangles
      }else if ((aFound >= 0) || (bFound = 0)){
        context = 3; // Area of Squares
      }

    }

  }

  

  return context;

}

function stringReplaceValue(arr,question){

  
  var a = arr[0];
  var b = arr[1];
  var c = arr[2];

  if (a != 0 || typeof a =='undefined'){
   
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
