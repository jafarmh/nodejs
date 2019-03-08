<script>
    function check_other(name){

        var dd=$("."+name);
        if (dd.length===0)
            return false;
        for(i=0;i<dd.length;i++){
            if(dd[i].value==='')
            {

                dd[i].style.boxShadow = "red 0 0 1rem";
                return true;
            }else
            {

                dd[i].style.boxShadow = "";
            }

        }

        return false;

    }
    function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
</script>
