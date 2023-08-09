var sum = function(n) {
    
    if (n===1) {
        return 1;
    }
    return sum(n-1) + 1 / n; 
}
console.log(sum(16));