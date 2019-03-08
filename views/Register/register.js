<script>
$(document).ready (function () {
  rest_frm();
})
function rest_frm(){
  let form=$("#register_frm");
  form.trigger("reset");
}

function register_frm() {
  let Forms=$("#register_frm").serializeArray();
  $.ajax({
      url:"/register/user/add",
      type:"post",
      async:false,
      data:Forms,
      success:function(data)
      {

        alert (data);
      },error:function(data)
      {
          alert (data.responseText);
      }
  });
}

</script>
