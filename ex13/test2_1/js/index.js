let currentFood = null; // 存储当前选中的食物对象
// 获取或初始化 localStorage 中的购买记录
let count=1;
localStorage.clear();
$(document).ready(function () {
  // 加载 JSON 数据
  $.getJSON("data/foods.json", function (data) {
    const foodCardsContainer = $("#foodCards");

    // 遍历 JSON 数据并生成卡片
    data.forEach(food => {
      const cardHtml = `
        <div class="col-md-3 mb-4">
          <div class="card h-100">
            <img src="${food.foodImage}" class="card-img-top" alt="${food.foodName}">
            <div class="card-body d-flex flex-column justify-content-between">
              <div>
                <h5 class="card-title">${food.foodName}</h5>
                <p class="card-text">价格: ${food.foodPrice} 元</p>
              </div>
              <button class="btn btn-primary align-self-end" data-toggle="modal" data-target="#foodDetailsModal" data-food='${JSON.stringify(food)}'>详情</button>
            </div>
          </div>
        </div>
      `;
      foodCardsContainer.append(cardHtml);
    });

    // 模态框显示时更新数据
    $('#foodDetailsModal').on('show.bs.modal', function (event) {
      const button = $(event.relatedTarget);
      currentFood = button.data('food');
      $('#modalImage').attr('src', currentFood.foodImage);
      $('#modalDescription').text(currentFood.foodDescription);
      $('#modalPrice').text(`${currentFood.foodPrice} 元`);
      $('#modalStock').text(currentFood.stock);
      $('#info').text("");
    });

    // 购买按钮点击事件
    $('#buyButton').on('click', function () {
      if (!currentFood) return;

      const foodName = currentFood.foodName;
      const price = currentFood.foodPrice;
      const stock = currentFood.stock;

      if (stock <= 0) {
        $('#info').text('该商品已售罄！').css('color','red');
        return;
      }

      // 添加新购买项
      let purchases =[];
      purchases.push({
        name: foodName,
        quantity: 1,
        price: price,
        timestamp: new Date().toLocaleString()
      });

      // 更新 localStorage
      localStorage.setItem(`order${count}`, JSON.stringify(purchases));
      count++;
      // 减少库存
      currentFood.stock -= 1;
      $('#modalStock').text(currentFood.stock);

      $('#info').text('购买成功！').css('color','green');
    });
  }).fail(function () {
    console.error("无法加载食物数据！");
  });
});
async function fetchFoods() {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/foods');
    const data = await response.json();
    foods.value = data.data.map((food, index) => ({
   ...food,
      id: index + 1,
      image: require('@/assets/' + food.foodImage)
    }));
  }catch (error) {
    console.error("无法加载食物数据！",error);
  }
}