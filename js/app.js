const pageRuning = {
  isRuning: false,
  inDevContenet: "Sorry we are working on it",
};

let work = document.getElementById("work");
//most be an array
let works = ["Front-End developer", "Networker"];
typeEffect(works, work, { add: 150, remove: 150 });

function typeEffect(
  text,
  contanier,
  time = { add: 150, remove: 100 },
  conter = 0
) {
  contanier.innerHTML = "";
  let chars = Array.from(text[conter]);
  let i = 0;
  let adder = setInterval(() => {
    contanier.append(chars[i]);
    i++;
    if (i === chars.length) {
      clearInterval(adder);
      setTimeout(() => {
        let deleter = setInterval(() => {
          chars.length = i;
          contanier.innerHTML = chars.join("");
          if (i == 0) {
            clearInterval(deleter);
            setTimeout(() => {
              if (conter === text.length - 1)
                typeEffect(text, contanier, time, 0);
              else typeEffect(text, contanier, time, ++conter);
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
