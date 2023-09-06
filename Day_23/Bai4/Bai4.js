Array.prototype.filter2 = function (callback) {
    var filteredArr = [];
    for (var i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            filtered.push(this[i]);
        }
    }
    return filteredArr;
};
var numbers = [1, 3, 6, 2 , 8];
var evenNumber = numbers.filter2((number) => number % 2 === 0);
console.log(evenNumber);