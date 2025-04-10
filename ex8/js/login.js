$(document).ready(function () {
    // 获取表单和输入框元素
    const $loginForm = $('#loginForm');
    const $usernameInput = $('#username');
    const $passwordInput = $('#password');
    const $togglePassword = $('#togglePassword');
    const $loader = $('.loader');
    const $submitText = $('.submit-text');
    const $successMessage = $('.success-message');
    
    let users = [];
    
    // 异步加载用户数据
    $.getJSON('../user.json', function (data) {
        users = data;
    }).fail(function () {
        console.error('无法加载用户数据');
    });
    
    // 切换密码可见性
    $togglePassword.on('click', function () {
        const isPassword = $passwordInput.attr('type') === 'password';
        $passwordInput.attr('type', isPassword ? 'text' : 'password');
        $togglePassword.html(isPassword ? '<i class="bi bi-eye"></i>' : '<i class="bi bi-eye-slash"></i>');
    });
    
    // 表单提交处理
    $loginForm.on('submit', function (e) {
        e.preventDefault();
        
        const username = $usernameInput.val().trim();
        const password = $passwordInput.val().trim();
    
        // 简单的前端验证
        if (username === '' || password === '') {
            alert('用户名和密码不能为空');
            return;
        }
    
        // 显示加载动画并禁用按钮
        $submitText.hide();
        $loader.show();
        $loginForm.find('button').prop('disabled', true);
    
        // 模拟服务器验证延迟
        setTimeout(function () {
            // 在 users 数组中查找匹配的用户
            const user = users.find(u => u.username === username && u.password === password);
    
            if (user) {
                $successMessage.show();
                localStorage.setItem('isLoggedIn', 'true');
                setTimeout(() => window.location.href = '../htmls/index.html', 2000);
            } else {
                alert('用户名或密码错误');
            }
    
            // 恢复按钮状态
            $submitText.show();
            $loader.hide();
            $loginForm.find('button').prop('disabled', false);
        }, 1500);
    });
    
    // 登录状态检查
    if (localStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = '../htmls/index.html';
    }
});
