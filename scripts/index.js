import data from "./../puns.json" assert { type: "json" };

let punAtribut = document.querySelector(".pun");
let firstModal = document.getElementsByClassName("pop-up")[0];
let secondModal = document.getElementsByClassName("pop-up")[1];
let thirdModal = document.getElementsByClassName("pop-up")[2];
let modalBackGround = document.getElementById("card-form-modal");
let inputForm = document.querySelectorAll(".input");
let userInput = [];

document.getElementById("modal-btn").addEventListener("click", () => {
  firstModal.classList.remove("hidden");
  firstModal.classList.add("active");
  modalBackGround.classList.add("block-content");
});

document.getElementById("submit").addEventListener("click", () => {
  countInput();
  checkedInput();
});

document.getElementById("dismiss-failed").addEventListener("click", () => {
  thirdModal.classList.remove("active");
});

document.getElementById("close-btn").addEventListener("click", () => {
  firstModal.classList.remove("active");
  modalBackGround.classList.remove("block-content");
});

document.getElementById("dismiss-popup").addEventListener("click", () => {
  secondModal.classList.remove("active");
  modalBackGround.classList.remove("block-content");
});

punAtribut.addEventListener("click", () => {
  punGenerator();
});

const checkedInput = () => {
  if (inputForm.length === userInput.length) {
    firstModal.classList.add("hidden");
    secondModal.classList.add("active");
  } else {
    thirdModal.classList.add("active");
  }
};

const countInput = () => {
  userInput = [];
  for (let i = 0; i < inputForm.length; i++) {
    if (inputForm[i].value != "") {
      userInput.push(inputForm[i].value);
    }
  }
  printDateTime(userInput[2]);
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
