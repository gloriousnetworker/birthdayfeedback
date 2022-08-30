let feedbackHeader = document.getElementById("feedback-header");
let totalFeedbacks = document.getElementById("feedbacks");
let addFeedbackBtn = document.getElementById("add-feedback-button");
let addGiftingBtn = document.getElementById("add-gifting-button");
let feedbackList = document.getElementById("feedback-list");
let editBtn = document.getElementById("edit-button");
let deleteBtn = document.getElementById("delete-button");
let thankYouBtn = document.getElementById("thank-you-button");
let nameInput = document.getElementById("name");
let titleInput = document.getElementById("title");
let textareaInput = document.getElementById("text");
let addBtn = document.getElementById("add-button");
let cancelBtn = document.getElementById("cancel-button");
const form = document.getElementById("add-feedback-form");
let appreciationCancelBtn = document.getElementById(
  "appreciation-cancel-button"
);
let feedbackAppreciationCancelBtn = document.getElementById(
  "feedback-appreciation-cancel-button"
);
let modal = document.getElementById("add-feedback-modal");
let giftingModal = document.getElementById("add-gifting-modal");
let appreciationModal = document.getElementById("add-appreciation-modal");
let feedbackAppreciationModal = document.getElementById(
  "add-feedback-appreciation-modal"
);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInputs();
});

function checkInputs() {
  const nameInputValue = nameInput.value.trim();
  const titleInputValue = titleInput.value.trim();
  const textAreaValue = textareaInput.value.trim();

  if (nameInputValue === "") {
    setErrorFor(username, "Username cannot be blank");
  } else {
    setSuccessFor(username);
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  small.innerText = message;

  formControl.className = "form__input error";
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form__input success";
}

var countDownDate = new Date("Sep 5, 2022 00:00:00").getTime();
var x = setInterval(function () {
  var now = new Date().getTime();
  var distance = countDownDate - now;

  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerHTML = days + "  :";
  document.getElementById("hours").innerHTML = hours + "  :";
  document.getElementById("minutes").innerHTML = minutes + "  :";
  document.getElementById("seconds").innerHTML = seconds;

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("days").innerHTML = 00;
    document.getElementById("hours").innerHTML = 00;
    document.getElementById("minutes").innerHTML = 00;
    document.getElementById("seconds").innerHTML = 00;

    console.log("Happy Birthday to me!");
  }
}, 1000);

let feedback = {};

addGiftingBtn.addEventListener("click", () => {
  giftingModal.style.display = "block";
  modal.style.display = "none";
  feedbackHeader.style.display = "none";
  feedbackList.style.display = "none";
});

addFeedbackBtn.addEventListener("click", () => {
  modal.style.display = "block";
  feedbackHeader.style.display = "none";
  feedbackList.style.display = "none";
  feedbackAppreciationModal.style.display = "none";
});

thankYouBtn.addEventListener("click", () => {
  giftingModal.style.display = "none";
  appreciationModal.style.display = "block";
  modal.style.display = "none";
  feedbackHeader.style.display = "none";
  feedbackList.style.display = "none";
});

cancelBtn.addEventListener("click", () => {
  modal.style.display = "none";
  feedbackHeader.style.display = "flex";
  feedbackList.style.display = "block";
});

appreciationCancelBtn.addEventListener("click", () => {
  modal.style.display = "none";
  giftingModal.style.display = "none";
  appreciationModal.style.display = "none";
  feedbackHeader.style.display = "flex";
  feedbackList.style.display = "block";
});

addBtn.addEventListener("click", () => {
  feedback.name = nameInput.value;
  feedback.title = titleInput.value;
  feedback.text = textareaInput.value;

  let id = Math.floor(Math.random() * 100);
  feedback.id = id;

  nameInput.value = "";
  titleInput.value = "";
  textareaInput.value = "";

  modal.style.display = "none";
  feedbackHeader.style.display = "none";
  feedbackList.style.display = "none";
  feedbackAppreciationModal.style.display = "block";

  localStorage.setItem(id, JSON.stringify(feedback));

  //   window.location.reload();
});

feedbackAppreciationCancelBtn.addEventListener("click", () => {
  modal.style.display = "none";
  feedbackHeader.style.display = "flex";
  feedbackList.style.display = "block";
  feedbackAppreciationModal.style.display = "none";

  window.location.reload();
});

showFeedback();

function showFeedback() {
  let feedbacks = localStorage;

  for (let i = 0; i < feedbacks.length; i++) {
    // getting the feedback object from local storage
    let feedback = JSON.parse(localStorage.getItem(feedbacks.key(i)));

    feedbackList.innerHTML += `
        <div class="feedback__item item-animation">
                 <div class="feedback__details">
                     <h4 class="feedback__name" id="feedback-name">
                         ${feedback.name}
                     </h4>
                     <h5 class="feedback__title" id="feedback-title">
                         ${feedback.title}
                     </h5>
                     <p class="feedback__text" id="feedback-text">
                         ${feedback.text}
                     </p>
                 </div>

                 <div class="feedback__buttons">
                     <button class="feedback__button" id="edit-button" onclick = "editFeedback(${feedback.id})">
                         Edit
                     </button>
                     <button class="feedback__button" id="delete-button" onclick = "deleteFeedback(${feedback.id})">
                        Delete
                    </button>
                 </div>


             </div>`;
  }
}

function deleteFeedback(id) {
  localStorage.removeItem(id);
  window.location.reload();
}

function editFeedback(id) {
  let feedback = JSON.parse(localStorage.getItem(id));

  modal.style.display = "block";
  feedbackHeader.style.display = "none";
  feedbackList.style.display = "none";

  nameInput.value = feedback.name;
  titleInput.value = feedback.title;
  textareaInput.value = feedback.text;

  addBtn.addEventListener("click", () => {
    feedback.id = id;
    feedback.name = nameInput.value;
    feedback.title = titleInput.value;
    feedback.text = textareaInput.value;
    localStorage.setItem(id, JSON.stringify(feedback));

    //Making the modal disappear
    modal.style.display = "none";
    feedbackHeader.style.display = "flex";
    feedbackList.style.display = "block";

    deleteFeedback(id);
    window.location.reload();
  });
}
