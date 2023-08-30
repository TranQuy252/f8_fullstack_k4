Array.prototype.reduce2 = function (prev, current) {
    if (typeof prev !== "function") {
        return "prev phải là một hàm";
    }
  var result = initialValue !== undefined ? initialValue : this[0];

  for (let i = initialValue !== undefined ? 0 : 1; i < this.length; i++) {
    result = callback(result, this[i], i, this);
  }

  return result;
};
var test = [1, 2, 3, 4, 5];
console.log(test.reduce2(function (prev, current) {
    console.log(prev, current);
    return prev + current 
}));