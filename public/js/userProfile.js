const profileImg = document.querySelector(".profile-picture");
const profileInput = document.getElementById("profilePicture");
const emailEl = document.getElementById("email");
const contactNumberEl = document.getElementById("contactNumber");
const addressEl = document.getElementById("address");
const designationEl = document.getElementById("designation");
const genderEl = document.getElementById("gender");
const form = document.querySelector("#profile-form");
const submitBtn = document.getElementById("submit-btn");

let profilePath;
profileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  profileImg.src = URL.createObjectURL(file);
  const formData = new FormData();
  formData.append("profile", file);
  fetch("/user/upload", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      profilePath = data.image;
    })
    .catch((err) => {
      console.log(err);
    });
  showMessage();
});

let isContactNumberValid = true;
let isEmailValid = true;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const isFormValid = isContactNumberValid && isEmailValid;
  if (isFormValid) {
    submitBtn.value = "Updating...";
    submitBtn.setAttribute("disabled", "");
    const data = {
      profile: profilePath,
      email: emailEl.value.trim(),
      contactNumber: contactNumberEl.value.trim(),
      address: addressEl.value.trim(),
      designation: designationEl.value.trim(),
      gender: genderEl.value.trim(),
    };
    
    fetch("/user/updateProfile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => location.reload())
      .catch((err) => showUpdateError(err.message));
  }
});

function showError(input, message) {
  const formField = input.parentElement;
  const error = formField.querySelector("small");
  error.textContent = message;
}
function hideError(input) {
  const formField = input.parentElement;
  const error = formField.querySelector("small");
  error.textContent = "";
}

emailEl.addEventListener("input", () => {
  const email = emailEl.value.trim();
  const re = /^[0-9]{8}\.gcit@rub\.edu\.bt$/;

  if (!re.test(email) && email !== "") {
    showError(emailEl, "Email must be your college email");
    isEmailValid = false;
  } else {
    isEmailValid = true;
    hideError(emailEl);
  }
});

contactNumberEl.addEventListener("input", () => {
  const number = contactNumberEl.value.trim();
  const re = /^(17|77)\d{6}$/;
  if (!re.test(number) && number !== "") {
    showError(contactNumberEl, "Please provide a valid contact number!");
    isContactNumberValid = false;
  } else {
    isContactNumberValid = true;
    hideError(contactNumberEl);
  }
});

const hideAlert = () => {
  const el = document.querySelector(".message");
  if (el) el.parentElement.removeChild(el);
};

const showMessage = () => {
  hideAlert();
  const markup = `<div class="message">Profile uploaded successfully, please update profile to save changes.</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideAlert, 3000);
};

const showUpdateError = (message) => {
  hideAlert();
  const markup = `<div class="message" style="background-color: red">There was an error: ${message}</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideAlert, 3000);
};