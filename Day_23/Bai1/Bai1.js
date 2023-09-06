function total(str, ...args) {
    for (var value of args) {
      value = +value;
      if (!isNaN(value) && value !== isFinite && typeof value === "number") {
        str += value;
      } else {
        return "Trong mảng có phần tử không hợp lệ";
      }
    }
    return str;
}
  
console.log(total(1, 2, 3, "nam"));

