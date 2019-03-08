 <script>
$("document").ready(function () {
  createCaptcha();
  rest_frm();
})
 function createCaptcha() {

     //clear the contents of captcha div first
     document.getElementById('captcha').innerHTML = "";
     var charsArray =
         "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
     var lengthOtp = 6;
     var captcha = [];
    for (var i = 0; i < lengthOtp; i++) {
         //below code will not allow Repetition of Characters
         var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
         if (captcha.indexOf(charsArray[index]) == -1)
             captcha.push(charsArray[index]);
         else i--;
     }

     get_capcha(captcha);
     var canv = document.createElement("canvas");
     canv.id = "captcha";
     canv.width = 100;
     canv.height = 50;
     var ctx = canv.getContext("2d");
     ctx.font = "25px Georgia";
     ctx.strokeText(captcha.join(""), 0, 30);
     //storing captcha so that can validate you can save it somewhere else according to your specific requirements
     code = captcha.join("");
     document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
  }
 function get_capcha(captcha){
      $.ajax({
          url:"/singel_page/capcha",
          type:"post",
          async:false,
          data:{
              captcha:captcha
          }
      });

   }
   function submited_frm(){
     let Forms=$("#login_frm").serializeArray();
     $.ajax({
         url:"/login",
         type:"post",
         async:false,
         data:Forms,
         success:function(data)
         {

         }
     });
   }
   function rest_frm(){
     let form=$("#login_frm");
     form.trigger("reset");
   }
   </script>
