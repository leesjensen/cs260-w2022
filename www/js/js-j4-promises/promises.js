'use strict';

async function pickupPizza() {
  const order = createOrder();

  // Promise
  // placeOrder(order)
  //   .then((time) => {
  //     order.cashierTime = time;
  //     return makePizza(order);
  //   })
  //   .then((time) => {
  //     order.cookTime = time;
  //     return serveOrder(order);
  //   })
  //   .catch((err) => {
  //     order.error = err;
  //     orderFailure(order);
  //   });

  // async/await
  // try {
  //   order.cashierTime = await placeOrder();
  //   order.cookTime = await makePizza();
  //   serveOrder(order);
  // } catch (err) {
  //   order.error = err;
  //   orderFailure(order);
  // }

  // Consider this alteration
  try {
    const place = placeOrder(order.id, order);
    const make = makePizza(order.id, order);
    order.cashierTime = await place;
    order.cookTime = await make;
    serveOrder(order);
  } catch (err) {
    console.log(`Error order #${order.id}, ${err}`);
    order.error = err;
    orderFailure(order);
  }
}

function createOrder() {
  const id = Math.floor(Math.random() * 10000);
  const orderElement = document.createElement('li');
  orderElement.innerHTML = `<span>&#128523; <i>Waiting</i> [${id}] ...</span>`;
  const orders = document.getElementById('orders');
  orders.appendChild(orderElement);
  return { element: orderElement, id: id };
}

function placeOrder(id, order) {
  return new Promise((resolve, reject) => {
    doWork(1000, 3000, resolve, reject, `cashier too busy ${id} #${order.id}`);
  });
}

function makePizza(id, order) {
  return new Promise((resolve, reject) => {
    doWork(2000, 5000, resolve, reject, `cook burnt pizza ${id} #${order.id}`);
  });
}

function doWork(min, max, resolve, reject, errMsg) {
  let workTime = Math.random() * (max - min) + min;
  setTimeout(() => {
    workTime = Math.round(workTime);
    if (workTime < max * 0.85) {
      resolve(workTime);
    } else {
      reject(errMsg);
    }
  }, workTime);
}

function serveOrder(order) {
  order.element.innerHTML = `
   <span>&#127829; <b>Served</b>!
      [${order.id}] 
      cashier: ${Math.floor(order.cashierTime / 1000)}s,
      cook: ${Math.floor(order.cookTime / 1000)}s
   </span>`;
}

function orderFailure(order) {
  order.element.innerHTML = `<span>&#128544; <b class='failure'>Failure</b>! [${order.id}] ${order.error}</span>`;
}
