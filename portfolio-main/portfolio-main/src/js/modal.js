function openModal() {
    document.getElementById('modalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
    document.getElementById('fullName').focus();
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
    document.body.style.overflow = 'auto';
    resetForm();
}

// Close modal when clicking overlay
document.getElementById('modalOverlay').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Close modal with ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Character counter
const messageInput = document.getElementById('message');
const charCounter = document.getElementById('charCounter');

messageInput.addEventListener('input', function() {
    const length = this.value.length;
    const maxLength = this.getAttribute('maxlength');
    
    charCounter.textContent = `${length} / ${maxLength}`;
    
    if (length > maxLength * 0.9) {
        charCounter.classList.add('warning');
    } else {
        charCounter.classList.remove('warning');
    }
    
    if (length >= maxLength) {
        charCounter.classList.add('error');
    } else {
        charCounter.classList.remove('error');
    }
});

// Phone mask
document.getElementById('phone').addEventListener('input', function() {
    let value = this.value.replace(/\D/g, '');
    if (value.length <= 11) {
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        this.value = value;
    }
});

// Form validation
function validateForm() {
    let isValid = true;
    
    // Validate name
    const name = document.getElementById('fullName');
    const nameError = document.getElementById('nameError');
    if (name.value.trim().length < 2) {
        showError(name, nameError, 'Nome deve ter pelo menos 2 caracteres');
        isValid = false;
    } else {
        showSuccess(name, nameError);
    }
    
    // Validate email
    const email = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        showError(email, emailError, 'E-mail inválido');
        isValid = false;
    } else {
        showSuccess(email, emailError);
    }
    
    // Validate message
    const message = document.getElementById('message');
    const messageError = document.getElementById('messageError');
    if (message.value.trim().length < 10) {
        showError(message, messageError, 'Mensagem deve ter pelo menos 10 caracteres');
        isValid = false;
    } else {
        showSuccess(message, messageError);
    }
    
    return isValid;
}

function showError(input, errorElement, message) {
    input.classList.add('error');
    input.classList.remove('success');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function showSuccess(input, errorElement) {
    input.classList.add('success');
    input.classList.remove('error');
    errorElement.style.display = 'none';
}

// Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    const submitButton = document.getElementById('submitButton');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const buttonText = document.getElementById('buttonText');
    const successMessage = document.getElementById('successMessage');
    
    // Show loading state
    submitButton.disabled = true;
    loadingSpinner.style.display = 'inline-block';
    buttonText.textContent = 'Enviando...';
    
    // Simulate form submission (replace with your actual submission logic)
    setTimeout(() => {
        // Hide loading state
        submitButton.disabled = false;
        loadingSpinner.style.display = 'none';
        buttonText.textContent = 'Enviar Mensagem';
        
        // Show success message
        successMessage.style.display = 'block';
        
        // Reset form after 3 seconds
        setTimeout(() => {
            resetForm();
            closeModal();
        }, 3000);
        
    }, 2000);
});

function resetForm() {
    document.getElementById('contactForm').reset();
    document.getElementById('charCounter').textContent = '0 / 1000';
    document.getElementById('successMessage').style.display = 'none';
    
    // Remove validation classes
    document.querySelectorAll('.form-input').forEach(input => {
        input.classList.remove('error', 'success');
    });
    
    // Hide error messages
    document.querySelectorAll('.error-message').forEach(error => {
        error.style.display = 'none';
    });
}

// Real-time validation
document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('blur', validateForm);
});