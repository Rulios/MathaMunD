var lang = 'es';

//Initialize the global scope variables
var actualTotalCorrectResult;//Only for Answers in one line.
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

//ARPSR - Area and Perimeter of square and rectangles
//& is a reserved character, so we replaced it by Y.
var questionsContext1AYPSR = []; //Area of Square
var questionsContext2AYPSR = []; //Area of Rectangles
var questionsContext3AYPSR = []; //Perimeter of Square
var questionsContext4AYPSR = []; //Perimeter of Rectangles

//FRCT - Variables for the Fractions
var actualNumeratorResult = 0; //Result for Numerator
var actualDenominatorResult = 0; //Result for Denominator
var actualMixedNumberResult = 0;


var usrInteracted; //To check if the user has interacted with the modes
var times; //To get the amount of practices
var selectedModes = []; //To get Selected Modes at buttonSet


$(document).ready(function(){
  
  fetchNames();


  $('button[name=ToSelectMode]').click(function(e){ //Works as a Checkbox
    var textMode = this.value;
    var t = $('.showText[value=' + textMode + '] #Title'); 
    var sS = $('.showText[value=' + textMode + '] #selectedSign');
    var hT = $('.showText[value=' + textMode + '] #HiddenText');

    if (selectedModes.indexOf(textMode) >= 0) {
      selectedModes.splice(selectedModes.indexOf(textMode), 1);
      sS.css('display', 'none');
      hT.css('display', 'block');
    
      
    }else{
      selectedModes.push(textMode);
      sS.css('display', 'block');
      hT.css('display', 'none');
 
    }
  });



  $('.showText').hover(function(){// mouseenter event
    var textMode = this.value;
    var cST = $('.showText[value=' + textMode + ']');
    var t = $('.showText[value=' + textMode + '] #Title'); 
    var sS = $('.showText[value=' + textMode + '] #selectedSign');
    var hT = $('.showText[value=' + textMode + '] #HiddenText');

    if (sS.css('display') == 'none') {

      hT.css('display', 'block');
      cST.css('overflow', 'hidden');
      cST.css('height', 'auto');

      if ($(window).width() >= 768) {
        cST.css('min-height', '100px');
      }else{
        cST.css('min-height', 'auto');
      }
      
      // cST.css('-webkit-transform', 'scale(1.1)');
      // cST.css('-moz-transform', 'scale(1.1)');
      // cST.css('-o-transform', 'scale(1.1)');
      // cST.css('transform', 'scale(1.1)');

      cST.css('-webkit-transition', 'transform 1s ease-in-out');
      cST.css('-moz-transition', 'transform 1s ease-in-out');
      cST.css('-ms-transition', 'transform 1s ease-in-out');

    }

    t.css('color' , '#356BC9FF');
    t.css('text-shadow', '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black');
  }, function(){ // mouseleave event
    var textMode = this.value;
    var t = $('.showText[value=' + textMode + '] #Title'); 
    var sS = $('.showText[value=' + textMode + '] #selectedSign');
    var hT = $('.showText[value=' + textMode + '] #HiddenText');

    if (sS.css('display') == 'none') {

      hT.css('display', 'none');

    }
    t.css('color', '#3E3D40');
    t.css('text-shadow' , 'initial');

  });




  // $('.showText').mouseleave(function(){
  //   var textMode = this.value;
  //   var t = $('.showText[value=' + textMode + '] #Title'); 
  //   var hT = $('.showText[value=' + textMode + '] #HiddenText');
  //   var sS = $('.showText[value=' + textMode + '] #selectedSign');

  //   if (t.css('display') == 'none') {
  //     sS.css('opacity', '1');
  //     t.css('display', 'none');
  //   }else{
  //     hT.css('display', 'none');
  //   }

  // });


  $('button[name=btnStartCustom]').click(function(e){
    
    if (selectedModes.length == 0) {
      alert('SELECCIONE UNO O MÁS MODOS!');
    }else{

      if ($('input[name="timesQuest"]').val() == '') {
        alert("Introduzca la cantidad de preguntas!");
        $('input[name="timesQuest"]').focus();
      }else{
        console.log(selectedModes);
        
        times = $('input[name="timesQuest"]').val();
        while(times <= selectedModes.length){
          times = Math.round(times * 1.5);

        }

        $('#modal').css('display', 'block');
  
      }

    }

  });

$('#btnacceptedTips').click(function(){
        $('#modal').css('display', 'none');
        timesPRep += 1;
        randomizeCustomModes();
        $('#allPlayPage').css('display', 'none');
        $('#allCustom').css('display', 'block');
});

  $('#btnAnswer').click(function(){

    var m = $('#btnAnswer').val();
    var correct = 0;


    /*0 = false
    1 = true
    2 = undefined*/

    switch(m){

      case "FRCT": //Fractions
      var usrMixedNumberInput = $('#inputMixedNumberCustom').val()
      var usrNumeratorInput = $('#inputNumeratorCustom').val();
      var usrDenominatorInput = $('#inputDenominatorCustom').val();

      console.log('Mixed Input:' + usrMixedNumberInput);

      var avMixedNumberInput = usrMixedNumberInput == undefined || usrMixedNumberInput == 0;
      var avNumeratorInput =  usrNumeratorInput == undefined || usrNumeratorInput == 0;
      var avDenominatorInput = usrDenominatorInput == undefined || usrDenominatorInput == 0;

      if (avMixedNumberInput == true && avNumeratorInput == true && avDenominatorInput == true){
          correct = 2;
      }else if(avMixedNumberInput == true && avNumeratorInput == false && avDenominatorInput == false ){
        if (usrNumeratorInput == actualNumeratorResult && usrDenominatorInput == actualDenominatorResult) {
          correct = 1;
        }else{

          correct = 0;
        }
      }else if(avMixedNumberInput == false && avNumeratorInput == false && avDenominatorInput == false){
        if (usrMixedNumberInput == actualMixedNumberResult && usrNumeratorInput == actualNumeratorResult && usrDenominatorInput == actualDenominatorResult) {
          correct = 1;
        }else{
          correct = 0;
        }
      }    
  
      
      break;


      case "SingleThreadAnswer": //All answers that doesn't need customized inputs
        var userValue = $('#inputCustom').val();

        if (userValue == actualTotalCorrectResult) {
          correct = 1;
        }else{
          correct = 0;
        }
      break;

    }

      if (correct == 1) {
      usrAnswer += 1;  
      showTags ('Right', 'Show')
      

      }else if (correct == 0 ){
        showTags('Wrong', 'Show');
         
      }else if (correct == 2){
        alert('RESPUESTA INVÁLIDA! SIEMPRE PUEDES RESPONDER ALGO!');

      }
      $("#btnAnswer").addClass('disable');
      $('#Arrow2').css('display', 'inline-block')
;
    console.log('Respuesta ' + actualNumeratorResult + '/' + actualDenominatorResult);
    console.log('Usuario ' + usrNumeratorInput + '/' + usrDenominatorInput);
  });


//To check if the user has entered some value
$('#inputCustom').bind('input',function(){

  if (typeof usrInteracted == 'undefined' || usrInteracted == false) {
    usrInteracted = true;
  }
  
});

$('#inputMixedNumberCustom').bind('input',function(){

  if (typeof usrInteracted == 'undefined' || usrInteracted == false) {
    usrInteracted = true;
  }
  
});

$('#inputNumeratorCustom').bind('input',function(){

  if (typeof usrInteracted == 'undefined' || usrInteracted == false) {
    usrInteracted = true;
  }
  
});

$('#inputDenominatorCustom').bind('input',function(){

  if (typeof usrInteracted == 'undefined' || usrInteracted == false) {
    usrInteracted = true;
  }
  
});





	$('#inputCustom').focus();

/*----------------- Repetition of the problem and randomization ---------*/
$('#Arrow2Container').click(function() {
    usrInteracted = false;
    timesPRep += 1;
   
    if (timesPRep <= times) {

      randomizeCustomModes();
      showTags('none', 'Hide');
    
     }else{
       showResults();
     }


   });

});



