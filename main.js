const $ulList = document.getElementById("list");
const $level2 = document.getElementById("Level2");
const $columns = document.querySelectorAll("column");

function setColumnTransparent() {
  console.log("se cargo");
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

$ulList.addEventListener("pointerdown", async (e) => {
    // Esto es una condicional, su parámetro recibe una condición, si esa condición se cumple, se evaluara el bloque de código, sino lo hace, este se ignorara.
    if (e.target.matches("[data-directory]")) {
    let element = e.target;
    // Aquí obtendremos el nombre del level
    // Array.from($ulList.children).forEach(el=> el.classList.remove("focus"));
    // element.classList.add("focus");
    let name = element.textContent;
    // Aquí obtendremos el contenido HTML
    let contentHTML = null;
    // Obtenemos todo el level json
    let directory = await getJSON();
    // Aquí lo que haremos es obtener los valores del level, si no hay mas niveles devolveremos un array vació
    let keys = Object.keys(directory[element.dataset.directory] || []);
    // Esto es una condicional, si el array esta vació haremos esto
    if (keys.length === 0) {
    contentHTML = createError(name);
    } else {
      // Y si no, haremos esto
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
}
});


function createListDirectory(keys, name) {
    // Esto crea un elemento del DOM, document.createElement 
    //espera un parámetro, este parámetro es la etiqueta que quieres crear.
    const $ul = document.createElement("ul");
    const $h2 = document.createElement("h2");
    $h2.textContent = name;
    // Esto es para crear un data attribute.
    $ul.dataset.directory = "";
    // Esta función hace que cualquier nodo se pueda convertir en hijo de la etiqueta ul.
    $ul.append(
    $h2,
      // Recorremos la lista que mandamos y la desestructuramos.
        ...keys.map((e, index) => {
        const $li = document.createElement("li");
        const $button = document.createElement("button");
        $button.textContent = `📁 ${e}`;
        $li.append($button)
        $li.dataset.directory = e;
        return $li;
    })
    );
    // Retornamos un valor
    return $ul;
}

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

