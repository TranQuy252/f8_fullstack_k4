var arr = [
    ["a", 1, true],
    ["b", 2, false],
  ];
  var result = [];
  for (var i = 0; i < arr[0].length; i++) {
    var tempArray = [];
    for (var j = 0; j < arr.length; j++) {
      tempArray.push(arr[j][i]);
    }
    result.push(tempArray);
  }
  console.log(result)