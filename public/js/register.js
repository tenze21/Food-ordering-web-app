const showPassword1 = document.getElementById("password-icon1");
const showPassword2 = document.getElementById("password-icon2");
const passwordEl = document.getElementById("password");
const confirmPasswordEl = document.getElementById("password2");
const nameEl = document.getElementById("name");
const contactNumberEl = document.getElementById("contactNumber");
const form = document.getElementById("registration");

let isNameValid = false;
let isContactNumberValid = false;
let isPasswordSecure = false;
let isConfirmPasswordValid = false;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const isFormValid =
    isNameValid &&
    isContactNumberValid &&
    isPasswordSecure &&
    isConfirmPasswordValid;
  if (isFormValid) {
    form.submit();
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

nameEl.addEventListener("input", ()=>{
    const name= nameEl.value.trim();
    const re=/^[a-zA-Z\s]+(?:\s+[a-zA-Z\s]+)?$/;
    if(!re.test(name) && name!==""){
        showError(nameEl, "Name cannot have numbers and special characters!");
    }else{
        hideError(nameEl);
        isNameValid=true;
    }
});

passwordEl.addEventListener("input", ()=>{
    const password= passwordEl.value.trim();
    const re=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    if(!re.test(password) && password!==""){
        showError(passwordEl, "Password must have atleast 8 characters including at least 1 lowercase letter, 1 uppercase letter, 1 digit and 1 special character.");
    }else{
        hideError(passwordEl);
        isPasswordSecure=true;
    }
});

confirmPasswordEl.addEventListener("input", ()=>{
    const password= passwordEl.value.trim();
    const confirmPassword= confirmPasswordEl.value.trim();

    if(confirmPassword!==password && confirmPassword!==""){
        showError(confirmPasswordEl, "Passwords do not match!");
    }else{
        hideError(confirmPasswordEl);
        isConfirmPasswordValid=true;
    }
})

contactNumberEl.addEventListener("input", ()=>{
    const number= contactNumberEl.value.trim();
    const re= /^(17|77)\d{6}$/;
    if(!re.test(number) && number!==""){
        showError(contactNumberEl, "Please provide a valid contact number!");
    }else{
        hideError(contactNumberEl);
        isContactNumberValid=true;
    }
})

// for showing and hiding password
showPassword1.addEventListener("click", () => {
  if (passwordEl.getAttribute("type") === "password") {
    showPassword1.classList.replace("bxs-hide", "bxs-show");
    passwordEl.setAttribute("type", "text");
  } else {
    showPassword1.classList.replace("bxs-show", "bxs-hide");
    passwordEl.setAttribute("type", "password");
  }
});
showPassword2.addEventListener("click", () => {
  if (confirmPasswordEl.getAttribute("type") === "password") {
    showPassword2.classList.replace("bxs-hide", "bxs-show");
    confirmPasswordEl.setAttribute("type", "text");
  } else {
    showPassword2.classList.replace("bxs-show", "bxs-hide");
    confirmPasswordEl.setAttribute("type", "password");
  }
});
