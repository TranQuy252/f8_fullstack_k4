function getSum(...args) {
  var sum = 0;
  for (let i = 0; i < args.length; i++) {
    if (
      typeof args[i] !== "number" ||
      args[i] === "null" ||
      isNaN(args[i]) ||
      args[i] === Infinity
    ) {
      return "Không hợp lệ";
    }
    sum += args[i];
  }
  return sum;
}

console.log(getSum(0, 2, 3, 4, 5, NaN));

