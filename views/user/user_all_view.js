<script>
let myModal=$("#myModal");
let title_delete=$("#title_delete");
let id_delete='0';
let delb=$("#delb");

let edit=$("#edit");
let title_edit=$("#title_edit");
let id_edit='0';
let editb=$("#editb");
function ready_delete (id,name)
{
  id_delete=id;
  title_delete.html('Delete '+name);

}
function deleted ()
{
  delb.prop("disabled",true);
  $.ajax({
      url:"/user/delete/id",
      type:"post",
      async:false,
      data:{
        id:id_delete
      },
      success:function(data)
      {
        delb.prop("disabled",false);
        toastr.success(data);
        location.reload();
      },error:function (data)
      {
        toastr.error(data.responseText);
        delb.prop("disabled",false);
      }
  });
}
function reset_frm() {
  $("#frm_edit").trigger("reset");
}
function ready_edit (id,name)
{
  reset_frm();
  title_edit.html("Edit "+name+" Info");
  $.ajax({
      url:"/user/get/id",
      type:"post",
      async:false,
      data:{
        id:id
      },
      success:function(data)
      {
        debugger;
        id_edit=data._id;
        $("#name").val(data.name);
        $("#email").val(data.email);
        $("#Password").val(data.password);
      },error:function (data)
      {
        toastr.error(data.responseText);
        delb.prop("disabled",false);
      }
  });
}

function edited ()
{
  let form_data=$("#frm_edit").serializeArray();
  form_data.push({name:"id",value:id_edit});

  if (!validateEmail($("#email").val())) {
    toastr.error("email is Wrong !");
      btn.prop("disabled",false);
      return false;
  }

  editb.prop("disabled",true);
  $.ajax({
      url:"/user/edit/id",
      type:"post",
      async:false,
      data:form_data,
      success:function(data)
      {
        editb.prop("disabled",false);
        toastr.success(data);
        location.reload();
      },error:function (data)
      {
        toastr.error(data.responseText);
        editb.prop("disabled",false);
      }
  });
}
</script>
