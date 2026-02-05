// ============================================
// FORM VALIDATION - JAVASCRIPT
// ============================================

// Get all form elements
const form = document.getElementById('validationForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const submitButton = document.querySelector('.btn-submit');
const successMessage = document.getElementById('successMessage');

// Error message elements
const errors = {
    name: document.getElementById('nameError'),
    email: document.getElementById('emailError'),
    password: document.getElementById('passwordError'),
    confirmPassword: document.getElementById('confirmPasswordError')
};

// ============================================
// VALIDATION RULES
// ============================================

/**
 * Validates name field
 * - Must not be empty
 * - Minimum 3 characters
 * - Maximum 50 characters
 */
function validateName(name) {
    name = name.trim();
    
    if (name === '') {
        return { valid: false, message: 'Name is required' };
    }
    
    if (name.length < 3) {
        return { valid: false, message: 'Name must be at least 3 characters long' };
    }
    
    if (name.length > 50) {
        return { valid: false, message: 'Name must not exceed 50 characters' };
    }
    
    return { valid: true, message: '' };
}

/**
 * Validates email format
 * - Uses regex pattern for email validation
 */
function validateEmail(email) {
    email = email.trim();
    
    if (email === '') {
        return { valid: false, message: 'Email is required' };
    }
    
    // Email regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        return { valid: false, message: 'Please enter a valid email address' };
    }
    
    return { valid: true, message: '' };
}

/**
 * Validates password field
 * - Must not be empty
 * - Minimum 8 characters
 */
function validatePassword(password) {
    if (password === '') {
        return { valid: false, message: 'Password is required' };
    }
    
    if (password.length < 8) {
        return { valid: false, message: 'Password must be at least 8 characters long' };
    }
    
    return { valid: true, message: '' };
}

/**
 * Validates confirm password field
 * - Must not be empty
 * - Must match password field
 */
function validateConfirmPassword(password, confirmPassword) {
    if (confirmPassword === '') {
        return { valid: false, message: 'Please confirm your password' };
    }
    
    if (password !== confirmPassword) {
        return { valid: false, message: 'Passwords do not match' };
    }
    
    return { valid: true, message: '' };
}

// ============================================
// DISPLAY ERROR MESSAGES
// ============================================

/**
 * Shows error message for a field
 */
function showError(fieldName, message) {
    errors[fieldName].textContent = message;
    errors[fieldName].classList.add('show');
    
    // Add error styling to input
    const input = document.getElementById(fieldName);
    input.classList.remove('input-success');
    input.classList.add('input-error');
}

/**
 * Clears error message for a field
 */
function clearError(fieldName) {
    errors[fieldName].textContent = '';
    errors[fieldName].classList.remove('show');
    
    // Remove error styling from input
    const input = document.getElementById(fieldName);
    input.classList.remove('input-error');
    input.classList.add('input-success');
}

// ============================================
// REAL-TIME VALIDATION (on input change)
// ============================================

// Name field validation on input
nameInput.addEventListener('input', function() {
    const validation = validateName(this.value);
    
    if (validation.valid) {
        clearError('name');
    } else {
        showError('name', validation.message);
    }
});

// Email field validation on input
emailInput.addEventListener('input', function() {
    const validation = validateEmail(this.value);
    
    if (validation.valid) {
        clearError('email');
    } else {
        showError('email', validation.message);
    }
});

// Password field validation on input
passwordInput.addEventListener('input', function() {
    const validation = validatePassword(this.value);
    
    if (validation.valid) {
        clearError('password');
    } else {
        showError('password', validation.message);
    }
    
    // Also validate confirm password if it has a value
    if (confirmPasswordInput.value !== '') {
        const confirmValidation = validateConfirmPassword(
            this.value,
            confirmPasswordInput.value
        );
        
        if (confirmValidation.valid) {
            clearError('confirmPassword');
        } else {
            showError('confirmPassword', confirmValidation.message);
        }
    }
});

// Confirm password field validation on input
confirmPasswordInput.addEventListener('input', function() {
    const validation = validateConfirmPassword(passwordInput.value, this.value);
    
    if (validation.valid) {
        clearError('confirmPassword');
    } else {
        showError('confirmPassword', validation.message);
    }
});

// ============================================
// FORM SUBMISSION
// ============================================

/**
 * Validates entire form on submission
 * - Validates all fields
 * - Shows error messages for invalid fields
 * - Prevents submission if validation fails
 */
form.addEventListener('submit', function(event) {
    // Prevent default form submission
    event.preventDefault();
    
    // Validate all fields
    const nameValidation = validateName(nameInput.value);
    const emailValidation = validateEmail(emailInput.value);
    const passwordValidation = validatePassword(passwordInput.value);
    const confirmPasswordValidation = validateConfirmPassword(
        passwordInput.value,
        confirmPasswordInput.value
    );
    
    // Check each field and display errors
    if (!nameValidation.valid) {
        showError('name', nameValidation.message);
    } else {
        clearError('name');
    }
    
    if (!emailValidation.valid) {
        showError('email', emailValidation.message);
    } else {
        clearError('email');
    }
    
    if (!passwordValidation.valid) {
        showError('password', passwordValidation.message);
    } else {
        clearError('password');
    }
    
    if (!confirmPasswordValidation.valid) {
        showError('confirmPassword', confirmPasswordValidation.message);
    } else {
        clearError('confirmPassword');
    }
    
    // If all validations pass, submit the form
    if (nameValidation.valid && 
        emailValidation.valid && 
        passwordValidation.valid && 
        confirmPasswordValidation.valid) {
        
        // Hide form and show success message
        form.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Optional: Reset form after 2 seconds and show form again
        setTimeout(() => {
            form.reset();
            form.style.display = 'block';
            successMessage.style.display = 'none';
            
            // Clear all error states
            Object.keys(errors).forEach(fieldName => {
                const input = document.getElementById(fieldName);
                input.classList.remove('input-success', 'input-error');
                errors[fieldName].classList.remove('show');
                errors[fieldName].textContent = '';
            });
        }, 2000);
    }
});
