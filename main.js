const $ulList = document.getElementById("list");
const $level2 = document.getElementById("Level2");
const $columns = document.querySelectorAll(".column");

function setColumnTransparent() {
  $columns.forEach((column)=>{
    if(column.children.length === 0){
      column.classList.add("hidden");
    }
    if(column.children.length !=0){
      column.classList.remove("hidden");
    }
  })
}
setColumnTransparent();

function windowAnimation() {
  $columns.forEach((column)=>{
    if(column.children.length === 0){
      column.classList.remove("win-scale");
    }
    if(column.children.length !=0){
      column.classList.add("win-scale");
    }
  })
}
windowAnimation();

$ulList.addEventListener("pointerdown", async (e) => {
    // Esto es una condicional, su parámetro recibe una condición, si esa condición se cumple, se evaluara el bloque de código, sino lo hace, este se ignorara.
    if (e.target.matches("[data-directory]")) {
    let element = e.target;
    // Aquí obtendremos el nombre del level
    // Array.from($ulList.children).forEach(el=> el.classList.remove("focus"));
    // element.classList.add("focus");
    let name = element.textContent;
    let contentHTML = null;
    // Obtenemos todo el level json
    let directory = await getJSON();
    // Aquí lo que haremos es obtener los valores del level, si no hay mas niveles devolveremos un array vació
    let keys = Object.keys(directory[element.dataset.directory] || []);
      if (keys.length === 0) {
      contentHTML = createError(name);
      }
      else {
      contentHTML = createListDirectory(keys, name);
      }
    if (
    $level2.firstElementChild === null ||
    $level2.firstElementChild.dataset.directory !== element.dataset.directory
    ) {
      // Aquí eliminaremos todos los hijos anteriores
        $level2.innerHTML = "";
      // Aquí introduciremos el contenido HTML
      // La función obtiene dos parámetros el lugar donde introducir el html, y el html en cuestión.
        $level2.insertAdjacentElement("afterbegin", contentHTML);
      // Aquí haremos que el primer hijo tenga un data attribute con el nombre del directorio.
        $level2.firstElementChild.dataset.directory = element.dataset.directory;
    }
    setColumnTransparent()
    // windowAnimation();
}
});

// Crear el directorio
function createListDirectory(keys, name) {
    // Esto crea un elemento del DOM "document.createElement" 
    const $ul = document.createElement("ul");
    const $h2 = document.createElement("h2");
    $h2.textContent = name;
    // Esto es para crear un data attribute.
    $ul.dataset.directory = "";
    // Esta función hace que cualquier nodo se pueda convertir en hijo de la etiqueta ul.
    $ul.append(
    $h2,
        ...keys.map((e, index) => {
        const $li = document.createElement("li");
        const $button = document.createElement("button");
        $button.textContent = `📁 ${e}`;
        $li.append($button)
        $li.dataset.directory = e;
        return $li;
    })
    );
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

async function getJSON() { 
    let res = await fetch("https://mikeworldyt.github.io/DirectoryStructurePC.github.io/structure.json");
    let directory = await res.json();
    return directory;
}

