<script>
let btn=$("#registers");
$(document).ready (function () {
  rest_frm();
})
function rest_frm(){
  let form=$("#register_frm");
  form.trigger("reset");
}

function register_frm() {
  btn.prop("disabled",true);
  toasterOptions();
  let Forms=$("#register_frm").serializeArray();

  if(!validation()){
    toastr.error("somting is empty");
      btn.prop("disabled",false);
      return false;
  }
  if (!validateEmail($("#email").val())) {
    toastr.error("email is Wrong !");
      btn.prop("disabled",false);
      return false;
  }
  if ($("#Password_again").val()!==$("#Password").val()) {
    toastr.error("Password is not  equal !");
      btn.prop("disabled",false);
      return false
  }
  $.ajax({
      url:"/register/user/add",
      type:"post",
      async:false,
      data:Forms,
      success:function(data)
      {
        toastr.success(data);
        btn.prop("disabled",false);
      },error:function(data)
      {
          toastr.error(data.responseText);
          btn.prop("disabled",false);
      }
  });

}

function validation(){
  if (check_other("require")) {
    return false;
  }
  return true;
}

</script>
