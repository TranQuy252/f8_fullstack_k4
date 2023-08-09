var sum = function (n) {
    if (n === 1){
        return 2;
    }
    return n * (n + 1) + sum(n-1);
} 
console.log(sum(3));