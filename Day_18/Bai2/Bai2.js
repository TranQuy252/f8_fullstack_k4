var reverseNumber = (number) => {
    var reversed = 0;
    
    while (number > 0) {
      var lastDigit = number % 10;
      var reversed = reversed * 10 + lastDigit;
      number = Math.floor(number / 10);
    }
    return reversed;
  };
    
  var number = 12345;
  console.log(reverseNumber(number));