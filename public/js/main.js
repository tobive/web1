//-------------------------------------------------
//--- gif-like transition for collection of images
//-------------------------------------------------
var imgClass = ".anim-image";
var imgArr = document.querySelectorAll(imgClass);
var TIME_DELAY = 3000; //time until image changed

function createAnimatedImages(animImages) {
  for(let i=imgArr.length-1; i>=0; i--) {
    imgArr[i].style.opacity = 1;
    // console.log("put image " + i + " to on." );
    setTimeout(function() {
      imgArr[i].style.opacity = 0;
      // console.log("remove anim from image " + i + " .");
    }, (imgArr.length - i) * TIME_DELAY);
  }
}

createAnimatedImages(imgClass);
setInterval(function() {
  // console.log("RUNNING");
  createAnimatedImages(imgClass);
}, (imgArr.length + 1) * TIME_DELAY);

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
