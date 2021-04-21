"use strict";
//DARKMODE
var bouttonDark = document.querySelector(".darkmode");
var bodyIndex = document.querySelector(".bodyIndex");
var bodyOther = document.querySelector(".bodyOther");

if(bodyIndex || bodyOther){
  var activeMode = localStorage.getItem("data-mode");
  if (activeMode == "dark") {
    document.body.setAttribute("data-mode", "dark");
  }
  bouttonDark.addEventListener("click", function (e) {
    if (document.body.getAttribute("data-mode", "dark")) {
      localStorage.setItem("data-mode", "light");
      document.body.removeAttribute("data-mode", "");
    }else{
      document.body.setAttribute("data-mode", "dark");
      localStorage.setItem("data-mode", "dark");
    }
  });
}

//Accueil MVP
var formActivity = document.querySelector(".filtre-activites");
var formLenght = document.querySelector(".filtre-distances");
let filterTriggers = document.querySelectorAll(".filter-trigger");
let dataDistance = sessionStorage.getItem("data-lenght");
let dataActivite = sessionStorage.getItem("data-play");
let vignettes = document.querySelectorAll(".vignette--liste");
var formActivity = document.querySelector(".filtre-activites");
var formLenght = document.querySelector(".filtre-distances");

// Gestion de l'affichage des formulaires en fonction du sessionStorage
if(formActivity && formLenght){
  if(dataDistance){
    formActivity.classList.remove("hidden");
    formLenght.classList.add("hidden");
  }else if(dataActivite){
    formActivity.classList.add("hidden");
    formLenght.classList.remove("hidden");
  }
}
if(filterTriggers.length > 0){
  for(let filterTrigger of filterTriggers){
    filterTrigger.addEventListener("click", (e) => {
      let dataPlay = e.currentTarget.getAttribute("data-play");
      let dataLength = e.currentTarget.getAttribute("data-lenght")
      //console.log(dataPlay,dataLength);
      if(dataPlay){
        sessionStorage.setItem("data-play", dataPlay);
        sessionStorage.setItem("data-lenght", "");
      }else if(dataLength){
        sessionStorage.setItem("data-play", "");
        sessionStorage.setItem("data-lenght", dataLength);
      }
    });
  }
}
if(vignettes){
  for(let vignette of vignettes){
    let filterAttribute;
    let filterValue;
    if(dataDistance){
      filterAttribute = "data-lenght";
      filterValue = dataDistance;
    }else if(dataActivite){
      filterAttribute = "data-play";
      filterValue = dataActivite;
    }
    //console.warn(filterAttribute, filterValue);
    let filter = vignette.getAttribute(filterAttribute)
    //console.log(filter, filter.includes(filterValue));
    if(filter.includes(filterValue)){
      vignette.classList.remove("hidden");
    }else{
      vignette.classList.add("hidden");
    }
  }
}

if(formActivity){
  formActivity.addEventListener("submit", (e) => {
    e.preventDefault();
    let select = formActivity.querySelector("select");
    let reponse = select.value;
    //console.warn(reponse);
    //console.log(dataDistance);
    for(let vignette of vignettes){
      let filterPlay = vignette.getAttribute("data-play");
      let filterLenght = vignette.getAttribute("data-lenght");
      if(filterLenght.includes(dataDistance) 
      && filterPlay.includes(reponse)){
        vignette.classList.remove("hidden");
      }else{
        vignette.classList.add("hidden");
      }
    }
  }); 
}

if(formLenght){
  formLenght.addEventListener("submit", (e) => {
    e.preventDefault();
    let select2 = formLenght.querySelector("select");
    let reponse2 = select2.value;
    // console.warn(reponse2);
    // console.log(dataActivite);
    for(let vignette of vignettes){
      let filterPlay = vignette.getAttribute("data-play");
      let filterLenght = vignette.getAttribute("data-lenght");
      if(filterPlay.includes(dataActivite) 
      && filterLenght.includes(reponse2)){
        vignette.classList.remove("hidden");
      }else{
        vignette.classList.add("hidden");
      }
    }
  }); 
}
