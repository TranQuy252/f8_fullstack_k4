var btn = document.querySelectorAll("button");
var status = document.createElement("p");
var cartData = document.getElementById("cart_data");
var table = cartData.querySelector('table')
var index = 0;


// add carts
btn.forEach(function (btn) {
  btn.addEventListener("click", function () {
    var inputValue = btn.parentElement.querySelector("input").value;
    cartData.style.display = "block";
    var nameProduct =
      btn.parentElement.parentElement.querySelector(
        "td:nth-child(2)"
      ).innerText;
    var priceProduct =
      btn.parentElement.parentElement.querySelector(
        "td:nth-child(3)"
      ).innerText;
    var tBody = document.createElement('tbody')
    var deleteProduct = tBody.querySelectorAll('.delete-item')
    index++
    tBody.innerHTML = `<tbody>
    <tr>
        <td>${index}</td>
        <td>${nameProduct}</td>
        <td>${priceProduct}</td>
        <td><input type="number" class="quantity" data-id="1" value="${inputValue}"></td>
        <td>${priceProduct * inputValue}</td>
        <td><button type="button" class="delete-item">Xoá</button></td>
    </tr>
    </tbody>
    `
    table.append(tBody)
    deleteProduct.forEach(function (item) {
      item.addEventListener("click",function () {

      console.log(item);
      })
    })

  });
});