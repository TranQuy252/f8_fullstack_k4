var priceLevel1 = 1678, priceLevel2 = 1734, priceLevel3 = 2014, priceLevel4 = 2536, priceLevel5 = 2834, priceLevel6 = 2927, total;

var getTotal = function (n) {
    console.log(`Số điện tiêu thụ là: ${n} kwh`);
    if (n < 0){
        console.log(`Số điện tiêu thụ không hợp lệ`);
    } else if (n > 0 && n < 51){
        total = n * priceLevel1;
    } else if (n >= 51 && n < 101) {
        total = n * priceLevel2;
    } else if (n >= 101 && n < 201) {
        total = n * priceLevel3;
    } else if (n >= 201 && n < 301) {
        total = n * priceLevel4;
    } else if (n >= 301 && n < 401) {
        total = n * priceLevel5;
    } else {
        total = n * priceLevel6;
    }
    console.log(`Số tiền phải trả là ${total}`);
}
getTotal(10);