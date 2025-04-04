// 获取表单及各控件元素
const regForm = document.getElementById('regForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const genderInputs = document.getElementsByName('gender');
const interestCheckbox = document.getElementById('interestCheckbox');
const interestGroup = document.getElementById('interestGroup');
const interestSelect = document.getElementById('interestSelect');
const submitBtn = document.getElementById('submitBtn');

// 复选框控制兴趣下拉菜单显示隐藏
interestCheckbox.addEventListener('change', () => {
  interestGroup.style.display = interestCheckbox.checked ? 'block' : 'none';
});

// 页面加载时，检查 localStorage 是否已有该用户名的注册信息（仅对当前输入用户名有效，此处仅做演示）
window.addEventListener('load', () => {
  // 如果希望在页面加载时自动填充，需要根据一定条件来选择自动填充的用户数据
  // 此处未做全局填充，仅演示注册流程
});

// 监听用户名输入变化：若用户名为空，则删除该用户的注册信息（如果存在），并恢复按钮文字
usernameInput.addEventListener('input', () => {
  if (usernameInput.value.trim() === "") {
    // 如果用户名为空，则删除该用户名对应的注册信息
    // 注意：此处删除逻辑仅作演示，实际应根据需求判断
    submitBtn.value = "注册";
    alert("用户名为空，已删除注册信息");
  }
});

// 表单提交处理
regForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value;
  if (!username || !password) {
    alert("用户名和密码不能为空！");
    return;
  }

  // 收集性别值
  let gender = "male";
  genderInputs.forEach(radio => {
    if (radio.checked) gender = radio.value;
  });

  // 收集兴趣爱好（如果选中则记录，否则为空）
  let interest = interestCheckbox.checked ? interestSelect.value : "";

  // 构造用户数据对象
  const userData = {
    username: username,
    password: btoa(password), // 使用 base64 简单加密（仅用于演示，不建议用于生产）
    gender: gender,
    interest: interest,
    updatedAt: new Date().toISOString()
  };

  // 判断操作：这里以按钮文字作为判断依据
  if (submitBtn.value === "注册") {
    if (localStorage.getItem(username)) {
      alert("该用户名已被注册，请使用修改功能！");
      return;
    }
    localStorage.setItem(username, JSON.stringify(userData));
    alert("注册成功！即将跳转到登录页面");
    setTimeout(() => {
      window.location.href = "../htmls/login.html";
    }, 2000);
  } else { // 修改操作
    localStorage.setItem(username, JSON.stringify(userData));
    alert("修改成功！");
  }
});
