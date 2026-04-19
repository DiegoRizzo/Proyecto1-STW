const BASE_URL = 'https://dummyjson.com';

// trae los posts paginados según la página actual
async function getPosts(limit = 10, skip = 0) {
    const response = await fetch(`${BASE_URL}/posts?limit=${limit}&skip=${skip}`);
    if (!response.ok) throw new Error('Error al obtener las publicaciones');
    return await response.json();
}

// busca un post específico por su ID
async function getPostById(id) {
    const response = await fetch(`${BASE_URL}/posts/${id}`);
    if (!response.ok) throw new Error('Error al obtener la publicación');
    return await response.json();
}

// trae todos los posts de un usuario en particular
async function getPostsByUser(userId) {
    const response = await fetch(`${BASE_URL}/posts/user/${userId}`);
    if (!response.ok) throw new Error('Error al obtener publicaciones del autor');
    return await response.json();
}

// trae todos los posts para poder poblar los filtros
async function getAllPosts() {
    const response = await fetch(`${BASE_URL}/posts?limit=0`);
    if (!response.ok) throw new Error('Error al obtener las publicaciones');
    return await response.json();
}

// envía el formulario de creación al endpoint de DummyJSON
async function createPost(title, body, userId = 1) {
    const response = await fetch(`${BASE_URL}/posts/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body, userId })
    });
    if (!response.ok) throw new Error('Error al crear la publicación');
    return await response.json();
}

// actualiza título y contenido de un post existente
async function updatePost(id, title, body) {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body })
    });
    if (!response.ok) throw new Error('Error al actualizar la publicación');
    return await response.json();
}

// elimina un post por ID
async function deletePost(id) {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Error al eliminar la publicación');
    return await response.json();
}

// búsqueda por texto usando el endpoint de DummyJSON
async function searchPosts(query) {
    const response = await fetch(`${BASE_URL}/posts/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Error al buscar publicaciones');
    return await response.json();
}