function everything(a, fn) {
  let anyBad = false;
  a.forEach((item) => {
    anyBad = anyBad || !fn(item);
  });
  return !anyBad;
}

function everythingSome(a, fn) {
  return !a.some((n) => !fn(n));
}
