// 表单元素
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');
const loader = document.querySelector('.loader');
const submitText = document.querySelector('.submit-text');
const successMessage = document.querySelector('.success-message');

// 密码可见性切换
togglePassword.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    togglePassword.innerHTML = isPassword 
        ? '<i class="bi bi-eye"></i>'
        : '<i class="bi bi-eye-slash"></i>';
});

// 实时表单验证
const validateField = (input) => {
    const errorElement = document.querySelector(`[data-error="${input.id}"]`);
    if (input.value.trim() === '') {
        errorElement.textContent = `${input.id === 'username' ? '用户名' : '密码'}不能为空`;
        errorElement.style.display = 'block';
        input.classList.add('is-invalid');
        return false;
    }
    if (!input.checkValidity()) {
        errorElement.textContent = input.id === 'username' ? '用户名需4-16位字母或数字' : '密码至少6位字符';
        errorElement.style.display = 'block';
        input.classList.add('is-invalid');
        return false;
    }
    errorElement.style.display = 'none';
    input.classList.remove('is-invalid');
    return true;
};

// 输入实时验证
usernameInput.addEventListener('input', () => validateField(usernameInput));
passwordInput.addEventListener('input', () => validateField(passwordInput));

// 表单提交处理
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const isValid = [usernameInput, passwordInput].every(input => validateField(input));
    if (!isValid) {
        usernameInput.focus();
        return;
    }
    
    // 显示加载状态
    submitText.style.display = 'none';
    loader.style.display = 'block';
    loginForm.querySelector('button').disabled = true;
    
    try {
        // 从localStorage获取用户数据
        const storedUser = localStorage.getItem(usernameInput.value);
        
        if (!storedUser) {
            throw new Error('登录信息有误');
        }
        
        const userData = JSON.parse(storedUser);
        const decodedPassword = atob(userData.password);
        
        if (decodedPassword === passwordInput.value) {
            successMessage.style.display = 'block';
            localStorage.setItem('isLoggedIn', 'true');
            setTimeout(() => window.location.href = 'index.html', 1000);
        } else {
            throw new Error('登录信息有误');
        }
    } catch (error) {
        successMessage.style.display = 'none';
        const errorElement = document.createElement('div');
        errorElement.className = 'alert alert-danger mt-3';
        errorElement.innerHTML = 
            `<i class="bi bi-exclamation-circle me-2"></i>
            ${error.message}`;
        loginForm.insertBefore(errorElement, successMessage);
        setTimeout(() => errorElement.remove(), 3000);
        
        // 清空输入并聚焦
        usernameInput.value = '';
        passwordInput.value = '';
        usernameInput.focus();
    } finally {
        submitText.style.display = 'block';
        loader.style.display = 'none';
        loginForm.querySelector('button').disabled = false;
    }
});

// 登录状态检查
if (localStorage.getItem('isLoggedIn') === 'true') {
    window.location.href = 'index.html';
}