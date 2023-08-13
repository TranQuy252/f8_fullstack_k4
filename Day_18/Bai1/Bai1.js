var fibonaci = (n) => {
   if (n === 0 || n === 1) {
     {
      return n;
    }
  }
  return fibonaci(n - 1) + fibonaci(n - 2);
};
    
console.log("danh sách 10 số fibonaci");
var number = 10;
    
var stringListFibonaci = "";
for (var i = 0; i < number; i++) {
  stringListFibonaci += fibonaci(i).toString();
  if (i < number - 1) {
    stringListFibonaci += ", ";
  }
}
console.log(stringListFibonaci);