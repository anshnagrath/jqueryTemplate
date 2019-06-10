var elementCounter = 1
var fromIcon = 'fromIcon'
$(document).ready(function() {
    $.validator.setDefaults({
      ignore: []
    });
    $("#addItem").click(function(){
      var lastQuestionInputLength = document.getElementsByClassName('content')[elementCounter-1].getElementsByTagName('input')[0].value.length;
      console.log(lastQuestionInputLength)
      //    var parentInputLength =document.
      if(lastQuestionInputLength>0){
      elementCounter++;
      $(".firstRow").append('<div class="content"><div  class="" style="margin-bottom: 20px !important"><div class="input-field"><p style="margin-left:-26px;padding-top:9px;">'+elementCounter+'</p> <input id="email" name="question" type="text" placeholder="Option"  required><div id="e2"></div> </div><div style="float: right !important;" class="input-field"  > <select id="select"style="display:block;"> <option value="1"  disabled selected>Choose Question type</option><option value="radio">Radio</option> <option value="Checkbox">Checkbox</option><option value="Mutiselect">Muti select</option>     </select></div>    <div class="input-field" style="width:55% !important ;margin-top: 0px" id="options"> <input placeholder="CoorectAnswer" name="answer'+elementCounter+'" type="text"  required> <div><input class="firstOption" name="option'+elementCounter+'" id="ops" onkeypress="EnterEvent(event)" type="text" placeholder="Option" required>    <i style="float:right;bottom:53px;left:10px;position:relative" onclick="EnterEvent('+fromIcon+')" class="material-icons addElement">add_circle</i></a> <i style="float:right;position:relative;bottom:52px;left:10px" class="material-icons removeElement"  onclick="RemoveOptions(event)">remove_circle</i></div></div></div>')
     }else{
      M.toast({html: 'Please fill the previous details and then proceed'})
     }
     });
    //to remove question row
    $("#removeItem").click(function(e){
    if( document.getElementsByClassName('content').length > 1 ){
         elementCounter--;
        document.getElementsByClassName('content')[document.getElementsByClassName('content').length - 1].remove();
    }
    })
    //to add a option on enter

    $("#ops").last().on('keypress',function(e){
      
      var parentId =  $(document.activeElement).closest('.content').find('p')[0].innerText;
         
       setTimeout(()=>{ 
         console.log( document.activeElement.value.length)
        if(e.which == 13 && document.activeElement.value.length>0 && document.getElementById('email').value.length>0) {
          console.log(document.activeElement.value,'eessszeffff') 
          $("#ops").append('<div><input  name="option'+parentId+'" type="text" on id="ops" placeholder="Option" required>    <i style="float:right;bottom:53px;left:10px;position:relative" class="material-icons addElement"  onclick="EnterEvent('+fromIcon+')">add_circle</i></a> <i style="float:right;position:relative;bottom:52px;left:10px"  onclick="RemoveOptions(event)" class="material-icons removeElement">remove_circle</i></div>')
         }
         else if(document.activeElement.value.length ==0 && e.which == 13 &&  document.getElementById('email').value && document.getElementById('email').value.length==0 ||document.getElementById('email').value &&  document.getElementById('email').value.length==0 && e.which == 13 ){
         M.toast({html: 'Please fill the previous details and then proceed'})
       }else if(document.activeElement.value.length ==0 && e.which == 13){
        M.toast({html: 'Please fill the previous details and then proceed'})
       }
    
          },100)      
        });





      //to get all the value from a particular form 
    
      $('#submitButton').click(function(){
        var typeOfQuestions = [];
        var questionOptions = { }
        var questionsArray = [];
        var formArray = []

        var optionsArray = []
        var optionKey = '1';

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
           // console.log(data,'ddddddsss')
            if(data.includes('option') ){
              if( data.includes(optionKey)){
                optionKey = data.split('=')[0].split('option')[1]
                var optionContent = data.split('=')[1]
                console.log(data,optionsArray,optionContent,optionContent.toString().includes('+'),'keyyyyyyy')
              if(optionContent.toString().includes('+')){
                optionsArray.push(optionContent.split('+').join(' '))
              }
                else{
                  optionsArray.push(optionContent)
                }

            }
            else{
             // console.log(optionKey,optionsArray,questionOptions,'keyyyyyyy')
              questionOptions[optionKey] = optionsArray
              optionKey = data.split('=')[0].split('option')[1]
              optionsArray = [];
              if(optionContent.toString().includes('+')){
                optionsArray.push(optionContent.split('+').join(' '))
              }
                else{
                  optionsArray.push(optionContent)
                }
             }

            questionOptions[optionKey] = optionsArray

          }

          })
      });

      $('.addElement').click(function(e) {
        console.log("heeee")
       var parentId = $(this).closest('.content').find('p')[0].innerText
        $(this).parent().append("<div><input class='firstOption' placeholder='Option' name='option"+parentId+"' type='text' onkeypress='EnterEvent(event)' id='ops' required>    <i style='float:right;bottom:53px;left:10px;position:relative' class='material-icons addElement' onclick = 'EnterEvent("+fromIcon+")'>add_circle</i></a> <i  style='float:right;position:relative;bottom:52px;left:10px' class='material-icons removeElement' onclick='RemoveOptions()'>remove_circle</i></div>")    
       });
     
   
  });

  function EnterEvent(e){
   // console.log(e)
     if(e.keyCode ==13) {
    var parentInputLength =document.activeElement.parentElement.parentElement.getElementsByTagName('input')[0].value.length;
    if(e.keyCode == 13 && document.activeElement.value.length>0 && parentInputLength>0) {
     var parentId =  $(document.activeElement).closest('.content').find('p')[0].innerText;
    
       console.log( document.activeElement)
        $(document.activeElement.parentElement).append('<div><input class="firstOption" placeholder="Option" name="option'+parentId+'" type="text" onkeypress="EnterEvent(event)" id="ops" required>    <i style="float:right;bottom:53px;left:10px;position:relative" onclick="EnterEvent('+fromIcon+')" class="material-icons addElement">add_circle</i></a><i style="float:right;position:relative;bottom:52px;left:10px"  onclick="RemoveOptions(event)" class="material-icons removeElement">remove_circle</i></div>')
     }else if(e.keyCode == 13 && document.activeElement.value.length==0){
      M.toast({html: 'Please fill the previous details and then proceed'})
     } 
    }else if(e=='fromIcon'){
      $('.addElement').click(function(event){
     
    var parentId = $(this).closest('.content').find('p')[0].innerText;
   $(this).parent().append("<div><input class='firstOption' placeholder='Option' name='option"+parentId+"' type='text' onkeypress='EnterEvent(event)' id='ops' required>    <i style='float:right;bottom:53px;left:10px;position:relative' class='material-icons addElement' onclick = 'EnterEvent("+fromIcon+")'>add_circle</i></a> <i style='float:right;position:relative;bottom:52px;left:10px' onclick='RemoveOptions(event)' class='material-icons removeElement'>remove_circle</i></div>")    
    event.stopImmediatePropagation();
      })
     
     
     }
 }
function RemoveOptions(){
  $('.removeElement').click(function(event){
    console.log("testttttsssttttt",$(this).parent().length)
  // if($(this).parent().parent().length>1){
   $(this).parent().remove();
    event.stopImmediatePropagation(); 
  
    // }else{
    //   M.toast({html: 'Cannot remove a mandatory option'})
    // }
  })
}