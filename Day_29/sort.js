var list = document.querySelector(".list");
var listItem = list.querySelectorAll(".list-item");
listItem.forEach(function (item) {
  var span = document.querySelector("span");
  item.addEventListener("dragover", function (e) {
    e.preventDefault();
    this.appendChild(span);
  });
  item.addEventListener("drop", function (e) {
    this.appendChild(span);
  });
});