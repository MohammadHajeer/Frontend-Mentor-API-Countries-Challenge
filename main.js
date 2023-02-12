let countryNameInput = document.querySelector(
  ".body .container .search .search-by-name input"
);
// Start Dark Mode Swticher
let darkModeSwitcher = document.querySelectorAll(".dark-mode-switcher");
darkModeSwitcher.forEach((s) => {
  s.onclick = () => {
    document.body.classList.toggle("dark-mode-theme");
    darkModeSwitcher[0].classList.toggle("fa-regular");

    if (document.body.classList.contains("dark-mode-theme")) {
      window.localStorage.theme = "dark";
    } else {
      window.localStorage.theme = "light";
    }
  };
});
// End Dark Mode Swticher
// Start Fetching
let flags = document.querySelector(".flags");
async function getAPI(api) {
  let data = await (await fetch(api)).json();
  createFlag(data);
  flagOnClick();
}
getAPI("https://restcountries.com/v3.1/all");
// End Fetching
// Start Creating flags
function createFlag(array) {
  flags.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    if (array[i].name.common.toLowerCase() == "israel") continue;
    let flag = document.createElement("div");
    flag.className = "flag";

    let img = document.createElement("img");
    img.src = array[i].flags.png;
    img.alt = array[i].flags.alt;
    flag.appendChild(img);

    let details = document.createElement("div");
    details.className = "details";

    let h2 = document.createElement("h2");
    let h2Text = document.createTextNode(array[i].name.common);
    h2.className = "country-name";
    h2.appendChild(h2Text);
    details.appendChild(h2);

    let p1 = document.createElement("p");
    let p1Text = document.createTextNode("Population: ");
    p1.appendChild(p1Text);
    let p1Span = document.createElement("span");
    let p1SpanText = document.createTextNode(array[i].population);
    p1Span.appendChild(p1SpanText);
    p1.appendChild(p1Span);
    details.appendChild(p1);

    let p2 = document.createElement("p");
    let p2Text = document.createTextNode("Region: ");
    p2.appendChild(p2Text);
    let p2Span = document.createElement("span");
    let p2SpanText = document.createTextNode(array[i].region);
    p2Span.appendChild(p2SpanText);
    p2.appendChild(p2Span);
    details.appendChild(p2);

    let p3 = document.createElement("p");
    let p3Text = document.createTextNode("Capital: ");
    p3.appendChild(p3Text);
    let p3Span = document.createElement("span");
    let p3SpanText = document.createTextNode(array[i].capital);
    p3Span.appendChild(p3SpanText);
    p3.appendChild(p3Span);
    details.appendChild(p3);

    flag.appendChild(details);

    flags.appendChild(flag);
  }
}
// End Creating flags
// Start Filtering By Region
let regions = document.querySelector(".regions");
let allRegions = document.querySelector(".regions li:first-child");
let region = document.querySelectorAll(".regions li:not(:first-child)");
let listButton = document.querySelector(".list-button");

listButton.onclick = () => {
  listButton.classList.toggle("rotate");
  regions.classList.toggle("show-hide");
};

allRegions.onclick = () => {
  getAPI("https://restcountries.com/v3.1/all");
  region.forEach((r) => r.classList.remove("active"));
  allRegions.classList.add("active");
};

region.forEach((r) => {
  r.onclick = () => {
    getAPI(`https://restcountries.com/v3.1/region/${r.innerHTML}`);
    region.forEach((r) => r.classList.remove("active"));
    allRegions.classList.remove("active");
    r.classList.add("active");
  };
});
// End Filtering By Region
// Start Filtering By Name
countryNameInput.onkeyup = () => {
  let value = countryNameInput.value.trim();
  if (value == "") {
    getAPI("https://restcountries.com/v3.1/all");
  } else {
    getAPI(
      `https://restcountries.com/v3.1/name/${value}`
    );
    setTimeout(() => {
      if (flags.innerHTML == "") {
        let p = document.createElement("p")
        p.className = "message"
        let pText = document.createTextNode("No Country with such name.")
        p.appendChild(pText)
        let loading = document.createElement("div");
        loading.className = "loading";
        flags.appendChild(loading)
        flags.appendChild(p)
      }
    }, 1000);
  }
};
// End Filtering By Name
// Start Save The Info of the flag
window.onload = () => {
  //For Dark Mode
  if (window.localStorage.theme == "dark") {
    document.body.classList.add("dark-mode-theme");
  }

  flagOnClick();
};
// End Save The Info of the flag
// Start Flag On click Event
function flagOnClick() {
  setTimeout(() => {
    if (flags.innerHTML != "") {
      let flag = document.querySelectorAll(".flag");

      flag.forEach((f) => {
        f.onclick = () => {
          countryNameInput.value = ""
          window.localStorage.country = f.childNodes[1].firstChild.innerHTML;
          window.location.href = "flagInfo.html";
        };
      });
    }
  }, 100);
}
