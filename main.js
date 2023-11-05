async function getJSON() { 
  let res = await fetch("https://mikeworldyt.github.io/FileManagement/structure.json");
  let directory = await res.json();
  return directory;
}

const $ulList = document.querySelector("#list");
const $level2 = document.querySelector("#Level2");
const $columns = document.querySelectorAll(".column");

function setColumnTransparent() {
  $columns.forEach((column)=>{
    if(column.children.length === 0){
      column.classList.add("hidden");
    }
    if(column.children.length !=0){
      column.classList.remove("hidden");
      column.classList.add("win-scale");
    }
  })
}
setColumnTransparent();

$ulList.addEventListener("pointerdown", async (e) => {
    if (e.target.matches("[data-directory]")) { // Si el elemento tiene un data-directory
    const element = e.target; // Aquí obtendremos el nombre del level
    // Array.from($ulList.children).forEach(el=> el.classList.remove("focus"));
    // element.classList.add("focus");
    const name = element.textContent;
    const directory = await getJSON(); // Obtenemos todo el level JSON
    const keys = Object.keys(directory[element.dataset.directory] || []);
      if (keys.length === 0) {
        contentHTML = createError(name);
      }
      else {
        contentHTML = createListDirectory(keys, name);
      }
      if ( // Si no hay ningún elemento hijo o si el data-directory no coincide
      !$level2.firstElementChild ||
      $level2.firstElementChild.dataset.directory !== element.dataset.directory) {
        $level2.insertAdjacentElement("afterbegin", contentHTML); // PARAMETROS:donde introducir el HTML, contentHTML
        $level2.firstElementChild.dataset.directory = element.dataset.directory;
      }
    setColumnTransparent()
  }
});


// Crear el directorio
    const $ul = document.createElement("ul");
    const $h2 = document.createElement("h2");
    const $button2 = document.createElement("button");
$button2.textContent = `📁 98.Review`

function createListDirectory(keys, name) {
    $ul.innerHTML = `` 
    $h2.textContent = name;
    $ul.dataset.directory = ""; // Esto es para crear un data attribute.
    $ul.append( // el nodo se convierte en hijo de ul
    $h2,
        ...keys.map((e, index) => {
        const $li = document.createElement("li");
        const $button = document.createElement("button");
        $button.textContent = `📁 ${e}`;
        $li.append($button)
        $li.dataset.directory = e;
        return $li;
    }),
    $button2);
    return $ul;
}

// Comprobar si el directorio esta vacio
function createError(name) {
    const $div = document.createElement("div");
    $div.dataset.directory = "";
    $div.innerHTML = `
        <h2>${name}</h2>
            <p>This content doesn't exist yet. If you have an idea, please contact me</p>
            <ul>
            <li><a class="underline" href="https://www.linkedin.com/in/mikeworldyt/" target="_blank" >LinkedIn</a></li>
            <li><a class="underline" href="https://www.instagram.com/mikeworldyt/" target="_blank" >Instagram</a></li>
            <li>Discord = MikeWorldYt#5794</li>
            <li>eMail = mikeworldyt@gmail.com</li>
            </ul>`;
    return $div;
}

