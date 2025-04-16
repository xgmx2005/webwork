$(document).ready(function() {
  // 获取表单及各控件的 jQuery 对象
  var $regForm = $('#regForm');
  var $usernameInput = $('#username');
  var $passwordInput = $('#password');
  var $genderInputs = $('input[name="gender"]');
  var $interestCheckbox = $('#interestCheckbox');
  var $interestGroup = $('#interestGroup');
  var $interestSelect = $('#interestSelect');
  var $submitBtn = $('#submitBtn');

  // 当前用户 key，记录正在编辑的用户名
  var currentUserKey = "";

  // 通过 Ajax 动态加载兴趣选项，文件路径为 data/interest.json
  $.ajax({
    url: '../data/interest.json',  // 注意此路径根据你的文件结构调整
    dataType: 'json',
    success: function(data) {
      if (data.interests && $.isArray(data.interests)) {
        $.each(data.interests, function(index, option) {
          var $option = $('<option></option>')
            .attr('value', option.value)
            .text(option.text);
          $interestSelect.append($option);
        });
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.error("无法加载兴趣选项: " + textStatus, errorThrown);
    }
  });

  // 复选框控制兴趣下拉菜单显示/隐藏
  $interestCheckbox.on('change', function() {
    if ($(this).is(':checked')) {
      $interestGroup.show();
    } else {
      $interestGroup.hide();
    }
  });

  // 页面加载时，如果用户名输入框有默认值，则尝试从 localStorage 填充数据
  if ($.trim($usernameInput.val())) {
    var storedUser = localStorage.getItem($.trim($usernameInput.val()));
    if (storedUser) {
      currentUserKey = $.trim($usernameInput.val());
      fillFormWithStoredData(JSON.parse(storedUser));
    }
  }

  // 监听用户名输入变化：若当前用户存在且输入为空，则删除该用户注册信息
  $usernameInput.on('input', function() {
    var username = $.trim($(this).val());
    if (username === "" && currentUserKey !== "") {
      localStorage.removeItem(currentUserKey);
      alert("用户名为空，已删除该用户注册信息");
      currentUserKey = "";
      $submitBtn.val("注册");
      // 同时清除当前登录状态
      localStorage.removeItem("currentUser");
    }
  });

  // 表单提交处理
  $regForm.on('submit', function(e) {
    e.preventDefault();

    var username = $.trim($usernameInput.val());
    var password = $passwordInput.val();

    if (username === "" || password === "") {
      alert("用户名和密码不能为空！");
      return;
    }

    // 获取选中的性别
    var gender = 'male';
    $genderInputs.each(function() {
      if ($(this).is(':checked')) {
        gender = $(this).val();
      }
    });

    // 获取兴趣值（如果勾选了兴趣）
    var interest = $interestCheckbox.is(':checked') ? $interestSelect.val() : "";

    var userData = {
      username: username,
      password: btoa(password), // Base64 加密（仅作示例，生产中请用更安全的方案）
      gender: gender,
      interest: interest,
      updatedAt: new Date().toISOString()
    };

    // 判断操作：如果 localStorage 中已存在该用户则为修改，否则为注册
    if (localStorage.getItem(username)) {
      localStorage.setItem(username, JSON.stringify(userData));
      alert("修改成功！");
    } else {
      localStorage.setItem(username, JSON.stringify(userData));
      // 同时保存当前登录用户标识
      localStorage.setItem("currentUser", username);
      alert("注册成功！");
      if (confirm("是否跳转到登录页面？")) {
        window.location.href = "../htmls/login.html";
      }
    }

    // 更新当前编辑用户 key 和按钮文本
    currentUserKey = username;
    $submitBtn.val("修改");
    localStorage.setItem("currentUser", username);
  });

  // 填充表单数据函数
  function fillFormWithStoredData(userData) {
    $usernameInput.val(userData.username);
    $passwordInput.val(atob(userData.password));
    $genderInputs.each(function() {
      if ($(this).val() === userData.gender) {
        $(this).prop('checked', true);
      }
    });
    if (userData.interest) {
      $interestCheckbox.prop('checked', true);
      $interestGroup.show();
      $interestSelect.val(userData.interest);
    } else {
      $interestCheckbox.prop('checked', false);
      $interestGroup.hide();
    }
    $submitBtn.val("修改");
  }
});