function randomizeCustomModes(){

  
  var y;
  var x;

  if (selectedModes.length == 1) {
    y = 0;
  }else{
    y = generate(selectedModes.length - 1, true); //-1 to prevent getting the actual length value
  }

  x = selectedModes[y];

  switch(x){

    case 'BAOP':
    $('#btnAnswer').val('SingleThreadAnswer'); //Determines the type of input
    subAnswerFieldCustomized();
    generateBasicArithmeticsOperationsQuestions();
    break;

    case 'FRCT':
    $('#btnAnswer').val('FRCT');
    subAnswerFieldCustomized();
    generateFractionsQuestions();
    break;

    case 'ARPSR':
    $('#btnAnswer').val('SingleThreadAnswer');
    subAnswerFieldCustomized();
    generateQuestionsAreaAndPerimeter();

    break;

    case 'TPYTHG':
    $('#btnAnswer').val('SingleThreadAnswer');
    subAnswerFieldCustomized();
    generatePythagorasQuestions();

    break;
  }

  
}
function subAnswerFieldCustomized(){ //This function goes anexed at the upper function

  if ($('#btnAnswer').val() == 'SingleThreadAnswer') {

    if ($('#inputCustom').css('display') == 'none') {
      if ($('#divForCustomInputs').css('display') == 'block') {
      //Remove textboxes
      removeElement('divForFractionCustom');
      }
      $('#inputCustom').css('display', 'block');
    }else{
      $('#inputCustom').val('');
    }

  }else if ($('#btnAnswer').val() == 'FRCT') {
    if ($('#divForCustomInputs').css('display') == 'block') {
      //Remove textboxes
      removeElement('divForFractionCustom');
    }else{
      $('#inputCustom').css('display', 'none');
      $('#divForCustomInputs').css('display', 'block');
    }
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
          
        }

        var questionsDescription = $('#DescriptionCustom');
        string = checkIfName(string);
        questionsDescription.text(string);   


    }

    $('#FormulaDescriptionCustom').text('Fórmula:' );
    $('#FormulaDescriptionCustom').append('<br>');
    $('#FormulaDescriptionCustom').append('$$hipotenus{a^2} = catet{o^2} + catet{o^2}$$');
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]); //MathJax rechecks the page and uploads new code.

    $('#keyWords').append('El teorema de pitágoras establece que en un triángulo rectángulo, el cuadrado del lado más largo es igual a la suma de sus dos lados más cortos al cuadrado. <br> <br> ')
    $('#keyWords').append(' <b><u> Hipotenusa:</u> </b> Lado más largo de un Triángulo Rectángulo, o sea, de un triángulo que contiene un vértice de 90°. <br> ');
    $('#keyWords').append('<b><u> Catetos</u> </b> : Lados de menor longitud de un Triángulo Rectángulo, o sea, de un triángulo que contiene un vértice de 90°.');
    


     showCurrentState();
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
      actualTotalCorrectResult = 2 * (a + b);
    
      
   }else if (context == 4){ //Perimeter of Rectangles
      a = generate(20, false);
      b = generate(20, false);
      actualTotalCorrectResult = 2 * (a + b);
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

  fetchCustomQuestions("ARPSR",function(question){

        var rdn = 0;
        var context = 0;
        var string;
        var values = [];
        var a = 0;
        var b = 0;

    perAQuestions = StrToArraySeparation(question);   
    var x = 0;
        for(i = 0; i < perAQuestions.length; i++){

          x = (questionIdentification(perAQuestions[i], "ARPSR"));

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
      $('#keyWords').append('<br>');

      $('#FormulaDescriptionCustom').append('Fórmula:');
      $('#FormulaDescriptionCustom').append('<br>');
      $('#FormulaDescriptionCustom').append('<br>');
      $('#FormulaDescriptionCustom').append('$$Are{a_{cuadrado}} = Lad{o_1}^2$$');
    }else if (context == 2){

      $('#MainTitleCustom').text('Área de un Rectángulo');

      $('#keyWords').text('Área: espacio de una superficie de una figura, o sea, la medida de la parte de adentro de una figura.');
      $('#keyWords').append('<br>');

      $('#FormulaDescriptionCustom').append('Fórmula:');
      $('#FormulaDescriptionCustom').append('<br>');
      $('#FormulaDescriptionCustom').append('<br>');
      $('#FormulaDescriptionCustom').append('$$Are{a_{recta ngulo}} = Lad{o_A}*Lad{o_B}$$');
    }else if (context == 3) {

      $('#MainTitleCustom').text('Perímetro de un Cuadrado');

      $('#keyWords').text('Perímetro: distancia alrededor de una figura.');
      $('#keyWords').append('<br>');

      $('#FormulaDescriptionCustom').append('Fórmula:');
      $('#FormulaDescriptionCustom').append('<br>');
      $('#FormulaDescriptionCustom').append('<br>');
      $('#FormulaDescriptionCustom').append('$$Peri metr{o_{cuadrado}} = Lad{o_A}*4$$');
    }else if (context == 4) {
      $('#MainTitleCustom').text('Perímetro de un Rectángulo');

      $('#FormulaDescriptionCustom').append('Fórmula:');
      $('#FormulaDescriptionCustom').append('<br>');
      $('#FormulaDescriptionCustom').append('<br>');
      $('#FormulaDescriptionCustom').append('$$Peri metr{o_{recta ngulo}} = 2*( {Lad{o_A} + Lad{o_B}})$$');
      
      $('#keyWords').append('<br>');
      $('#keyWords').append('Perímetro: distancia alrededor de una figura.');
    }   
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]); //MathJax rechecks the page and uploads new code.
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
      $('#keyWords').append('<br>');

      $('#FormulaDescriptionCustom').append('Fórmula:');
      $('#FormulaDescriptionCustom').append('<br>');
      $('#FormulaDescriptionCustom').append('<br>');
      $('#FormulaDescriptionCustom').append('$$Are{a_{cuadrado}} = Lad{o_1}^2$$');
    }else if (context == 2){

      $('#MainTitleCustom').text('Área de un Rectángulo');

      $('#keyWords').text('Área: espacio de una superficie de una figura, o sea, la medida de la parte de adentro de una figura.');
      $('#keyWords').append('<br>');

      $('#FormulaDescriptionCustom').append('Fórmula:');
      $('#FormulaDescriptionCustom').append('<br>');
      $('#FormulaDescriptionCustom').append('<br>');
      $('#FormulaDescriptionCustom').append('$$Are{a_{recta ngulo}} = Lad{o_A}*Lad{o_B}$$');
    }else if (context == 3) {

      $('#MainTitleCustom').text('Perímetro de un Cuadrado');

      $('#keyWords').text('Perímetro: distancia alrededor de una figura.');
      $('#keyWords').append('<br>');

      $('#FormulaDescriptionCustom').append('Fórmula:');
      $('#FormulaDescriptionCustom').append('<br>');
      $('#FormulaDescriptionCustom').append('<br>');
      $('#FormulaDescriptionCustom').append('$$Peri metr{o_{cuadrado}} = Lad{o_A}*4$$');
    }else if (context == 4) {
      $('#MainTitleCustom').text('Perímetro de un Rectángulo');

      $('#FormulaDescriptionCustom').append('Fórmula:');
      $('#FormulaDescriptionCustom').append('<br>');
      $('#FormulaDescriptionCustom').append('<br>');
      $('#FormulaDescriptionCustom').append('$$Peri metr{o_{recta ngulo}} = 2*( {Lad{o_A} + Lad{o_B}})$$');
      
      $('#keyWords').append('<br>');
      $('#keyWords').append('Perímetro: distancia alrededor de una figura.');
    }   
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]); //MathJax rechecks the page and uploads new code.
    var questionsDescription = $('#DescriptionCustom');
    string = checkIfName(string);
    questionsDescription.text(string);
    

}

    showCurrentState();
}

