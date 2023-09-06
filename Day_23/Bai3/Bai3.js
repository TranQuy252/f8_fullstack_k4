var myArr = [1, 2, 3, "q", "u", "y"];
Array.prototype.push2 = function () {
    for (var i = 0; i < arguments.length; i++) {
        this[this.length] = arguments[i];
    }
    return this.length;
};

myArr.push2(4, 5, 6);
console.log(myArr);