// Validaciones de Formularios
// marca un campo como inválido y muestra el mensaje de error
function showFieldError(fieldId, errorId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    if (field) field.classList.add('input-error');
    if (error) error.textContent = message;
}

// limpia el error de un campo específico
function clearFieldError(fieldId, errorId) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    if (field) field.classList.remove('input-error');
    if (error) error.textContent = '';
}

// limpia todos los errores antes de volver a validar
function clearAllErrors(fields) {
    fields.forEach(({ fieldId, errorId }) => clearFieldError(fieldId, errorId));
}

// valida el formulario de crear publicación
function validateCreateForm() {
    const title  = document.getElementById('create-title').value.trim();
    const body   = document.getElementById('create-body').value.trim();
    const author = document.getElementById('create-author').value.trim();

    const fields = [
        { fieldId: 'create-title',  errorId: 'error-create-title' },
        { fieldId: 'create-body',   errorId: 'error-create-body' },
        { fieldId: 'create-author', errorId: 'error-create-author' },
    ];

    clearAllErrors(fields);

    let isValid = true;

    if (title.length === 0) {
        showFieldError('create-title', 'error-create-title', 'El título es obligatorio.');
        isValid = false;
    } else if (title.length < 5) {
        showFieldError('create-title', 'error-create-title', 'El título debe tener al menos 5 caracteres.');
        isValid = false;
    }

    if (body.length === 0) {
        showFieldError('create-body', 'error-create-body', 'El contenido es obligatorio.');
        isValid = false;
    } else if (body.length < 20) {
        showFieldError('create-body', 'error-create-body', 'El contenido debe tener al menos 20 caracteres.');
        isValid = false;
    }

    if (author.length === 0) {
        showFieldError('create-author', 'error-create-author', 'El nombre del autor es obligatorio.');
        isValid = false;
    } else if (author.length < 3) {
        showFieldError('create-author', 'error-create-author', 'El nombre debe tener al menos 3 caracteres.');
        isValid = false;
    }

    return isValid;
}

// valida el formulario de editar publicación
function validateEditForm() {
    const title = document.getElementById('edit-title').value.trim();
    const body  = document.getElementById('edit-body').value.trim();

    const fields = [
        { fieldId: 'edit-title', errorId: 'error-edit-title' },
        { fieldId: 'edit-body',  errorId: 'error-edit-body' },
    ];

    clearAllErrors(fields);

    let isValid = true;

    if (title.length === 0) {
        showFieldError('edit-title', 'error-edit-title', 'El título es obligatorio.');
        isValid = false;
    } else if (title.length < 5) {
        showFieldError('edit-title', 'error-edit-title', 'El título debe tener al menos 5 caracteres.');
        isValid = false;
    }

    if (body.length === 0) {
        showFieldError('edit-body', 'error-edit-body', 'El contenido es obligatorio.');
        isValid = false;
    } else if (body.length < 20) {
        showFieldError('edit-body', 'error-edit-body', 'El contenido debe tener al menos 20 caracteres.');
        isValid = false;
    }

    return isValid;
}