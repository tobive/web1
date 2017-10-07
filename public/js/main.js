var imgClass = ".anim-image";

function createAnimatedImages(animImages) {
  var imgArr = document.querySelectorAll(animImages);
  // imgArr[0].style.opacity = 1;
  for(let i=imgArr.length-1; i>=0; i--) {
    // imgArr[i].classList.toggle('anim-on');
    imgArr[i].style.opacity = 1;
    console.log("put image " + i + " to on." );
    setTimeout(function() {
      // imgArr[i].classList.remove('anim-on');
      imgArr[i].style.opacity = 0;
      console.log("remove anim from image " + i + " .");
    }, (imgArr.length - i) * 3000);
  }
}

createAnimatedImages(imgClass);
setInterval(function() {
  console.log("RUNNING");
  createAnimatedImages(imgClass);
}, 9000);