function generateBasicArithmeticsOperationsQuestions(){
  var n1;
  var n2;
  var mode;
  var tMode; //This goes for title
  var xy = generate(4,false);


  switch(xy){

    case 1: //Add
    mode = 'Add';
    tMode = 'Suma';
    break;

    case 2: //Substract
    mode = 'Substract';
    tMode = 'Resta';
    break;

    case 3: //Multiplication
    mode = 'Multiplication';
    tMode = 'Multiplicación';
    break;

    case 4: //Division
    mode = 'Division';
    tMode = 'División';
    break;
  }

  

  n1 = generate(100, true);
  n2 = generate(100, true);

  while(n1 == 0 || n1 <= 10){
    n1 = generate(100, true);
  }

  while(n2 == 0){
    n2 = generate(100, true);
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


    n1 = generate(25,true);
    n2 = generate(10,true);
    
  }else if (mode == 'Division') {


    var totalTemporaryDiv = 0 ;

    do{ //This DO is to run once time the code

      //Maybe this can be unnecessary , but I'm just randoming on lower numbers
      //by the difficulty, and randoming again if the number I get is 
      //equal to 1 or 0, because that is just too easy

      n1 = generate(50,true);
      n2 = generate(25,true);
    
      while(n1 == 0 | n1 == 1){
        n1 = generate(50, true);
      }

      while(n2 == 0 | n2 == 1){
        n2 = generate(25, true);
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
      
    }while(totalTemporaryDiv != 0);
    
  }

     var string = "";
     switch(mode){

      case 'Add':
      actualTotalCorrectResult = n1 + n2;
      string = '¿' + n1 + ' + ' + n2 + '?';

      break;

      case 'Substract':
      actualTotalCorrectResult = n1 - n2;
      string = '¿' + n1 + ' - ' + n2 + '?';

      break;

      case 'Multiplication':
      actualTotalCorrectResult = n1 * n2;
      string = '¿' + n1 + ' * ' + n2 + '?';

      break;

      case 'Division':
      actualTotalCorrectResult = n1 / n2;
      string = '¿' + n1 + ' / ' + n2 + '?';

      break;    

    }

  console.log(mode);
  console.log(string);
  var questionsDescription = $('#DescriptionCustom');
  questionsDescription.css('text-align', 'center');
  questionsDescription.text(string);

  $('#FormulaDescriptionCustom').css('display', 'none');
  $('#imgPythagoras').css('display', 'none');
  
  $('#MainTitleCustom').text(tMode);
  
}

function generateFractions(quantityOfFractions, needSameDenominators){

  var numerators = [];
  var denominators = [];

  var sameDenominator = generate(10, true);

  for(var i = 0; i < quantityOfFractions; i++){
    numerators.push(generate(10,false));

    if (needSameDenominators == true) { //If need same denominators
      denominators.push(sameDenominator);
    }else{
      denominators.push(generate(10,false));
    }
    
  }
  //return as an object
  return {numerators: numerators, denominators: denominators}; 
}   

function generateFractionsQuestions(){
  // var quantityOfFractions = 2;
  // var fractions = generateFractions(quantityOfFractions, false);

  // for(var i = 0; i < quantityOfFractions; i++){
  //   console.log(fractions.numerators[i] + '/' + fractions.denominators[i]);
  // }

  var r = generate(5, false);
  var fraction = [];
  r = 3;
  switch(r){
    case 1: //text questions of Fractions

    break;

    case 2: //Addition and Substraction of Fractions
      fraction = generateFractionsAdditionAndSubstractOfFractions();
      simpleFractionQuestionGeneration(fraction);


    break;

    case 3: //Multiplication and Division of Fractions
      fraction = generateFractionsMultiplicationAndDivisionOfFractions();
      simpleFractionQuestionGeneration(fraction);

    break;

    case 4: //Fraction Comparison

    break;

    case 5: //Fractions w/ Mixed Numbers

    break;
  }

}
function invokeAnswerFieldForFraction(wMixedNumbers){

  wMixedNumbers = false;

  var inputMixedNumber = document.createElement('INPUT');
  inputMixedNumber.setAttribute('id', 'inputMixedNumberCustom');
  inputMixedNumber.setAttribute('onkeypress', 'return justNumbers(event);');
  inputMixedNumber.setAttribute('class', 'inputFractionCustom ');
  inputMixedNumber.setAttribute('style', 'top:10px; position:relative;');

  var inputNumerator = document.createElement('INPUT');
  inputNumerator.setAttribute('id', 'inputNumeratorCustom');
  inputNumerator.setAttribute('onkeypress', 'return justNumbers(event);');
  inputNumerator.setAttribute('class', 'inputFractionCustom ');

  var inputDenominator = document.createElement('INPUT');
  inputDenominator.setAttribute('id', 'inputDenominatorCustom');
  inputDenominator.setAttribute('onkeypress', 'return justNumbers(event);'); 
  inputDenominator.setAttribute('class', 'inputFractionCustom '); 

  var divInputFraction = document.createElement('DIV');
  divInputFraction.setAttribute('class', 'divInputFractionCustom');
  divInputFraction.setAttribute('id', 'divForFractionCustom');

  // if (wMixedNumbers == true) { //To see if there it is a mixed number fraction
  //   divInputFraction.appendChild(inputMixedNumber);
  //   inputMixedNumber.setAttribute('style', 'left:-5px; top:20px; position:relative;');
  //   inputNumerator.setAttribute('style', 'bottom:10px;');
  //   inputDenominator.setAttribute('style', 'top:10px; left:35px; position:relative;');
      
  // }else{
  //   inputNumerator.setAttribute('style','left:35px;position:relative;');
  //   inputDenominator.setAttribute('style', 'position:relative;top: 50px;left:-35px; ');  
  // }

  

  if (wMixedNumbers == true) {
    $('#divForCustomInputs').append(inputMixedNumber);
  }
  divInputFraction.appendChild(inputNumerator);
  divInputFraction.appendChild(inputDenominator);

  //$('#divAnswerCustom').append(divInputFraction);
  $('#divForCustomInputs').append(divInputFraction);
 

} 

function simpleFractionQuestionGeneration(fractionProp){
  var tMode = ""; //Title
  var quantity = fractionProp.quantityOfFractions;
  console.log(fractionProp);
  var question = "$$"; //Starts with this experession
  var numerator = 0;
  var denominator = 0;

  $('#keyWords').text('Al terminar con la operación, ten en cuenta la simplificación de la fracción!');

  //To use Backlashes it is necessary to use two.
  switch(fractionProp.mode){

    case 'Addition': //Adding of Fractions
      tMode ="Adición de fracciones";
      for(var i = 0; i < quantity; i++){
        numerator = fractionProp.numerators[i];
        denominator = fractionProp.denominators[i];

        question += "{" +numerator + " \\over " + denominator +"}  ";

        if(typeof fractionProp.numerators[i + 1] == 'undefined'){
          question += "$$";
        }else{
          question += "+";
        }
        
      }

    break;

    case 'Substraction':
      tMode = "Resta de fracciones";
      for(var i = 0; i < quantity; i++){
        numerator = fractionProp.numerators[i];
        denominator = fractionProp.denominators[i];

        question += "{" +numerator + " \\over " + denominator +"}  ";

        if(typeof fractionProp.numerators[i + 1] == 'undefined'){
          question += "$$";
        }else{
          question += "-";
        }
        
      }

    break;

    case 'Multiplication':
      tMode = "Multiplicación de fracciones";
      for(var i = 0; i < quantity; i++){
        numerator = fractionProp.numerators[i];
        denominator = fractionProp.denominators[i];

        question += "{" +numerator + " \\over " + denominator +"}  ";

        if(typeof fractionProp.numerators[i + 1] == 'undefined'){
          question += "$$";
        }else{
          question += "*";
        }
        
      }
    break;

    case 'Division':
      tMode = "División de fracciones"
      for(var i = 0; i < quantity; i++){
        numerator = fractionProp.numerators[i];
        denominator = fractionProp.denominators[i];

        question += "{" +numerator + " \\over " + denominator +"}  ";

        if(typeof fractionProp.numerators[i + 1] == 'undefined'){
          question += "$$";
        }else{
          question += "/";
        }
        
      }

    break;

  }

  invokeAnswerFieldForFraction(false);
  var questionsDescription = $('#DescriptionCustom');
  $('#FormulaDescriptionCustom').text('');
  questionsDescription.text(question);
  $('#MainTitleCustom').text(tMode);
  questionsDescription.html()
  alert(questionsDescription.text());
  MathJax.Hub.Queue(["Typeset",MathJax.Hub]); //MathJax rechecks the page and uploads new code.

}
function generateFractionsFetchQuestions(){
  fetchCustomQuestions('FRCT',function(){

  });
}
function generateFractionsAdditionAndSubstractOfFractions(){
  var quantityOfFractions = 2; //This can change
  var AorD = generate(2, false);//Decide whether Addition or Substraction
  var r = generate(2, false); //To decide same Denominators
  var fractionsObj;


  
  switch(r){
    case 1: //Different Denominators
    fractionsObj = generateFractions(quantityOfFractions, false);

      switch(AorD){

        case 1: //Addition

        var temporaryNumerator = 0;
        var temporaryDenominator = 0;

        //Solve Numerators and Denominators 
        
        for(var i = 0; i < quantityOfFractions; i++){
          
          if (typeof fractionsObj.numerators[i + 1] != 'undefined') { 
            //check if there is a next fraction

            //Butterfly Method for solving the fraction
            if (temporaryNumerator == 0){ //Means that it's the first calculation
              temporaryNumerator += (fractionsObj.numerators[i] * fractionsObj.denominators[i + 1] ) + (fractionsObj.denominators[i] * fractionsObj.numerators[i + 1]);
              temporaryDenominator = fractionsObj.denominators[i] * fractionsObj.denominators[i + 1];
            }else{ //Means that it's nt the first calculation
              temporaryNumerator = (temporaryNumerator * fractionsObj.denominators[i + 1] ) + (temporaryDenominator * fractionsObj.numerators[i + 1]);
              temporaryDenominator = temporaryDenominator * fractionsObj.denominators[i + 1];
            }
          }
        }
        actualNumeratorResult = temporaryNumerator;
        actualDenominatorResult = temporaryDenominator;
        fractionsObj.mode = 'Addition';
        break;

        case 2: //Substraction

        //Sort Descending Biggest to Smallest
        var preValues = [];
        var copyFractionsObj = {numerators : [] ,denominators : []};
          //Sort from biggest to smaller (Descending)
          for(var i = 0; i < quantityOfFractions; i++){
            var u = 0;
            u = fractionsObj.numerators[i] / fractionsObj.denominators[i];
            preValues.push(u);
          }

       preValues.sort(function(a,b){ return b -a});

          while(preValues.length > 0 ){
            for(var i = 0; i < quantityOfFractions; i++){
              var p = 0;
              p = fractionsObj.numerators[i] / fractionsObj.denominators[i];          

                  if (p == preValues[0]) { //MOst Highest Number, if Found
                    copyFractionsObj.numerators.push(fractionsObj.numerators[i]);
                    copyFractionsObj.denominators.push(fractionsObj.denominators[i]);
                    preValues.splice(0,1);
                    //console.log(preValues);
                    //console.log(copyFractionsObj);
                  }
                }
              }
        fractionsObj = copyFractionsObj;     
        var temporaryNumerator = 0;
        var temporaryDenominator = 0;

        //Solve Numerators and Denominators 
        console.log(fractionsObj);
          for(var i = 0; i < quantityOfFractions; i++){
            
            if (typeof fractionsObj.numerators[i + 1] != 'undefined') { 
              //check if there is a next fraction

              //Butterfly Method for solving the fraction
              if (temporaryNumerator == 0){ //Means that it's the first calculation
                temporaryNumerator += (fractionsObj.numerators[i] * fractionsObj.denominators[i + 1] ) - (fractionsObj.denominators[i] * fractionsObj.numerators[i + 1]);
                temporaryDenominator = fractionsObj.denominators[i] * fractionsObj.denominators[i + 1];
              }else{ //Means that it's nt the first calculation
                temporaryNumerator = (temporaryNumerator * fractionsObj.denominators[i + 1] ) - (temporaryDenominator * fractionsObj.numerators[i + 1]);
                temporaryDenominator = temporaryDenominator * fractionsObj.denominators[i + 1];
              }
            }
          }
          actualNumeratorResult = temporaryNumerator;
          actualDenominatorResult = temporaryDenominator;
          console.log(actualNumeratorResult +'/'+ actualDenominatorResult);
          fractionsObj.mode = 'Substraction';
        break;
      }
    break;

    case 2: //Same Denominators
    fractionsObj = generateFractions(quantityOfFractions, true);

      switch(AorD){

      case 1: //Addition

      //Solve Numerator
      
        for(var i  = 0; i < quantityOfFractions; i++){
          actualNumeratorResult += fractionsObj.numerators[i];
        }

      //Solve Denominator
        actualDenominatorResult = fractionsObj.denominators[0]; 
        console.log(actualNumeratorResult + '/' + actualDenominatorResult);
        fractionsObj.mode = 'Addition'; 
      break;

      case 2: //Substraction

      var preValues = [];
      var copyFractionsObj = {numerators : [] ,denominators : []};
      //Sort from biggest to smaller (Descending)
        for(var i = 0; i < quantityOfFractions; i++){
          var u = 0;
          u = fractionsObj.numerators[i] / fractionsObj.denominators[i];
          preValues.push(u);
        }
        
        preValues.sort(function(a,b){ return b -a});
        
          while(preValues.length > 0 ){
            for(var i = 0; i < quantityOfFractions; i++){
            var p = 0;
            p = fractionsObj.numerators[i] / fractionsObj.denominators[i];          

              if (p == preValues[0]) { //MOst Highest Number, if Found
                copyFractionsObj.numerators.push(fractionsObj.numerators[i]);
                copyFractionsObj.denominators.push(fractionsObj.denominators[i]);
                preValues.splice(0,1);
                //console.log(preValues);
                //console.log(copyFractionsObj);
              }
            }
          }
       //Solve Enumerator
       
       actualNumeratorResult = copyFractionsObj.numerators[0];
        for(var i = 1; i < quantityOfFractions; i++){
          actualNumeratorResult -= copyFractionsObj.numerators[i];
          console.log(actualNumeratorResult);
        }

       //Solve Denominator
       actualDenominatorResult = copyFractionsObj.denominators[0];
       fractionsObj = copyFractionsObj;
       fractionsObj.mode = 'Substraction';
      break;
      }
    break;
  } 

  //Answer always in simplified
  var fractionsSimplified = simplifyFractions(actualNumeratorResult, actualDenominatorResult);
  actualNumeratorResult = fractionsSimplified.numerator;
  actualDenominatorResult = fractionsSimplified.denominator;
  fractionsObj.quantityOfFractions = quantityOfFractions;
  return fractionsObj;
}


function generateFractionsMultiplicationAndDivisionOfFractions(){
  var quantityOfFractions = 2;
  var MorD = generate(2, false);//Decide whether Multiply or Divide
  var fractionsObj;

  switch(MorD){
    case 1: //Multiply

      fractionsObj = generateFractions(quantityOfFractions, false);

      
      actualNumeratorResult = fractionsObj.numerators[0];
      actualDenominatorResult = fractionsObj.denominators[0];
      for(var i = 0; i < quantityOfFractions; i++){
        
        if ( typeof fractionsObj.numerators[i + 1 ] != "undefined") {
        actualNumeratorResult = actualNumeratorResult * fractionsObj.numerators[i + 1];
        actualDenominatorResult = actualDenominatorResult * fractionsObj.denominators[i + 1];
        }

      }
      fractionsObj.mode = 'Multiplication';   
    break;

/////////////////////////

    case 2: //Divide

    fractionsObj = generateFractions(quantityOfFractions, false);


      actualNumeratorResult = fractionsObj.numerators[0];
      actualDenominatorResult = fractionsObj.denominators[0];
      for(var i = 0; i < quantityOfFractions; i++){
        
        if ( typeof fractionsObj.numerators[i + 1 ] != "undefined") {
        actualNumeratorResult = actualNumeratorResult * fractionsObj.denominators[i + 1];
        actualDenominatorResult = actualDenominatorResult * fractionsObj.numerators[i + 1];
        }
      }
     fractionsObj.mode = 'Division'; 
    break;  
  }


  //Answer always in simplified
  console.log(fractionsObj);
  var fractionsSimplified = simplifyFractions(actualNumeratorResult, actualDenominatorResult);
  actualNumeratorResult = fractionsSimplified.numerator;
  actualDenominatorResult = fractionsSimplified.denominator;
  console.log(actualNumeratorResult + " " + actualDenominatorResult);
  fractionsObj.quantityOfFractions = quantityOfFractions;
  return fractionsObj;

}
function generateFractionComparison(){
 //Still working out to implement it on the answer basis
}
function generateFractionsWithMixedNumbers(){
 //Still working out to implement it on the answer basis
}
function simplifyFractions(numerator, denominator){ //Used to simplify fractions

    var gcd = function gcd(a,b){
      return b ? gcd(b, a%b) : a;
    };
    gcd = gcd(numerator,denominator);
    return {numerator:numerator/gcd, denominator:denominator/gcd};

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
      
      $('#btnAnswer').removeClass('disable');
      $('#Arrow2').css('display', 'none');

  }
}

