import data from "./../puns.json" assert { type: "json" };

// select pun attribut
let punAtribut = document.querySelector(".pun");

// select modal atribut
let firstModal = document.getElementsByClassName("pop-up")[0];
let secondModal = document.getElementsByClassName("pop-up")[1];
let thirdModal = document.getElementsByClassName("pop-up")[2];
let modalBackGround = document.getElementById("card-form-modal");

// select themes atribut
let containerToggle = document.getElementById("container-toggle");
let btnDay = document.querySelector("#container-day i");
let btnNight = document.querySelector("#container-night i");
let containerDay = document.getElementById("container-day");
let changes = false;
let song = new Audio("./../asset/audio/agito-themes.mp3");
// status for local storage
// let takeNight = false;

// select input form atribut
let inputForm = document.querySelectorAll(".input");
let userInput = [];

// makes real time day counter
const timeElapsed = Date.now();
const todayDate = new Date(timeElapsed);
document.getElementById("today").innerHTML = todayDate.toDateString();

// event pop up form
document.getElementById("modal-btn").addEventListener("click", () => {
  firstModal.classList.remove("hidden");
  firstModal.classList.add("active");
  modalBackGround.classList.add("block-content");
});

// event submit form button
document.getElementById("submit").addEventListener("click", () => {
  countInput();
  checkedInput();
});

// close form button
document.getElementById("close-btn").addEventListener("click", () => {
  firstModal.classList.remove("active");
  modalBackGround.classList.remove("block-content");
});

// failed event popup submit form button
document.getElementById("dismiss-failed").addEventListener("click", () => {
  thirdModal.classList.remove("active");
});

// success event popup submit form button
document.getElementById("dismiss-popup").addEventListener("click", () => {
  secondModal.classList.remove("active");
  modalBackGround.classList.remove("block-content");
});

// pun generator
punAtribut.addEventListener("click", () => {
  punGenerator();
  punOnClick();
});

document.getElementById("button-themes-day").addEventListener("click", () => {
  togleButtonDay();
  changes = false;
  changeThemes(changes);
  backSong(changes);
});

document.getElementById("button-themes-night").addEventListener("click", () => {
  togleButtonNight();
  changes = true;
  changeThemes(changes);
  backSong(changes);
  // takeNight = true;
  // locaStorageStatus();
});

const checkedInput = () => {
  if (inputForm.length == userInput.length) {
    firstModal.classList.add("hidden");
    secondModal.classList.add("active");
  } else {
    thirdModal.classList.add("active");
    console.log("req input : " + inputForm.length);
    console.log("user input : " + userInput.length);
  }
};

const countInput = () => {
  userInput = [];
  for (let i = 0; i < inputForm.length; i++) {
    if (inputForm[i].value != "") {
      userInput.push(inputForm[i].value);
    }
  }
  getClientName(userInput[0]);
  getClientEmail(userInput[1]);
  printDateTime(userInput[2]);
};

const getClientEmail = (clientEmail) => {
  document.getElementById("client-email").innerHTML = clientEmail;
};
const getClientName = (clientName) => {
  document.getElementById("client-name").innerHTML = clientName;
};
const printDateTime = (inputDateTime) => {
  let timeAppointment = inputDateTime;

  if (timeAppointment) {
    const [datePart, timePart] = timeAppointment.split("T");

    const date = new Date(datePart);

    const time = timePart.split(":")[0] + ":" + timePart.split(":")[1];
    console.log(typeof time);
    document.getElementById("current-time").innerHTML = time;
    document.getElementById("current-date").innerHTML = date.toDateString();
  } else {
    console.error("Invalid date-time string.");
  }
};

const punGenerator = () => {
  let randomNumber = Math.ceil(Math.random() * data.length);
  punAtribut.innerHTML = '"' + data[randomNumber].Pun + '"';
  console.log(data[randomNumber].Pun);
};

const punOnClick = () => {
  punAtribut.classList.add("animated-pun");
  setTimeout(() => {
    punAtribut.classList.remove("animated-pun");
  }, 600);
};

const togleButtonNight = () => {
  containerToggle.classList.add("themes-togle-night");
  btnDay.classList.add("sun-config-night");
  btnNight.classList.add("moon-config-night");
  containerDay.classList.add("themes-day-night");
  document.querySelector("body").classList.add("themes-night-body");
  document
    .getElementById("my-skills-content")
    .classList.add("bg-content-night");
  document.getElementById("my-skill-list").classList.add("img-list-night");
  document.getElementById("footer-content").classList.add("footer-color-night");

  document.querySelector("footer").classList.add("footer-container-night");

  containerToggle.classList.remove("themes-togle-day");
  btnDay.classList.remove("sun-config-day");
  btnNight.classList.remove("moon-config-day");
  containerDay.classList.remove("themes-day-day");
  document.querySelector("body").classList.remove("themes-day-body");
  document
    .getElementById("my-skills-content")
    .classList.remove("bg-content-day");
  document.getElementById("my-skill-list").classList.remove("img-list-day");
  document
    .getElementById("footer-content")
    .classList.remove("footer-color-day");
};

const togleButtonDay = () => {
  containerToggle.classList.add("themes-togle-day");
  btnDay.classList.add("sun-config-day");
  btnNight.classList.add("moon-config-day");
  containerDay.classList.add("themes-day-day");
  document.querySelector("body").classList.add("themes-day-body");
  document.getElementById("my-skills-content").classList.add("bg-content-day");
  document.getElementById("my-skill-list").classList.add("img-list-day");
  document.getElementById("footer-content").classList.add("footer-color-day");

  containerToggle.classList.remove("themes-togle-night");
  btnDay.classList.remove("sun-config-night");
  btnNight.classList.remove("moon-config-night");
  containerDay.classList.remove("themes-day-night");
  document.querySelector("body").classList.remove("themes-night-body");
  document
    .getElementById("my-skills-content")
    .classList.remove("bg-content-night");
  document.getElementById("my-skill-list").classList.remove("img-list-night");
  document
    .getElementById("footer-content")
    .classList.remove("footer-color-night");

  document.querySelector("footer").classList.remove("footer-container-night");
};

// const locaStorageStatus = () => {
//   if (takeNight) {
//     let saveNight = localStorage.setItem("night", "on");
//   }
// };

const changeThemes = (hensin) => {
  if (hensin) {
    document
      .querySelector("picture source")
      .setAttribute("srcset", "./asset/images/agito-logo-night.webp");
    document
      .querySelector(".default-img")
      .setAttribute("src", "./asset/images/agito-logo-night.webp");
  } else {
    document
      .querySelector("picture source")
      .setAttribute("srcset", "./asset/images/icon-adrisa/logo-dark-sm.webp");
    document
      .querySelector(".default-img")
      .setAttribute("src", "./asset/images/icon-adrisa/logo-light-sm.webp");
  }
};

const backSong = (hensin) => {
  if (hensin) {
    song.play();
    song.volume = 1;
  } else {
    song.pause();
    song.currentTime = 0;
  }
};
