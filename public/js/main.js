//-------------------------------------------------
//--- gif-like transition for collection of images
//-------------------------------------------------
var imgClass = ".anim-image";
var imgArr = document.querySelectorAll(imgClass);
var TIME_DELAY = 3000; //time until image changed

function createAnimatedImages(animImages) {
  for(let i=imgArr.length-1; i>=0; i--) {
    imgArr[i].style.opacity = 1;
    console.log("put image " + i + " to on." );
    setTimeout(function() {
      imgArr[i].style.opacity = 0;
      console.log("remove anim from image " + i + " .");
    }, (imgArr.length - i) * TIME_DELAY);
  }
}

createAnimatedImages(imgClass);
setInterval(function() {
  console.log("RUNNING");
  createAnimatedImages(imgClass);
}, (imgArr.length + 1) * TIME_DELAY);

//-------------------------------------------------
//--- put click and animating nav-burger button
//-------------------------------------------------
var burgerButton = document.querySelector(".nav-burger");
var crossLine1 = document.querySelector(".burger-line-1");
var crossLine2 = document.querySelector(".burger-line-2");
var crossLine3 = document.querySelector(".burger-line-3");
var navPage = document.querySelector(".nav-page");

burgerButton.addEventListener('click', function(e) {
  crossLine1.classList.toggle('cross');
  crossLine2.classList.toggle('cross');
  crossLine3.classList.toggle('cross');
  navPage.classList.toggle('show');
  e.stopPropagation();
});
