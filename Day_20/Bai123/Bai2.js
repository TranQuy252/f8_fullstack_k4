var arr = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]];
function convertToSingleDimensionalArray(arr) {
    for (var i = 0; i < arr.length; i++) {
        while (Array.isArray(arr[i])) {
            if (Array.isArray(arr[i])) {
                arr.splice(i, 1, ...arr[i]);
            }
        }
    }

    return arr;
}
console.log(convertToSingleDimensionalArray(arr));