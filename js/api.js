// Todas las funciones fetch (GET, POST, PUT, DELETE)

// Funcion GET - Obtener las publicaciones
const getAllPosts = async () => {
    let posts = await fetch("https://dummyjson.com/posts")
        .then(res => res.json());
    
    return posts;
}