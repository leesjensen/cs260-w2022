function hello() {
  return 'hello';
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

function weaklyTyped() {
  let x = 'fish';
  x = 1;
  x = [1, 2];
  console.log(x);

  console.log(['rat' + ' fink']);
  console.log(1 + 'rat');
  console.log(1 * 'rat');
}

function statements() {
  if (true) {
    console.log('true');
  }

  for (let i = 1; i < 3; i++) {
    console.log(`for ${i}`);
  }

  while (true) {
    console.log('while');
    break;
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

function object() {
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

  obj.print = function () {
    return `${this.animal} from ${this.location.origin}`;
  };
  console.log(obj.print());

  f = (x) => `${this.location.origin} and ${x.location.origin}`;
  console.log(f(obj));
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
