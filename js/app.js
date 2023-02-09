const pageRuning = {
  isRuning: false,
  inDevContenet: "Bage is onder Development",
};

let work = document.getElementById("work");
//works most be an array
let works = ["Front-End developer", "Networker"];
typeEffect(works, work, { add: 150, remove: 150 });

//the water Effect
let sections = document.getElementsByTagName("section");
for (let i = 0; i < sections.length; i++) {
  sections[i].addEventListener("mousemove", (e) => {
    let id = sections[i].id;
    let section = document.getElementById(`${id}`);
    let bobel = document.createElement("div");
    bobel.className = "bobel";
    bobel.style.left = `${e.offsetX}px`;
    section.appendChild(bobel);
    setTimeout(() => {
      bobel.remove();
    }, 900);
  });
}
//######## geting the slider data from the json file
getslidersdata()
  .then((data) => {
    data.projects.forEach((project) => {
      creatSlider(data.mainUrl, project);
    });
  })
  .then(() => {
    liscenToArrows();
  })
  .catch((error) => {
    throw Error(error);
  });

//start creating the slider
function creatSlider(mainUrl, sliderData) {
  let box = document.createElement("div");
  box.className = "box";
  let slider = createsliderElsments(sliderData);
  if (!sliderData.moreThanLink) {
    sliderData.imgsSrc.forEach((imgSrc) => {
      addingImgToSlider(imgSrc, slider, `${mainUrl}/${sliderData.url}`);
    });
  } else {
    sliderData.imgsSrc.forEach((object) => {
      addingImgToSlider(object.img, slider, `${mainUrl}/${object.url}`);
    });
  }
  box.appendChild(slider);
  let caption = document.createElement("span");
  caption.className = "caption";
  caption.appendChild(document.createTextNode(sliderData.name));
  box.appendChild(caption);
  document.querySelector("#project .container").appendChild(box);
}
//creating the slider elements (the imgs not included)
function createsliderElsments(sliderData) {
  let slider = document.createElement("div");
  slider.className = "box--slider";
  let arroClass = "fa-solid control fa-arrow-";
  let rightArrow = document.createElement("i");
  rightArrow.classList = `${arroClass}right right`;
  let leftArrow = document.createElement("i");
  leftArrow.classList = `${arroClass}left left`;
  let compataple = document.createElement("p");
  compataple.className = "compataple";
  compataple.appendChild(document.createTextNode(sliderData.compataple));
  slider.appendChild(rightArrow);
  slider.appendChild(leftArrow);
  slider.appendChild(compataple);
  return slider;
}

//adding the imgs to the slider
function addingImgToSlider(img, container, link) {
  let anher = document.createElement("a");
  anher.href = link;
  let imgElement = document.createElement("img");
  imgElement.src = img;
  anher.appendChild(imgElement);
  container.prepend(anher);
}

function creatslidercontent() {}
async function getslidersdata() {
  let data = await fetch("./json/projects.json");
  let dataobj = await data.json();
  return dataobj[0];
}
function liscenToArrows() {
  let sliders = document.querySelectorAll(".box--slider");
  sliders.forEach((slider) => {
    let conter = 0;
    slider.addEventListener("click", (eve) => {
      let links = slider.querySelectorAll("a");
      let arrows = slider.querySelectorAll(".control");
      if (eve.target.classList.contains("right")) {
        if (conter > -(links.length - 1)) {
          arrows.forEach((arrow) => {
            arrow.classList.remove("disabled");
          });
          conter--;
          slider.style = `--photo-slide:${conter}`;
        }
        if (conter == -(links.length - 1)) {
          arrows[0].classList.add("disabled");
        }
      } else if (eve.target.classList.contains("left")) {
        if (conter < 0) {
          arrows.forEach((arrow) => arrow.classList.remove("disabled"));
          conter++;
          slider.style = `--photo-slide:${conter}`;
        }
        if (conter == 0) {
          arrows[1].classList.add("disabled");
        }
      }
    });
  });
}

function typeEffect(
  text,
  container,
  time = { add: 150, remove: 100 },
  conter = 0
) {
  container.innerHTML = "";
  let chars = Array.from(text[conter]);
  let i = 0;
  let adder = setInterval(() => {
    container.append(chars[i]);
    i++;
    if (i === chars.length) {
      clearInterval(adder);
      setTimeout(() => {
        let deleter = setInterval(() => {
          chars.length = i;
          container.innerHTML = chars.join("");
          if (i == 0) {
            clearInterval(deleter);
            setTimeout(() => {
              if (conter === text.length - 1)
                typeEffect(text, container, time, 0);
              else typeEffect(text, container, time, ++conter);
            }, 1000);
          }
          i--;
        }, time.remove);
      }, 1000);
    }
  }, time.add);
}

if (!pageRuning.isRuning) {
  document.body.innerHTML = "";
  let div = document.createElement("div");
  div.className = "development--inwork";
  let wotch = document.createElement("span");
  wotch.append("⏳");
  wotch.className = "wotch";
  let content = pageRuning.inDevContenet;
  div.append(content, wotch);
  document.body.append(div);
}
