'use strict';
// noDeclartion = 3;
// var undefined = 3;
// function bad(a, a, b) {}
// 'x'.name = 'rat';

function equality() {
  // loose equality, does type conversion
  1 == '1'; // true
  1 != '2'; // true

  // strict equality, doesn't do type conversion
  1 === '1'; // false
  1 !== '2'; // false

  // all true for loose, all false for strict
  0 == false;
  '' == false;
  '' == 0;
  '0' == 0;
  '17' == 17;
  [1, 2] == '1,2';
  null == undefined;

  // Always use strict. truthy and falsy (0, '', NaN, null, undefined)
  null == undefined; // true
  null != undefined; // false
  null === undefined; // false
  null !== undefined; // true

  // Logical OR uses falsy
  log.console(null || 3);

  // Nullish - Null or undefined
  // Nullish coalescing operator
  log.console(null ?? 3);
  log.console(0 ?? 3);

  return 'end';
}

let g = 1000;
function variables() {
  var x = 1; // deprecated
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

  return 'end';
}

function weaklyTyped() {
  let x = 'fish';
  console.log('type changed: ', typeof x, x);
  x = 1;
  console.log('type changed: ', typeof x, x);
  x = [1, 2];
  console.log('type changed: ', typeof x, x);
  x = null;
  console.log('type changed: ', typeof x, x);
  x = undefined;
  console.log('type changed: ', typeof x, x);

  console.log('rat' + [' fink']);
  console.log(1 + 'rat');
  console.log(1 * 'rat');

  return 'end';
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

  return 'end';
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

  // optional parameters
  f = function (a, b, c = 'rat') {
    return [a, b, c];
  };
  console.log(f(1));

  return 'end';
}

// single line with implicit return, inherits this binding
function arrowFunctions() {
  const arrow = () => 1;

  const arrowWithBlock = (a) => {
    a;
  };

  const arrowWithReturn = (a) => {
    return a;
  };

  console.log(arrow(), arrowWithBlock(2), arrowWithReturn(3));

  return 'end';
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

  const duplicate4 = dup(4);
  console.log(duplicate4('hello'));

  console.log(dup(3)('again'));

  return 'end';
}

function strings() {
  const s = 'Cats Dogs Rats Mice';

  console.log('casefold: ', s.toUpperCase(), s.toLowerCase());
  console.log('split: ', s.split(' '));
  console.log('endsWith: ', s.endsWith('Mice'));
  console.log('repalce: ', s.replace('Dogs', 'Puppies'));
  console.log('replace regex: ', s.replace(/(dogs|cats)/gi, 'Puppies!'));
  console.log('slice: ', s.slice(3, 7));

  return 'end';
}

function arrays() {
  let numbers = [];
  for (let i = 1; i < 11; i++) {
    numbers.push(i);
  }
  console.log('push 10: ', numbers);
  console.log('pop: ', numbers.pop());

  console.log('numbers[1]:', numbers[1]);
  console.log('slice:', numbers.slice(2, 5));
  console.log('length:', numbers.length);

  for (let entry of numbers) {
    console.log(entry);
    if (entry == 3) break;
  }

  return 'end';
}

function arrayOperations() {
  let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  console.log(
    'map',
    numbers.map((n) => n * 100)
  );
  console.log(
    'reduce',
    numbers.reduce((p, c) => p + c)
  );
  console.log(
    'filter',
    numbers.filter((n) => n % 2)
  );
  console.log(
    'some',
    numbers.some((n) => n > 5)
  );

  return 'end';
}

function templateLiterals() {
  let name = 'amigo';
  let hello = (n) => 'hola ' + n;

  console.log(`Javascript ${'inline'}! ${hello(name)}`);
}

function optionalChain() {
  const x = {
    y: () => 3,
  };

  console.log(x.y?.());
  console.log(x.r?.());
  console.log(x.r());
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
  obj.print = function () {
    return `${this.animal} live in ${this.location.cities.join(' and ')}`;
  };

  console.log(obj);
  console.log(obj.animal);
  console.log(obj.print());

  return 'end';
}

