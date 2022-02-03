// Write a list

const MyList = (function () {
  const arrayToList = function (array) {
    const [firstValue, ...rest] = array;
    if (firstValue) {
      return { value: firstValue, rest: arrayToList(rest) };
    }
    return null;
  };

  const listToArray = function (list) {
    if (list) {
      return [list.value, ...listToArray(list.rest)];
    }
    return [];
  };

  const prepend = function (item, list) {
    return { value: item, rest: list };
  };

  const nth = function (pos, list) {
    if (!!list) {
      if (pos > 0) {
        return nth(pos - 1, list.rest);
      }
      return list.value;
    }
    return undefined;
  };

  class List {
    constructor(array) {
      this.root = arrayToList(array);
    }

    insertFirst(item) {
      return prepend(item, this.root);
    }

    itemAt(pos) {
      return nth(pos, this.root);
    }

    get list() {
      return listToArray(this.root);
    }
  }

  return {
    List: List,
    arrayToList: arrayToList,
    listToArray: listToArray,
    prepend: prepend,
    nth: nth,
  };
})();
