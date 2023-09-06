//Case 1
var price = 12000;

// //Case 2
// var price = "12000000";

Number.prototype.getCurrency = function (input) {
  return (
    this.toLocaleString("vi-VN", { style: "currency", currency: "VND" }) +
    ` ${input}`
  );
};
console.log(price.getCurrency(""));
