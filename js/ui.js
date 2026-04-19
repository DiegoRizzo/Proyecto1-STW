// Funciones que manipulan el DOM
// muestra el loader mientras carga
function showLoader(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('hidden');
}

// oculta el loader cuando ya terminó
function hideLoader(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
}

// muestra el banner de error con mensaje personalizado
function showError(id, message) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('hidden');
    const msg = document.getElementById(id + '-msg');
    if (msg && message) msg.textContent = message;
}

function hideError(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
}

// muestra el estado vacío cuando no hay resultados
function showEmpty(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('hidden');
}

function hideEmpty(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
}

// toast flotante que desaparece después de 3 segundos
function showToast(message) {
    const toast = document.getElementById('toast-global');
    toast.textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3000);
}

// crea y renderiza las tarjetas de posts en el grid
function renderPostsGrid(posts, containerId = 'posts-grid') {
    const grid = document.getElementById(containerId);
    grid.innerHTML = '';

    posts.forEach(post => {
        const card = document.createElement('div');
        card.className = 'post-card';
        card.dataset.id = post.id;

        const tags = (post.tags || [])
            .map(tag => `<span class="tag-badge">${tag}</span>`)
            .join('');

        card.innerHTML = `
            <div class="post-card__tags">${tags}</div>
            <h3 class="post-card__title">${post.title}</h3>
            <p class="post-card__body">${post.body}</p>
            <div class="post-card__footer">
                <span class="post-card__author">Usuario #${post.userId}</span>
                <button class="btn btn-outline post-card__btn" data-id="${post.id}">
                    Ver más
                </button>
            </div>
        `;

        // al hacer click en cualquier parte de la card navega al detalle
        card.addEventListener('click', () => {
            navigateTo('detail', post.id);
        });

        grid.appendChild(card);
    });
}

// actualiza los botones y el contador de página
function renderPagination(currentPage, totalPages) {
    const pagination = document.getElementById('pagination');
    const btnPrev    = document.getElementById('btn-prev');
    const btnNext    = document.getElementById('btn-next');
    const pageInfo   = document.getElementById('page-info');

    if (totalPages <= 1) {
        pagination.classList.add('hidden');
        return;
    }

    pagination.classList.remove('hidden');
    pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
    btnPrev.disabled = currentPage === 1;
    btnNext.disabled = currentPage === totalPages;
}

// llena todos los campos de la vista de detalle
function renderPostDetail(post) {
    const tags = (post.tags || [])
        .map(tag => `<span class="tag-badge">${tag}</span>`)
        .join('');

    document.getElementById('detail-tags').innerHTML    = tags;
    document.getElementById('detail-title').textContent = post.title;
    document.getElementById('detail-author').textContent = `Usuario #${post.userId}`;
    document.getElementById('detail-body').textContent  = post.body;

    const viewsSpan    = document.querySelector('#detail-views span');
    const likesSpan    = document.querySelector('#detail-likes span');
    const dislikesSpan = document.querySelector('#detail-dislikes span');

    if (viewsSpan)    viewsSpan.textContent    = post.views    || 0;
    if (likesSpan)    likesSpan.textContent    = post.reactions?.likes    || 0;
    if (dislikesSpan) dislikesSpan.textContent = post.reactions?.dislikes || 0;

    document.getElementById('post-detail').classList.remove('hidden');
}

// precarga el formulario de edición con los datos actuales del post
function prefillEditForm(post) {
    document.getElementById('edit-post-id').value = post.id;
    document.getElementById('edit-title').value   = post.title;
    document.getElementById('edit-body').value    = post.body;
}

// limpia los campos después de crear un post
function clearCreateForm() {
    document.getElementById('create-title').value  = '';
    document.getElementById('create-body').value   = '';
    document.getElementById('create-author').value = '';
}

// llena el select de etiquetas con los tags únicos de todos los posts
function populateTagsFilter(posts) {
    const select = document.getElementById('filter-tag');
    const allTags = new Set();
    posts.forEach(post => (post.tags || []).forEach(tag => allTags.add(tag)));

    allTags.forEach(tag => {
        const option = document.createElement('option');
        option.value = tag;
        option.textContent = tag;
        select.appendChild(option);
    });
}

// llena el select de autores con los IDs únicos
function populateUsersFilter(posts) {
    const select = document.getElementById('filter-user');
    const allUsers = new Set();
    posts.forEach(post => allUsers.add(post.userId));

    [...allUsers].sort((a, b) => a - b).forEach(userId => {
        const option = document.createElement('option');
        option.value = userId;
        option.textContent = `Usuario #${userId}`;
        select.appendChild(option);
    });
}

// resalta el link activo según la vista actual
function setActiveNavLink(route) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.dataset.route === route);
    });
}

// muestra el modal de confirmación antes de eliminar
function showModal() {
    document.getElementById('modal-confirm').classList.remove('hidden');
}

function hideModal() {
    document.getElementById('modal-confirm').classList.add('hidden');
}