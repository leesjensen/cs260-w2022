// Implement Math.min

// Create my own Math library
const MyMath = (function () {
  const min = function (a, b) {
    return a <= b ? a : b;
  };

  return {
    min: min,
  };
})();

function minimum(a, b) {
  const my = MyMath.min(a, b);
  const standard = Math.min(a, b);
  const correct = my === standard ? '😊' : '😞';

  console.log('%s Math: %d, MyMath: %d', correct, standard, my);

  return my;
}
