Object.prototype.getCurrency = function (currency) {
  var value = +this;
  if (isNaN(value) || value === Infinity) {
    return "Dữ liệu không hợp lệ";
  }
  var fixValue = value.toLocaleString("en-US");
  return fixValue + " " + currency;
};

var price = 12000;
console.log(price.getCurrency("đ"));

var price = "12000000";
console.log(price.getCurrency("đ"));