function spread() {
  // spread
  let input = [1, 2, 3];
  input = [...input, 4, 5, 6];
  console.log(input);

  // rest (variadic)
  const sumAndMultiply = (multiplier, ...numbers) => {
    console.log(numbers);
    return numbers.reduce((a, n) => a + multiplier * n);
  };

  console.log(sumAndMultiply(10, ...input, 7, 8));

  return 'end';
}

function objectArrayOperations() {
  let beaches = [
    { name: 'Sunset', shore: 'north' },
    { name: 'Kailua', shore: 'east' },
    { name: 'Makua', shore: 'west' },
    { name: 'Lanikai', shore: 'east' },
    { name: 'Hukilau', shore: 'east' },
  ];

  for (let beach of beaches) {
    console.log(beach);
    if (beach.shore == 'west') break;
  }

  console.log(
    'map',
    beaches.map((n) => ({ ...n, island: 'Oahu' }))
  );
  console.log(
    'reduce',
    beaches.reduce((totals, p) => ({ ...totals, [p.shore]: (totals[p.shore] || 0) + 1 }), {})
  );
  console.log(
    'filter',
    beaches.filter((n) => n.shore == 'east')
  );
  console.log(
    'sort',
    beaches.sort((a, b) => (a.name > b.name ? 1 : -1))
  );

  return 'end';
}

function iteratorsAndGenerators() {
  // generator
  function* numbersMaker(start, end) {
    for (let i = start; i < end; i++) {
      yield { number: i };
    }
  }

  // iterator
  for (let num of numbersMaker(3, 6)) {
    console.log(num);
  }

  return 'end';
}

function destructuringArrays() {
  let x, y, z;

  const a = [1, 2];
  x = a;
  console.log(x);

  [x] = a;
  console.log(x);

  [x, y] = a;
  console.log(x, y);

  [x, y, z] = a;
  console.log(x, y, z);

  [x, y, z = 100] = a;
  console.log(x, y, z);

  [x, , y, ...z] = [1, 2, 3, 4, 5, 6, 7];
  console.log(x, y, z);

  return 'end';
}

function destructuringParameters() {
  // Destructured array param
  function af([a = 3, b = 'taco'] = []) {
    console.log(a, b);
  }
  af();
  af([20]);

  // Destructured object param
  function of({ a = 3, b = { animal: 'rat' } } = {}) {
    console.log(`a: ${a} b: ${b.animal}`);
  }
  of({ a: 10 });
  of({ b: { animal: 'dog' } });

  return 'end';
}

function destructuringReturns() {
  function af({ a = 3, b = 'rat' } = {}) {
    return [a, b, 'cat'];
  }

  const [x, y, z] = af({ a: 10 });
  console.log('array return: ', x, y, z);

  function of({ a = 3, b = 'rat' } = {}) {
    return { a, b, animal: b + ' cat' };
  }

  const { a, animal, ...rest } = of({ a: 10 });
  console.log('object return: ', a, animal, rest);

  return 'end';
}

function math() {
  console.log('max: ', Math.max(3, Math.PI));
  console.log('random: ', Math.random());
  console.log('floor: ', Math.floor(3.999));

  return 'end';
}

function json() {
  const obj = {
    name: 'tina',
    alive: true,
    print: () => `${this.name} is ${this.alive}`,
  };

  console.log('object: ', obj);

  const objText = JSON.stringify(obj);
  console.log('json: ', objText);
  console.log('rehydrate: ', JSON.parse(objText));

  return 'end';
}

function classes() {
  class Location {
    static defaultPlace = 'east';

    constructor(location) {
      this.location = location || Location.defaultPlace;
    }
  }
  class Beach extends Location {
    constructor(name, location, weather = 'sunny') {
      super(location);
      this.name = name;
      this._weather = weather;
    }

    get weather() {
      return this._weather;
    }

    set weather(weather) {
      this._weather = weather;
    }
  }

  const beaches = [new Beach('Sunset', 'north', 'rainy'), new Beach('Kailua')];
  for (let beach of beaches) {
    console.log(`${beach.weather} weather at ${beach.name} beach on the ${beach.location} shore`);
  }

  return 'end';
}

// Interact with the DOM
function wo(msg) {
  const output = document.getElementById('output');
  output.innerText = msg;
}
