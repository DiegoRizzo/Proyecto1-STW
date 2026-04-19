// Funciones que manipulan el DOM

postsGenerales = [];

function crearPostDiv(postAuthor, postTitle, postContent, postTags) {
    let div = document.createElement("div");
    div.style.width = "25%";
    div.style.height = "500px";
    div.style.border = "3px solid #C2C2C2";
    div.style.borderRadius = "5px";
    div.style.padding = "5px";

    let autor = document.createElement("h3");
    autor.textContent = postAuthor;
    div.appendChild(autor);

    let titulo = document.createElement("h2");
    titulo.textContent = postTitle;
    div.appendChild(titulo);

    let contenido = document.createElement("p");
    contenido.textContent = postContent;
    div.appendChild(contenido);

    let etiquetas = document.createElement("p");
    etiquetas.textContent = postTags;
    div.appendChild(etiquetas);

    return div;
}

const renderizarPosts = async () => {
    let result = await getAllPosts();
    let posts = result.posts;
    postsGenerales = posts;

    let container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexWrap = "wrap";
    container.style.gap = "30px";
    container.id = "posts-container";

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        let carta = crearPostDiv(post.userId, post.title, post.body, post.tags);
        container.appendChild(carta);
    }

    document.body.appendChild(container);
}

const renderizarPostsFiltrados = async (texto) => {
    let container = document.getElementById("posts-container");

    if (container != null) {
        container.innerHTML = "";
    }

    let postsFiltrados = [];

    if (texto != "") {
        postsFiltrados = postsGenerales.filter((_post) => {
            return _post.title.toLowerCase().includes(texto.toLowerCase());
        });
    } else {
        postsFiltrados = postsGenerales;
    }
}

// Input para hacer busquedas
let inputSearch = document.createElement("input");
inputSearch.type = "string";
document.body.appendChild(inputSearch);

inputSearch.addEventListener("input", (e) => {
    let texto = e.target.value;
    renderizarPostsFiltrados(texto);
});