// 注册表单元素
const regForm = document.getElementById('regForm');
const regUsername = document.getElementById('regUsername');
const regPassword = document.getElementById('regPassword');
const regConfirm = document.getElementById('regConfirm');
const regLoader = document.querySelector('.reg-loader');
const regSubmitText = document.querySelector('.reg-submit-text');

// 实时表单验证
const validateRegField = (input, pattern) => {
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

// 输入验证
regUsername.addEventListener('input', () => validateRegField(regUsername, /^[a-zA-Z0-9]{4,16}$/));
regPassword.addEventListener('input', () => validateRegField(regPassword, /^.{6,}$/));

// 密码一致性验证
regConfirm.addEventListener('input', () => {
    const errorElement = document.querySelector('[data-error="regConfirm"]');
    if (regConfirm.value !== regPassword.value) {
        regConfirm.classList.add('is-invalid');
        errorElement.style.display = 'block';
        return false;
    }
    regConfirm.classList.remove('is-invalid');
    errorElement.style.display = 'none';
    return true;
});

// 表单提交
regForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const isValid = [regUsername, regPassword, regConfirm].every(input => {
        if (input === regConfirm) {
            return input.value === regPassword.value;
        }
        return validateRegField(input);
    });

    if (!isValid) return;

    // 显示加载状态
    regSubmitText.style.display = 'none';
    regLoader.style.display = 'block';
    regForm.querySelector('button').disabled = true;

    try {
        // 检查用户是否已存在
        if (localStorage.getItem(regUsername.value)) {
            throw new Error('用户名已被注册');
        }

        // 存储用户数据（使用base64简单加密）
        const userData = {
            username: regUsername.value,
            password: btoa(regPassword.value), // base64编码
            createdAt: new Date().toISOString()
        };

        localStorage.setItem(regUsername.value, JSON.stringify(userData));

        // 显示成功提示
        const successElement = document.createElement('div');
        successElement.className = 'alert alert-success mt-3';
        successElement.innerHTML = `
            <i class="bi bi-check-circle me-2"></i>
            注册成功，2秒后自动跳转到登录页
        `;
        regForm.insertBefore(successElement, regForm.lastElementChild);

        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);

    } catch (error) {
        const errorElement = document.createElement('div');
        errorElement.className = 'alert alert-danger mt-3';
        errorElement.innerHTML = `
            <i class="bi bi-exclamation-circle me-2"></i>
            ${error.message}
        `;
        regForm.insertBefore(errorElement, regForm.lastElementChild);
        setTimeout(() => errorElement.remove(), 3000);
    } finally {
        regSubmitText.style.display = 'block';
        regLoader.style.display = 'none';
        regForm.querySelector('button').disabled = false;
    }
});
