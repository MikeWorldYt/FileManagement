async function getJSON() { 
    let res = await fetch("./index.JSON");
    let directory = await res.json();
    console.log(directory);
}

getJSON()
function createListDirectory(keys) {
    const $ul = document.createElement("ul");
    $ul.append()
}

const ColumnFill = document.getElementById(Level2).innerHTML="ul";
console.log(ColumnFill);



// var iframe = document.getElementById("lvl2");
// var column = document.getElementById("column");

//iframe.onload = function() {
//    if (iframe.contentDocument.body.innerHTML === ""){
//        column.style.display = "none";
//    } 
//    else{
//        column.style.display = "block";
//    }
//};
