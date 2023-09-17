var carousel = document.querySelector(".carousel");
var carouselInner = document.querySelector(".carousel-inner");
var carouselNav = document.querySelector(".carousel-nav");
var prevBtn = document.querySelector(".prev");
var nextBtn = document.querySelector(".next");
var items = document.querySelectorAll(".item")
var dots =document.querySelector('.dots')


// Lấy danh sách 1 item
var carouselItems = carouselInner.children;

// Tính chiều rộng của 1 item
var itemWidth = carouselInner.clientWidth; //trả về chiều rộng của element


// tính tổng các kích thước item
var totalWidth = itemWidth * carouselItems.length;


// cập nhật CSS cho carousel-inner
carouselInner.style.width = `${totalWidth}px`;



var pagination = Array.from(carouselItems).map((item,index) => (
  `<span class="${index === 0 ? "active" : ""}" data-index="${index}"></span>`
)).join("")

dots.innerHTML = pagination
  var dot = dots.querySelectorAll('span')

  
dot.forEach(function (dott, index) {
  dott.addEventListener('click',function(){
    position = itemWidth * -index;
    carouselInner.style.translate = `${position}px`;
    this.classList.add('active')
    
  })
});

var position = 0;
var index = 0;

function nextSlide () {

}
function prevSlide () {

}

nextBtn.addEventListener("click", function () {
  if (Math.abs(position) < totalWidth - itemWidth) {
   
    // tính toán toạ độ
    position -= itemWidth;

    // cập nhật Css carousel-inner chuyển slide
    carouselInner.style.translate = `${position}px`;
  }

    
});

prevBtn.addEventListener("click", function () {
    if (position < 0) {
      
      // tính toán toạ độ
      position += itemWidth;

      // cập nhật Css carousel-inner chuyển slide
      carouselInner.style.translate = `${position}px`;
    }
  });

var flag = false;
var pageXStart = 0;
var pageXMove = 0;
var distance = 0;
carouselInner.addEventListener("mousedown", function (e) {
  e.preventDefault();
  flag = true;
  pageXStart = e.pageX;
});
  carouselInner.addEventListener('mousemove',function(e){
    e.preventDefault();

    if (flag) {
      carouselInner.style.cursor = `move`;
      pageXMove = e.pageX;
      distance = pageXStart - pageXMove;

      if (distance > 150) {
// next page(function)
        nextSlide()
      } else if (distance > 0) {
        carouselInner.style.translate = `${position - distance}px`;
      }

      if (distance < -150) {
// back page(function)
        prevSlide()
      } else if (distance < 0) {
        carouselInner.style.translate = `${position - distance}px`;
      }
    }
  })
  document.addEventListener('mouseup',function(e){
    flag =false
    carouselInner.style.cursor = `default`;
    carouselInner.style.transition = `translate 0.20s linear`;
    carouselInner.style.translate = `${position}px`;
  })