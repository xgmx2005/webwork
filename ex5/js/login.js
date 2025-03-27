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
const validateField = (input, pattern) => {
    const errorElement = document.querySelector(`[data-error="${input.id}"]`);
    if (!input.checkValidity()) {
        input.classList.add('is-invalid');
        errorElement.style.display = 'block';
        return false;
    }
    input.classList.remove('is-invalid');
    errorElement.style.display = 'none';
    return true;
};

// 输入实时验证
usernameInput.addEventListener('input', () => validateField(usernameInput, /^[a-zA-Z0-9]{4,16}$/));
passwordInput.addEventListener('input', () => validateField(passwordInput, /^.{6,}$/));

// 表单提交处理
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const isValid = [usernameInput, passwordInput].every(input => validateField(input));
    if (!isValid) return;

    // 显示加载状态
    submitText.style.display = 'none';
    loader.style.display = 'block';
    loginForm.querySelector('button').disabled = true;

    try {
        // 模拟API请求
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // 从localStorage获取用户数据
        const storedUser = JSON.parse(localStorage.getItem(usernameInput.value));
        
        if (storedUser && atob(storedUser.password) === passwordInput.value) {
            successMessage.style.display = 'block';
            localStorage.setItem('isLoggedIn', 'true');
            setTimeout(() => window.location.href = 'index.html', 2000);
        } else {
            throw new Error('用户名或密码错误');
        }
    } catch (error) {
        successMessage.style.display = 'none';
        const errorElement = document.createElement('div');
        errorElement.className = 'alert alert-danger mt-3';
        errorElement.innerHTML = `
            <i class="bi bi-exclamation-circle me-2"></i>
            ${error.message}
        `;
        loginForm.insertBefore(errorElement, successMessage);
        setTimeout(() => errorElement.remove(), 3000);
    } finally {
        submitText.style.display = 'block';
        loader.style.display = 'none';
        loginForm.querySelector('button').disabled = false;
    }
});

// 初始化测试账号（仅首次加载时创建）
if (!localStorage.getItem('testuser')) {
    const testAccount = {
        username: 'testuser',
        password: btoa('test123'), // base64加密
        createdAt: new Date().toISOString()
    };
    localStorage.setItem(testAccount.username, JSON.stringify(testAccount));
}

// 登录状态检查
if (localStorage.getItem('isLoggedIn') === 'true') {
    window.location.href = 'index.html';
}
