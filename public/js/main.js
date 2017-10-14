//-------------------------------------------------
//--- gif-like transition for collection of images
//-------------------------------------------------
var imgClass1 = ".anim-image";
var imgArr1 = document.querySelectorAll(imgClass1);
var TIME_DELAY1 = 4000; //time until image changed

function createAnimatedImages(animImages, timeDelay) {
  for(let i=animImages.length-1; i>=0; i--) {
    animImages[i].style.opacity = 1;
    // console.log("put image " + i + " to on." );
    setTimeout(function() {
      animImages[i].style.opacity = 0;
      // console.log("remove anim from image " + i + " .");
    }, (animImages.length - i) * timeDelay);
  }
}

createAnimatedImages(imgArr1, TIME_DELAY1);
setInterval(function() {
  // console.log("RUNNING");
  createAnimatedImages(imgArr1, TIME_DELAY1);
}, (imgArr1.length + 1) * TIME_DELAY1);

//Product Image Animation
var imgClass2 = ".product-image";
var imgArr2 = document.querySelectorAll(imgClass2);
var TIME_DELAY2 = 3000; //time until image changed

createAnimatedImages(imgArr2, TIME_DELAY2);
setInterval(function() {
  // console.log("RUNNING");
  createAnimatedImages(imgArr2, TIME_DELAY2);
}, (imgArr2.length + 1) * TIME_DELAY2);

//-------------------------------------------------
//--- click and animation for nav-burger button
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

//-------------------------------------------------
//--- load JSON content for drop-down-form
//-------------------------------------------------
var DATA_LOC = "data.json"; // location of json file to be loaded
var DOC_LOC = "/documents/"; // path location of documents

function loadJSON(fileLocation, callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', fileLocation, true);
  xobj.onreadystatechange = function() {
    if(xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  }
  xobj.send(null);
}

function populateDropDown(response) {
  var data = JSON.parse(response);
  var dropDownYear = document.querySelector("#analysis-year");
  var dropDownDate = document.querySelector("#analysis-date");
  var downloadButton = document.querySelector("#download-analysis");

//populate dropdown for year
  for(let i=0; i<data.data.length; i++) {
    let optYear = document.createElement('option');
    optYear.id = data.data[i].year;
    optYear.value = i;
    optYear.appendChild(document.createTextNode(optYear.id));
    dropDownYear.appendChild(optYear);
  }

  //populate dropdown for date
  for(let j=0; j<data.data[0].list.length; j++) {
    let optDate = document.createElement('option');
    optDate.id = data.data[0].list[j].date;
    optDate.value = j;
    optDate.appendChild(document.createTextNode(optDate.id));
    dropDownDate.appendChild(optDate);
  }

  //attach event handler to options in year-dropdown
  dropDownYear.addEventListener('click', function(e) {
    dropDownDate.innerHTML = ""; //clear all child node of date-Select element
    let arrIndex = dropDownYear.options[dropDownYear.selectedIndex].value;
    for(let j=0; j<data.data[arrIndex].list.length; j++) {
      let optDate = document.createElement('option');
      optDate.id = data.data[arrIndex].list[j].date;
      optDate.value = j;
      optDate.appendChild(document.createTextNode(optDate.id));
      dropDownDate.appendChild(optDate);
    }
    e.stopPropagation();
  });

  //attach event handler to download document button
  downloadButton.addEventListener('click', function(e) {
    let yearIndex = dropDownYear.options[dropDownYear.selectedIndex].value;
    let dateIndex = dropDownDate.options[dropDownDate.selectedIndex].value;
    let fileName = data.data[yearIndex].list[dateIndex].filename;
    window.open(DOC_LOC + fileName, '_blank');
    e.stopPropagation();
  });
}

loadJSON(DATA_LOC, populateDropDown);

//-------------------------------------------------
//--- Calculate Year
//-------------------------------------------------
var yearSpan = document.querySelector('#year-span');
var year = new Date();
var BORN = 1989 + 3;//Heisei year 3

yearSpan.innerHTML = year.getFullYear() - BORN;
