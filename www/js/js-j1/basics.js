'use strict';
//noDeclartion = 3;
//var undefined = 3;
//function bad(a, a, b) {}
//'x'.name = 'rat';

function hello(msg) {
  const output = document.getElementById('output');
  output.innerText = msg;
}

function equality() {
  1 + 1;
  1 == 1;
  1 != 2;

  // all true
  false == 0;
  0 == '';
  null == undefined;
  [] == false;
  !![0] == true;

  // all false
  false == null;
  NaN == NaN;
  Infinity == true;
  [] == true;
  [0] == true;

  /* truthy and falsy */
  1 === 2;
  1 !== 1;
}

let g = 0;
function variables() {
  var x = 1;
  let y = 1;
  const z = 'tacos';

  console.log(g, x, y, z);

  // This is why 'var' is deprecated
  {
    var x = 2; // same variable!
    var g = 2;
    console.log(x, g); // 2, 2
  }
  console.log(x, g); // 2, 2

  {
    let y = 2; // different variable
    console.log(y); // 2
  }
  console.log(y); // 1
}

function weaklyTyped() {
  let x = 'fish';
  x = 1;
  x = [1, 2];
  console.log(x);

  console.log(['rat' + ' fink']);
  console.log(1 + 'rat');
  console.log(1 * 'rat');
}

function conditionals() {
  if (true) {
    console.log('true');
  }

  if ((!false && false) || (true && !false)) {
    console.log('true');
  }

  for (let i = 1; i < 3; i++) {
    console.log(`for ${i}`);
  }

  while (true) {
    console.log('while');
    break;
  }

  const pet = 'fish';
  switch (pet) {
    case 'fish':
      console.log('fish');
      break; // What happens if you remove this?
    case 'dog':
      console.log('dog');
      break;
    default:
      console.log('no pet. Buy one: statements("dog")');
  }
}

function arrays() {
  let numbers = [];
  for (let i = 1; i < 11; i++) {
    numbers.push(i);
  }
  console.log('push 10', numbers);
  console.log('pop', numbers.pop());

  console.log('numbers[1]', numbers[1]);
  console.log('slice', numbers.slice(2, 5));
  console.log('length', numbers.length);
}

function objects() {
  let obj = {
    animal: 'fish',
  };

  obj.count = 3;
  obj.location = {
    cities: ['utah', 'new york'],
    origin: 'ocean',
  };

  console.log(obj);
  console.log(obj.animal);
}

function arrayOperations() {
  let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  console.log(
    'map',
    numbers.map((n) => n * 100)
  );
  console.log(
    'reduce',
    numbers.reduce((p, c, i, a) => p + c)
  );
  console.log(
    'filter',
    numbers.filter((n) => n % 2)
  );

  return numbers;
}

// WORK ON THIS
function objectOperations() {
  let animal = {
    name: 'dog',
    count: 3,
  };

  console.log(
    'map',
    numbers.map((n) => n * 100)
  );
  console.log(
    'reduce',
    numbers.reduce((p, c, i, a) => p + c)
  );
  console.log(
    'filter',
    numbers.filter((n) => n % 2)
  );

  return numbers;
}

function functions() {
  // parameters and return value
  let f = function (i) {
    return i;
  };
  console.log(f(3));

  f = function (i) {
    i;
  };
  console.log(f());

  // arrow
  f = () => 1;
  console.log(f());

  // optional parameters
  f = (a, b, c = 'rat') => console.log(a, b, c);
  console.log(f(1));
}

function closures() {
  function dup(i, sep = ':') {
    let dupLimit = i;
    return (t) => {
      let dupCount = dupLimit;
      let out = t;
      while (dupCount-- > 1) {
        out += sep + t;
      }
      return out;
    };
  }

  console.log(dup(4)('hello'));
  console.log(dup(3)('again'));
}

function spread() {
  // rest (vaiadic)
  const sum = (...numbers) => {
    return numbers.reduce((a, n) => a + n);
  };

  // spread
  console.log(sum(...[1, 2, 3], 100));
}

function destructuringArrays() {
  let x, y, z;

  const a = [1, 2];
  [x] = a;
  console.log(x);

  [x, y] = a;
  console.log(x, y);

  [x, y, z] = a;
  console.log(x, y, z);

  [x, y, z = 100] = a;
  console.log(x, y, z);
}

function destructuringParameters() {
  function f({ a = 3, b = { animal: 'rat' } } = {}) {
    console.log(`${a} ${b.animal}`);
  }

  f({ a: 10 });

  function af([a = 3, b = 'rat'] = []) {
    console.log(a, b);
  }

  af([20, 'dog']);
}

function destructuringReturns() {
  function f({ a = 3, b = 'rat' } = {}) {
    return [a, b, 'cat'];
  }

  const [x, y, z] = f({ a: 10 });
  console.log(x, y, z);
}
