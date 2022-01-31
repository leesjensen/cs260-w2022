function everything(a, fn) {
  var anyBad = false;
  a.forEach((item) => {
    anyBad = anyBad || !fn(item);
  });
  return !anyBad;
}

function everythingSome(a, fn) {
  return !a.some((n) => !fn(n));
}
