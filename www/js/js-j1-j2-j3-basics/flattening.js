//Use the reduce method in combination with the concat method to “flatten”
// an array of arrays into a single array that has all the elements of the
// original arrays.

function flatten(arrayOfArrays) {
  return arrayOfArrays.reduce((c, array) => c.concat(array));
}
