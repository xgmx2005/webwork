/* js/index.js 内容 */
document.addEventListener('DOMContentLoaded', () => {
    const navLoginItem = document.querySelector('nav ul li:nth-child(3)');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
        navLoginItem.innerHTML = `<a href="#" id="logout">退出登录</a>`;
        document.getElementById('logout').addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            window.location.href = 'login.html';
        });
    }
});

if (localStorage.getItem('isLoggedIn') === 'true' && 
   window.location.pathname.endsWith('login.html')) {
    window.location.href = 'index.html';
}

