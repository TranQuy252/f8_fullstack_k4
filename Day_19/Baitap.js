// bài 1

var numbers = [1,0, 4 , 4 ,22, 14] ;

var max = numbers[0]
var min = numbers[0]
for (var i = 0 ; i <= numbers.length ; i++) {
    if (numbers[i] > max) {
     max =numbers[i] ;
     var index = i ;
    }

    if(numbers[i] < min ) {
        min = numbers[i] ;
     var indexMin = i ;

    }

}

console.log(`${max} là số lớn nhất ở vị trí thứ ${index}`);

console.log(`${min} là số bé nhất ở vị trí thứ ${indexMin}`);


// bài 2

var myArray = [0, 1 , 3, 8] ;
var sum = 0
var count = 0


for (var i = 0 ; i <= myArray.length ; i++) {
    var result = true ;

  if (myArray[i] >= 2) {
      for (var j =2 ; j < myArray[i] ; j++) {
         if (myArray[i] % j === 0) {
             result = false ;
        }              
    }
    if (result) {
        count ++
        sum += myArray[i] ;      
                } 
}

}

if ( sum !== 0)
console.log(`trung bình các số nguyên tố là ${sum} / ${count}`) ;

else console.log(` không có số nguyên tố`);


// bài 3 

var c = [1, 3, 3, 4, 7, 7, 6, 5];

var newArr = [];

for (var i = 0; i < c.length; i++) {
  if (newArr.indexOf(c[i]) === -1) {
    newArr.push(c[i]);
  }
}
console.log(newArr);


// bài 4 

var myNumbers = [5, 1, 9, 8, 10]; 

var element = 4 ;

var ascending = myNumbers.sort(function(a , b){
    if (b > a) {
        return -1
    }
}) 

for (var i = 0 ; i <= ascending.length ; i++) {
    if (element < ascending[i]) {
        ascending.splice(i,0,element)
        break ;
        
    }
}

console.log(ascending);