function showResults(){
  
  var f;
  $('#FormulaDescriptionCustom').text('');
  if (usrAnswer <= Math.round(times / 3)) {
    $('#DescriptionCustom').css('color', 'red');
  }else if (usrAnswer <= Math.round(times * 2 / 3)){
    $('#DescriptionCustom').css('color', 'yellow');
    $('#DescriptionCustom').css('text-shadow', '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black');
  }else if (usrAnswer <= Math.round(times)) {
    $('#DescriptionCustom').css('color', 'green');
  }

  
  // if (usrAnswer <= 4) {
  //   $('#DescriptionCustom').css('color', 'red');
    

  // } else if (usrAnswer >= 5 || usrAnswer <= 7) {
  //   $('#DescriptionCustom').css('color', 'yellow');
    

  // }else if (usrAnswer >= 8) {
  //   $('#DescriptionCustom').css('color', 'green');
    
  // }
  
  
  $('#DescriptionCustom').css('text-align', 'center');
  $('#DescriptionCustom').text('Has respondido ' + usrAnswer + ' de ' + times + '!');
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

    name = maleNames[generate(maleNames.length -1, true)];

  }else if (genre == "F"){

    name = femaleNames[generate(femaleNames.length -1, true)];

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
      
      for(var x = 0; x < selectedNames.length; x++){
        while (name == selectedNames[x]) {
          name = randomizeName('F');
        }
      }
      
      selectedNames.push(name);
      do{
        string = string.replace('nombreF' + i, name);
      }while(string.search('nombreF' + i) >= 0)
    }



    if (foundM >= 0) {
      var name = randomizeName('M');
      
      for(var x = 0; x < selectedNames.length; x++){ //check if has the same coincidence
        while (name == selectedNames[x]) {
          name = randomizeName('M');
        }
      }
      
      selectedNames.push(name);
      do{
      string = string.replace('nombreM' + i, name);
      }while(string.search('nombreM' + i) >= 0)

    }
}

}

return string;

}
function showCurrentState(){

  $('#NProblem').text('#' + timesPRep + '/' + times );

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


  }else if (mode == "ARPSR"){ //Area and perimeter of squares and rectangles
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
function removeElement(id){
    var element = document.getElementById(id);
    element.parentNode.removeChild(element);
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
