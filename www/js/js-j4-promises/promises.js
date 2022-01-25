async function pickupPizza() {
  let order = createOrder();

  // Promise
  //   placeOrder(order).then((order) => {
  //     makeTaco(order).then((order) => {
  //       serveOrder(order);
  //     });
  //   });

  // async/await
  order = await placeOrder(order);
  order = await makeTaco(order);
  serveOrder(order);
}

function createOrder() {
  const orderElement = document.createElement('li');
  orderElement.innerText = '🥺 Waiting ...';
  const orders = document.getElementById('orders');
  orders.appendChild(orderElement);
  return { element: orderElement };
}

function placeOrder(order) {
  return new Promise((resolve) => {
    doWork(1000, 3000, (orderTime) => {
      order.cashierTime = orderTime;
      resolve(order);
    });
  });
}

function makeTaco(order) {
  return new Promise((resolve) => {
    doWork(2000, 5000, (cookTime) => {
      order.cookTime = cookTime;
      resolve(order);
    });
  });
}

function serveOrder(order) {
  order.element.innerText = `🍕 Order up! cashier: ${order.cashierTime}, cook: ${order.cookTime}`;
}

function doWork(min, max, work) {
  const workTime = Math.floor(Math.random() * (max - min) + min);
  setTimeout(() => {
    work(workTime);
  }, workTime);
}
