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
  orderElement.innerHTML = '<span>&#128523; <i>Waiting</i> ...</span>';
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
  order.element.innerHTML = `<span>&#127829; <b>Served</b>! cashier: ${order.cashierTime}, cook: ${order.cookTime}</span>`;
}

function doWork(min, max, work) {
  const workTime = Math.floor(Math.random() * (max - min) + min);
  setTimeout(() => {
    work(`${Math.round(workTime / 1000)}s`);
  }, workTime);
}
