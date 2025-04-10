
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // 加载头部
    const headerRes = await fetch('../htmls/header.html');
    const headerHTML = await headerRes.text();
    document.getElementById('header-container').innerHTML = headerHTML;

    // 加载页脚
    const footerRes = await fetch('../htmls/footer.html');
    const footerHTML = await footerRes.text();
    document.getElementById('footer-container').innerHTML = footerHTML;

    // 加载完成后初始化导航状态
    initNavStatus();
  } catch (error) {
    console.error('组件加载失败:', error);
  }
});

// 登录状态管理
function initNavStatus() {
  const navLoginItem = document.querySelector('nav ul li:nth-child(3)');
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (isLoggedIn) {
    navLoginItem.innerHTML = `<a href="#" id="logout">退出登录</a>`;
    document.getElementById('logout')?.addEventListener('click', () => {
      localStorage.removeItem('isLoggedIn');
      window.location.href = './login.html';
    });
  }
}
