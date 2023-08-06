var a = 3;
var b = 1;
var c = 4;
var max;

if (a > b) {
    max = a;
    a = b;
    b = max;
}
if (a > c) {
    max = a;
    a = c;
    c = max;
}
if (b > c) {
    max = b;
    b = c;
    c = max;
}

console.log(`Kết quả: a = ${a}, b = ${b}, c = ${c}`);