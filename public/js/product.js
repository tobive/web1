var productList = document.querySelectorAll('.product-list');

for(let i=0; i<productList.length; i++) {
  let list = productList[i].querySelector('.product-title');
  productList[i].addEventListener('click', function(e) {
    [].forEach.call(document.querySelectorAll('.product-title'), function(item) {
      item.style.display = 'none';
    })
    list.style.display = "block";
    e.stopPropagation();
  });
}
