(function () {
   
   
   // function zero_first_format(value)
   // {
   //     if (value < 10)
   //     {
   //         value='0'+value;
   //     }
   //     return value;
   // }

   /* функция получения текущей даты и времени */
   // function date_time()
   // {
   //     var current_datetime = new Date();
   //     var day = zero_first_format(current_datetime.getDate());
   //     var month = zero_first_format(current_datetime.getMonth()+1);
   //     var year = current_datetime.getFullYear();
   //     var hours = zero_first_format(current_datetime.getHours());
   //     var minutes = zero_first_format(current_datetime.getMinutes());
   //     var seconds = zero_first_format(current_datetime.getSeconds());

   //     return day+"."+month+"."+year+" "+hours+":"+minutes+":"+seconds;
   // }



    window.supportDrag = function() {
       let div = document.createElement('div');
       return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
    }();
    
    let input =  document.getElementById('js-file-input');
    
   //  if(!supportDrag){
   //     document.querySelectorAll('.has-drag')[0].classList.remove('has-drag');
   // } 
    
    input.addEventListener("change", function(e){      
      //  document.getElementById('js-file-count').innerHTML = date_time();
       document.getElementById('js-file-name').innerHTML = this.files[0].name; 
      // document.getElementById('js-file-name').innerHTML = date_time();   
      //  
      //  document.querySelectorAll('.file-upload-form__input')[0].classList.remove('file-upload-form__input--active');
    }, false);
    
    
   //  if(supportDrag){   
      //  input.addEventListener("dragenter", function(e) {
      //    document.getElementById('js-file-name').innerHTML = date_time();
      //     document.querySelectorAll('.file-upload-form__input')[0].classList.add('file-upload-form__input--active');
      //  });
 
      //  input.addEventListener("dragleave", function(e) {
      //     document.querySelectorAll('.file-upload-form__input')[0].classList.remove('file-upload-form__input--active');
      //  });
   //  }


    
 })();