async function pickupPizza() {
  let order = createOrder();

  // Promise
  placeOrder(order)
    .then((time) => {
      order.cashierTime = time;
      return makePizza(order);
    })
    .then((time) => {
      order.cookTime = time;
      return serveOrder(order);
    })
    .catch((err) => {
      order.error = err;
      orderFailure(order);
    });

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
  // try {
  //   place = placeOrder();
  //   make = makePizza();
  //   order.cashierTime = await place;
  //   order.cookTime = await make;
  //   serveOrder(order);
  // } catch (err) {
  //   order.error = err;
  //   orderFailure(order);
  // }
}

function createOrder() {
  const id = Math.floor(Math.random() * 10000);
  const orderElement = document.createElement('li');
  orderElement.innerHTML = `<span>&#128523; <i>Waiting</i> ${id} ...</span>`;
  const orders = document.getElementById('orders');
  orders.appendChild(orderElement);
  return { element: orderElement, id: id };
}

function placeOrder() {
  return new Promise((resolve, reject) => {
    doWork(1000, 3000, resolve, reject, 'too busy');
  });
}

function makePizza() {
  return new Promise((resolve, reject) => {
    doWork(2000, 5000, resolve, reject, 'burnt pizza');
  });
}

function doWork(min, max, resolve, reject, errMsg) {
  let workTime = Math.random() * (max - min) + min;
  setTimeout(() => {
    workTime = Math.round(workTime);
    if (workTime < max * 0.85) {
      resolve(workTime);
    } else {
      reject(errMsg + ' worktime: ' + workTime + ' > ' + max * 0.85);
    }
  }, workTime);
}

function serveOrder(order) {
  order.element.innerHTML = `
   <span>&#127829; <b>Served</b>!
      cashier: ${Math.floor(order.cashierTime / 1000)}s,
      cook: ${Math.floor(order.cookTime / 1000)}s,
      id: ${order.id}
   </span>`;
}

function orderFailure(order) {
  order.element.innerHTML = `<span>&#128544; <b class='failure'>Failure</b>! ${order.error} ${order.id}</span>`;
}
