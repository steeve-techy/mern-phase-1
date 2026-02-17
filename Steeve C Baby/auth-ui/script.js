function switchForm(type) {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const loginTab = document.getElementById("loginTab");
    const signupTab = document.getElementById("signupTab");

    loginForm.classList.remove("active");
    signupForm.classList.remove("active");
    loginTab.classList.remove("active");
    signupTab.classList.remove("active");

    if (type === "login") {
        loginForm.classList.add("active");
        loginTab.classList.add("active");
    } else {
        signupForm.classList.add("active");
        signupTab.classList.add("active");
    }
}

function togglePassword(id, btn) {
    const field = document.getElementById(id);
    if (!field) return;
    field.type = field.type === "password" ? "text" : "password";
    if (btn) btn.textContent = field.type === 'password' ? '👁️' : '🙈';
}

function checkStrength() {
    const password = document.getElementById("signupPassword").value || '';
    const bar = document.getElementById("strengthBar");
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[@$!%*?&#^()_+\-=]/.test(password)) strength++;

    const width = Math.min(100, strength * 25);
    bar.style.width = width + "%";
    if (strength <= 1) bar.style.background = '#fb7185';
    else if (strength === 2) bar.style.background = '#f59e0b';
    else if (strength === 3) bar.style.background = '#a3e635';
    else bar.style.background = '#10b981';
}

function setError(el, msg) {
    if (!el) return;
    el.textContent = msg;
    el.style.display = msg ? 'block' : 'none';
}

function clearFormErrors(form) {
    Array.from(form.querySelectorAll('.error')).forEach(e => setError(e, ''));
}

function validateLogin() {
    const email = document.getElementById('loginEmail');
    const pass = document.getElementById('loginPassword');
    const form = document.getElementById('loginForm');
    clearFormErrors(form);

    let ok = true;
    if (!email.value || !/^\S+@\S+\.\S+$/.test(email.value)) {
        setError(email.parentElement.querySelector('.error'), 'Please enter a valid email');
        ok = false;
    }
    if (!pass.value) {
        setError(pass.parentElement.querySelector('.error'), 'Please enter your password');
        ok = false;
    }
    if (!ok) return;

    showSuccess('Logged in');
}

function validateSignup() {
    const name = document.getElementById('signupName');
    const email = document.getElementById('signupEmail');
    const password = document.getElementById('signupPassword');
    const confirm = document.getElementById('confirmPassword');
    const form = document.getElementById('signupForm');
    clearFormErrors(form);

    let ok = true;
    if (!name.value || name.value.trim().length < 2) {
        setError(name.parentElement.querySelector('.error'), 'Enter your name');
        ok = false;
    }
    if (!email.value || !/^\S+@\S+\.\S+$/.test(email.value)) {
        setError(email.parentElement.querySelector('.error'), 'Enter a valid email');
        ok = false;
    }
    if (!password.value || password.value.length < 8) {
        setError(password.parentElement.querySelector('.error'), 'Password must be at least 8 chars');
        ok = false;
    }
    if (password.value !== confirm.value) {
        setError(confirm.parentElement.querySelector('.error'), 'Passwords do not match');
        ok = false;
    }
    if (!ok) return;

    showSuccess('Account created');
}

function showSuccess(message) {
    const overlay = document.getElementById('successOverlay');
    const msg = document.getElementById('successMsg');
    msg.textContent = message;
    overlay.classList.add('show');
    overlay.setAttribute('aria-hidden', 'false');
    setTimeout(() => {
        overlay.classList.remove('show');
        overlay.setAttribute('aria-hidden', 'true');
    }, 1400);
}

function openForgot(){
    const modal = document.getElementById('forgotModal');
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden','false');
}

function closeForgot(){
    const modal = document.getElementById('forgotModal');
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden','true');
}

function sendReset(){
    const email = document.getElementById('forgotEmail');
    const err = email.parentElement.querySelector('.error');
    setError(err, '');
    if (!email.value || !/^\S+@\S+\.\S+$/.test(email.value)){
        setError(err, 'Enter a valid email');
        return;
    }
    closeForgot();
    showSuccess('Reset sent');
}

// submit on Enter for inputs
document.addEventListener('keydown', (e)=>{
    if (e.key === 'Enter'){
        const active = document.querySelector('.form.active');
        if (!active) return;
        // find primary button and click
        const btn = active.querySelector('.primary');
        if (btn) btn.click();
    }
});

// initialize
document.addEventListener('DOMContentLoaded', ()=>{
    // ensure labels float when fields have value
    document.querySelectorAll('.input-group input').forEach(inp=>{
        inp.placeholder = ' ';
        inp.addEventListener('input', ()=>{
            // nothing else; CSS handles label position via :placeholder-shown
        });
    });
});
