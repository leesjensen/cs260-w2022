async function pickupPizza() {
  let order = createOrder();

  // Promise
  placeOrder(order)
    .then((order) => makeTaco(order))
    .then((order) => serveOrder(order))
    .catch((order) => orderFailure(order));

  // async/await
  // try {
  //   order = await placeOrder(order);
  //   order = await makeTaco(order);
  //   serveOrder(order);
  // } catch (order) {
  //   orderFailure(order);
  // }
}

function createOrder() {
  const orderElement = document.createElement('li');
  orderElement.innerHTML = '<span>&#128523; <i>Waiting</i> ...</span>';
  const orders = document.getElementById('orders');
  orders.appendChild(orderElement);
  return { element: orderElement };
}

function placeOrder(order) {
  return new Promise((resolve, reject) => {
    doWork(1000, 3000, (orderTime) => {
      order.cashierTime = orderTime;
      if (orderTime < 2800) {
        resolve(order);
      } else {
        order.error = 'too busy';
        reject(order);
      }
    });
  });
}

function makeTaco(order) {
  return new Promise((resolve, reject) => {
    doWork(2000, 5000, (cookTime) => {
      order.cookTime = cookTime;
      if (cookTime < 4600) {
        resolve(order);
      } else {
        order.error = 'burnt pizza';
        reject(order);
      }
    });
  });
}

function doWork(min, max, work) {
  const workTime = Math.random() * (max - min) + min;
  setTimeout(() => {
    work(Math.round(workTime));
  }, workTime);
}

function serveOrder(order) {
  order.element.innerHTML = `
   <span>&#127829; <b>Served</b>!
      cashier: ${Math.floor(order.cashierTime / 1000)}s,
      cook: ${Math.floor(order.cookTime / 1000)}s
   </span>`;
}

function orderFailure(order) {
  order.element.innerHTML = `<span>&#128544; <b class='failure'>Failure</b>! ${order.error}</span>`;
}
