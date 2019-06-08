var elementCounter = 1
$(document).ready(function() {
    console.log('ssssssssssssss')
   
  
    
    $.validator.setDefaults({
      ignore: []
    });
    //to a particular question row

    $("#addItem").click(function(){
        elementCounter++;
        var parentId = document.activeElement.parentElement.getElementsByTagName('p')[2].innerText;
        $("#firstRow").append('<div><div  class="" style="margin-bottom: 20px !important"><div class="input-field"><p style="margin-left:-26px;padding-top:9px;">'+elementCounter+'</p> <input id="email" name="question" type="text"   required><label for="email" style="left:0px;">Your Questions</label><div id="e2"></div> </div><div style="float: right !important;" class="input-field"  > <select id="select"style="display:block;"> <option value="1"  disabled selected>Choose Question type</option><option value="radio">Radio</option> <option value="Checkbox">Checkbox</option><option value="Mutiselect">Muti select</option>     </select></div>    <div class="input-field" style="width:55% !important ;margin-top: 0px" id="options"> <input class="firstOption" name="option'+parentId+'" id="ops" onkeypress="EnterEvent(event)" type="text"  required> <label for="option">Option</label></div></div>')
    });

    
    //to remove question row
    $("#removeItem").click(function(e){
    if($("#firstRow > div").length > 3 ){
        $("#firstRow > div").last().remove()
    }
    })
    //to add a option on enter
    // $("#ops").focus(function(){
        console.log("infocus")
    $("#ops").last().on('keypress',function(e){
        var parentId = document.activeElement.parentElement.parentElement.getElementsByTagName('p')[2].innerText;
        console.log(e,'eeeffff')
        if(e.which == 13) {
           $("#ops").append('<input  name="option'+parentId+'" type="text" on id="ops" required> <label for="email">Option</label>')
        }
      });
    // })
      //to get all the value from a particular form 
    
      $('#submitButton').click(function(){
        var typeOfQuestions = [];
        var questionOptions = { }
        var questionsArray = [];
        var formArray = []
        var datastring = $("form").serialize();
        var questionCount = $("#questionCount").val();
        var sessionID = $("#sessionId").val()
        $('select').each(function(e,i){
            val = e + 2;
            valu = $(this).val();
            // console.log(e,val,valu);
            typeOfQuestions.push(valu)
          
          })
          formArray = datastring.split("&")
          formArray.forEach((formItem)=>{
              if(formItem.includes('question=')){
                question = formItem.split('question=')[1]
                if(question.includes('+')){
                      question=  question.split('+').join("")                   
                }
                questionsArray.push(question)
              }
          })
          datastring.split('&').forEach((data,index)=>{
              if(index==0){
                  console.log(index,'abbbbbb')
                  var QuestionArray=[];
              }
             
             var  optionnext= ''
              if(data.includes('option')){
                  var option =data.split('=')[0].split('option')[1];
                  if(datastring.split('&')[index+1]){ 
                     if(datastring.split('&')[index+1].includes('=')){

                         optionnext=  datastring.split('&')[index+1].split('=')[0]
                     }
                     if(optionnext.includes('option')){
                       optionnext =  optionnext.split('option')[1];
                     }
                }
if(optionnext==''){

    optionnext=option;
}

if(optionnext!=option){
    console.log(optionnext,option,'condition') 
                    QuestionArray=[]
                  }else{
                      var optionVAl= data.split('=')[1];
                      console.log(data.split('='))
                      QuestionArray.push(optionVAl);
                      console.log(QuestionArray)
                    
                    }
                    
                    
                    //  questionOptions[parseInt(data)] = data.split('=')[1]   
                }
          //      questionOptions[option] =QuestionArray;


          })
        console.log(datastring,questionOptions,questionsArray,questionCount,sessionID)
        

      });
   
  });

  function EnterEvent(e){
      console.log(e)
    if(e.keyCode == 13) {
     var parentId = document.activeElement.parentElement.parentElement.getElementsByTagName('p')[0].innerText;
       console.log( document.activeElement)
        $(document.activeElement.parentElement).append('<input  name="option'+parentId+'" type="text" onkeypress="EnterEvent(event)" id="ops" required> <label for="email">Option</label>')
     }
 }