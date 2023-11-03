import data from "./../puns.json" assert { type: "json" };
let start = true;
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
let characterSide = document.getElementById("character-image");
// status for local storage
let takeNight = false;

// select input form atribut
let inputForm = document.querySelectorAll(".input");
let userInput = [];

// my skill effect
document
  .getElementById("my-skills-content")
  .addEventListener("mouseover", () => {
    const corporateLaugh = new Audio("./../asset/audio/corporate-laugh.mp3");
    corporateLaugh.play();
  });

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
  characterSide.classList.remove("active-night");
  togleButtonDay();
  changes = false;
  changeThemes(changes);
  backSong(changes);
});

document.getElementById("button-themes-night").addEventListener("click", () => {
  characterSide.classList.add("active-night");
  togleButtonNight();
  changes = true;
  changeThemes(changes);
  backSong(changes);
  // takeNight = true;
  // locaStorageStatus(takeNight);
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

  containerToggle.classList.remove("themes-togle-day");
  btnDay.classList.remove("sun-config-day");
  btnNight.classList.remove("moon-config-day");
  containerDay.classList.remove("themes-day-day");
  document.querySelector("body").classList.remove("themes-day-body");
};

const togleButtonDay = () => {
  containerToggle.classList.add("themes-togle-day");
  btnDay.classList.add("sun-config-day");
  btnNight.classList.add("moon-config-day");
  containerDay.classList.add("themes-day-day");
  document.querySelector("body").classList.add("themes-day-body");

  containerToggle.classList.remove("themes-togle-night");
  btnDay.classList.remove("sun-config-night");
  btnNight.classList.remove("moon-config-night");
  containerDay.classList.remove("themes-day-night");
  document.querySelector("body").classList.remove("themes-night-body");
};

const darkMode = localStorage.getItem("darkMode");
if (darkMode == "on") {
  takeNight = true;
  characterSide.classList.add("active-night");
  togleButtonNight();
  changes = true;
  changeThemes(changes);
  backSong(changes);
}
if (takeNight) {
  locaStorage.setItem("darkMode", "on");
} else {
  localStorage.setItem("darkMode", "off");
}

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
    song.volume = 0.2;
  } else {
    song.pause();
    song.currentTime = 0;
  }
};

const makeSound = (key, start) => {
  if (start) {
    switch (key) {
      case "w":
        let tom1 = new Audio("./../asset/audio/sound-drum-kit/tom-1.mp3");
        tom1.play();
        tom1.volume = 0.5;
        break;
      case "a":
        let tom2 = new Audio("./../asset/audio/sound-drum-kit/tom-2.mp3");
        tom2.play();
        tom2.volume = 0.5;
        break;
      case "d":
        let tom3 = new Audio("./../asset/audio/sound-drum-kit/tom-3.mp3");
        tom3.play();
        tom3.volume = 0.5;
        break;

      case "i":
        let crash = new Audio("./../asset/audio/sound-drum-kit/crash.mp3");
        crash.play();
        crash.volume = 0.5;
        break;
      case "j":
        let snare = new Audio("./../asset/audio/sound-drum-kit/snare.mp3");
        snare.play();
        snare.volume = 0.5;
        break;
      case " ":
        let kick = new Audio("./../asset/audio/sound-drum-kit/kick-bass.mp3");
        kick.play();
        kick.volume = 0.5;
        break;

      case "space":
        let kickClick = new Audio(
          "./../asset/audio/sound-drum-kit/kick-bass.mp3"
        );
        kickClick.play();
        kickClick.volume = 0.5;
        break;

      default:
        console.log(key);
    }
  }
};

function buttonAnimation(currentKey, start) {
  if (start) {
    if (currentKey == " ") {
      let activeButton = document.querySelector(".space ");
      activeButton.classList.add("pressed");
      setTimeout(function () {
        activeButton.classList.remove("pressed");
      }, 300);
    } else {
      let activeButton = document.querySelector("." + currentKey);
      activeButton.classList.add("pressed");
      setTimeout(function () {
        activeButton.classList.remove("pressed");
      }, 300);
    }
  }
}

let btnAll = document.getElementsByClassName("key-btn");
let btnTotal = btnAll.length;
for (let btn = 0; btn < btnTotal; btn++) {
  btnAll[btn].addEventListener("click", function () {
    let btnPress = this.innerHTML;
    console.log(btnPress, start);
    makeSound(btnPress, start);
  });
}
addEventListener("keydown", function (e) {
  makeSound(e.key, start);
  buttonAnimation(e.key, start);
  console.log(e);
});

// document.querySelector(".logo").addEventListener("click", function () {
//   start = true;

// });
