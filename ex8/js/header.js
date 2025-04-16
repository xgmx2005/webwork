$(document).ready(function() {
  var currentUser = localStorage.getItem("currentUser");

  $('nav .navbar-nav li a').each(function() {
    var $link = $(this);
    var href = $link.attr('href');

    if (currentUser) {
      if (href === './login.html') {
        $link.text("退出登录").attr('href', '#').on('click', function(e) {
          e.preventDefault();
          localStorage.removeItem("currentUser");
          alert("已退出登录！");
          window.location.href = "./index.html";
        });
      }
      if (href === './reg.html') {
        $link.text("个人中心").attr('href', './reg.html');
      }
    } else {
      if (href === './login.html') {
        $link.text("登录");
      }
      if (href === './reg.html') {
        $link.text("注册");
      }
    }
  });
});
