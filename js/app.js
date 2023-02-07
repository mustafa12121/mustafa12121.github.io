const pageRuning = {
  isRuning: false,
  inDevContenet: "Sorry we are working on it",
};

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
