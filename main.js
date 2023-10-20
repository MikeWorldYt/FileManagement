<script>
var iframe = document.getElementById("lvl2");
var column = document.getElementById("column");

iframe.onload = function() {
    if (iframe.contentDocument.body.innerHTML === ""){
        column.style.display = "none";
    } 
    else{
        column.style.display = "block";
    }
};
</script>




