// 获取表单及各控件元素
const regForm = document.getElementById('regForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const genderInputs = document.getElementsByName('gender');
const interestCheckbox = document.getElementById('interestCheckbox');
const interestGroup = document.getElementById('interestGroup');
const interestSelect = document.getElementById('interestSelect');
const submitBtn = document.getElementById('submitBtn');

// 当前用户 key，记录正在编辑的用户名
let currentUserKey = "";

// 复选框控制兴趣下拉菜单显示/隐藏
interestCheckbox.addEventListener('change', () => {
  interestGroup.style.display = interestCheckbox.checked ? 'block' : 'none';
});

// 页面加载时，根据某种条件加载当前用户数据（这里仅做示例，实际可根据需求传参或其他方式获取）
window.addEventListener('load', () => {
  // 假设页面加载时，如果用户名输入框有默认值，则尝试填充数据
  const defaultUsername = usernameInput.value.trim();
  if (defaultUsername) {
    const storedUser = localStorage.getItem(defaultUsername);
    if (storedUser) {
      currentUserKey = defaultUsername;
      fillFormWithStoredData(JSON.parse(storedUser));
    }
  }
});

// 监听用户名输入变化：如果当前用户 key 存在且输入框被清空，则删除对应注册信息
usernameInput.addEventListener('input', () => {
  const username = usernameInput.value.trim();
  if (!username && currentUserKey) {
    localStorage.removeItem(currentUserKey);
    alert("用户名为空，已删除该用户注册信息");
    currentUserKey = "";
    submitBtn.value = "注册";
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

  let gender = "male";
  genderInputs.forEach(radio => {
    if (radio.checked) gender = radio.value;
  });

  let interest = interestCheckbox.checked ? interestSelect.value : "";

  const userData = {
    username,
    password: btoa(password), // base64 加密（仅作演示，非生产方案）
    gender,
    interest,
    updatedAt: new Date().toISOString()
  };

  // 判断操作：如果存在该用户信息，则执行修改，否则注册
  if (localStorage.getItem(username)) {
    localStorage.setItem(username, JSON.stringify(userData));
    alert("修改成功！");
  } else {
    localStorage.setItem(username, JSON.stringify(userData));
    // 弹出确认框，让用户选择是否跳转到登录页面
    if (confirm("注册成功！是否跳转到登录页面？")) {
      window.location.href = "../htmls/login.html";
    }
  }
  // 更新当前编辑的用户 key，并将按钮文字设置为“修改”
  currentUserKey = username;
  submitBtn.value = "修改";
});

// 填充表单数据的函数
function fillFormWithStoredData(userData) {
  usernameInput.value = userData.username;
  passwordInput.value = atob(userData.password);
  
  genderInputs.forEach(radio => {
    if (radio.value === userData.gender) {
      radio.checked = true;
    }
  });

  if (userData.interest) {
    interestCheckbox.checked = true;
    interestGroup.style.display = "block";
    interestSelect.value = userData.interest;
  } else {
    interestCheckbox.checked = false;
    interestGroup.style.display = "none";
  }

  submitBtn.value = "修改";
}
