$(document).ready(function(){

	$('#startCustom').click(function(e){

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

     var pythagorasCheck = checkSelectedModes(selected_value, 'Pythagoras');
     var perCheck = checkSelectedModes(selected_value, 'Perimeter');
  

  // Hide all 'play' Selection page 
      $('#allPlayPage').slideUp(2000);    
      $('#allPlayPage').hide(2000);

  // Shows all 'custom' page    

      $('#title').text('Personalizada');
      $('#allCustom').slideUp(1000);
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

});



function randomizeCustomModes(context){

  var randomMode;
  console.log(context)

//Initialize the generate
  if (context == 'all') {

    randomMode = generate(3 ,false);

  }else if (context == '1') { //Pythagoras

    generatePythagoras();

  }else if (context == '2') { //Area And Perimeter

    areaAndPerimeter();

  }

}

function checkSelectedModes(arrSelected , requester){

  //The parameter of receiver is to know what variable is requesting it

   var found = false;
   var strToPerimeter = 'Areas y Perimetros';
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




function generatePythagoras(){
//Function to random get some questions

//Initialize values of the sides
// a and b are short sides
//and C is the longest side
var a = 0;
var b = 0;
var c = 0;

//Randomize the type, so it can have to A, To B, To C


 var pythagorasSideCheck = generate(4);


   if (pythagorasSideCheck == 1) { //Having a and b but need to solve C

  
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
   
      generatePythagorasQuestions(1, a, b, 0);
////////////////////////////////////////////////////////////////////
   }else if(pythagorasSideCheck == 2){//having a and c but need to solve B

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
      
      generatePythagorasQuestions(2, a, 0 , c);


   }else if(pythagorasSideCheck == 3){//having b and c but need to solve a

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

      console.log('Before Root'+beforeRoot);
      console.log('Square Root' + squareRoot);
      generatePythagorasQuestions(3, 0, b, c);

   }



 }







function generate(range ,needZero){

  var n ;


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

function generatePythagorasQuestions(context, a , b, c){

    //Context means the side to solve it
     
    $('#keyWords').text('');
    $('#MainTitleCustom').text('Teorema de Pitágoras');


    $('#keyWords').append(' <b><u> Hipotenusa:</u> </b> Lado de mayor longitud de un Triángulo Rectángulo. <br> ');
    $('#keyWords').append('<b><u> Catetos</u> </b> : Lados de menor longitud de un Triángulo Rectángulo.');

    //words to the first context

    //Context 1 =  Having a and b but need to find c
    var questionsContext1 = [

    /*0 */'Tienes un Triángulo en la que necesitas resolver el lado más largo,  los valores que sabes son los de los lados mas cortos, el valor del lado corto A es: ' + a + ' y del lado corto B es: ' + b + ' . Cuánto es que mide la hipotenusa?'
    ,

    /*1 */'Con los lados cortos A: ' + a + ' y B:' + b + ' Cuánto mide el lado más largo (C) de un Triángulo Rectángulo con estos valores dados?'
    ,

    /*2 */'Dado las medidas de los catetos de un Triángulo Rectángulo: A: ' + a + ' ,B: ' + b + ' . Cuánto mide la hipotenusa de ese Triángulo Rectángulo?' 
    ];

    //Words to the second context

    //Context 2 = Having a and c but need to find B

    var questionsContext2 = [

    /*0 */'Tienes un Triángulo Rectángulo en la que necesitas resolver un lado corto que tiene nombre de B, los valores que disponen a ti sería La Hipotenusa C: '+ c + ' y un lado corto A: ' + a + ' .Cuánto mide el lado B en este Triángulo Rectángulo?'  
    ,

    /*1 */'Teniendo en cuenta de valores de un lado corto A: ' + a + ' y el valor de la Hipotenusa (C): ' + c + ' de un Triángulo Rectángulo, Cuánto equivaldría la medida del Lado Corto B?'
    ,

    /*2 */'Dado la medida del Cateto A: ' + a + ' y la medida de la Hipotenusa (C): ' + c + ' en un Triángulo Rectángulo, Cuánto mide el Cateto B?' 
    ];

    //Words to the third context

    //Context 3 = Having b and c but need to find a

    var questionsContext3 = [

     /*0 */'Tienes un Triángulo Rectángulo en la que necesitas resolver un lado corto que tiene nombre de A, los valores que disponen a ti sería La Hipotenusa C: '+ c + ' y un lado corto B: ' + b + ' .Cuánto mide el lado A en este Triángulo Rectángulo?'  
    ,

    /*1 */'Teniendo en cuenta de valores de un lado corto B: ' + b + ' y el valor de la Hipotenusa (C): ' + c + ' de un Triángulo Rectángulo, Cuánto equivaldría la medida del Lado Corto A?'
    ,

    /*2 */'Dado la medida de la Hipotenusa (C): ' + c + ' y la medida del Cateto (B): ' + b + ' en un Triángulo Rectángulo, Cuánto mide el Cateto A?' 


    ];


    var rdn = generate(3, true);
    var questionsDescription = $('#DescriptionCustom');


    if (context == 1) {

      questionsDescription.html(questionsContext1[rdn]);

    }else if (context == 2) {

      questionsDescription.html(questionsContext2[rdn]);

    }else if (context == 3) {

      questionsDescription.html(questionsContext3[rdn]);

    }

    rdn = 0;

}

function areaAndPerimeter(){
  console.log('AR')
   var rnd = generate(2, false);
   var a,b ;

  
   // 1 = Area
   // 2 = Perimeter

   if (rnd == 1) { //AREA OF Square or Rectangle

  
      a = generate(20, false);
      b = generate(20, false);
   
      if (a == b) {
        
        generateQuestionsAreaAndPerimeter("AreaSquare", a, b);
      }else {
       

        generateQuestionsAreaAndPerimeter("AreaRectangle", a,b);
      }

   }else if  (rnd ==2){ //PERIMETER OF SQUARE OR RECTANGLE

      var i = generate(2, false);

      if (i == 1) { // Perimter of Square

        do{
          a = generate(20, false);
          b = generate(20, false);
        }while (a =! b);
        generateQuestionsAreaAndPerimeter("PerimeterSquare", a, b);
      

      } else if (i == 2 ){ //Perimeter of Rectangle
          a = generate(20, false);
          b = generate(20, false);
         

        generateQuestionsAreaAndPerimeter("PerimeterRectangle", a, b);  
      } 

   }

}

function generateQuestionsAreaAndPerimeter(context, a , b){

  $('#keyWords').text('');
  

  var questionsDescription = $('#DescriptionCustom');

  var questionContext1 = [ // For area of squares 
  'Tienes un cuadrado en la que el lado A es ' + a + ', Calcula su Área.'
  ,
  'Tienes un cuadrado en la que el lado B es ' + b + ', Calcula su Área.'
  ]

  var questionsContext2 = [ //For area of rectangles
  'En un rectángulo, el lado A es de ' + a + ' y el lado B es de' + b +' , Calcula su Área.'
  ,
  'En un rectángulo, el lado B es de ' + b + ' y el lado A es de' + a + ' , Calcula su Área.'
  ]

  var questionContext3 = [ // For perimeter of squares 
  'Tienes un cuadrado en la que el lado A es ' + a + ', Calcula su Perímetro.'
  ,
  'Tienes un cuadrado en la que el lado B es ' + b + ', Calcula su Perímetro.'
  ]

  var questionsContext4 = [ //For perimeter of rectangles
  'En un rectángulo, el lado A es de' + a + ' y el lado B es de' + b +' , Calcula su Perímetro.'
  ,
  'En un rectángulo, el lado B es de' + b + ' y el lado A es de' + a + ' , Calcula su Perímetro.'
  ]

  var rdn = generate(2,false);

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

}


//Javascript//////////////////////////Javascript/////Inputs / Browser

function onLeaveAction(){
	window.onbeforeunload = function() {

   return "Do you really want to leave our brilliant application?";
   //if we return nothing here (just calling return;) then there will be no pop-up question at all
   //return;
	}
}

function justNumbers(e)
        {
        var keynum = window.event ? window.event.keyCode : e.which;
        if ((keynum == 8) || (keynum == 46))
        return true;
         
        return /\d/.test(String.fromCharCode(keynum));
        }
