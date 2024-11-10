const drinkImg = document.getElementById("image");
const imageInput = document.getElementById("drink-image");
const titleEl = document.getElementById("title");
const descriptionEl = document.getElementById("description");
const priceEl = document.getElementById("price");
const form = document.getElementById("drink-form");
const submitBtn = document.getElementById("submit-btn");

let imgPath;
imageInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  drinkImg.src = URL.createObjectURL(file);
  const formData = new FormData();
  formData.append("image", file);
  fetch("/drinks/upload", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      imgPath = data.image;
    })
    .catch((err) => {
      console.log(err);
    });
  showMessage();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  submitBtn.value = "Updating...";
  submitBtn.setAttribute("disabled", "");
  const drinkId = location.pathname.split("/")[3];

  const data = {
    title: titleEl.value.trim(),
    description: descriptionEl.value.trim(),
    price: priceEl.value.trim(),
    images: imgPath,
  };
  fetch(`/menu/drinks/${drinkId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then(() => location.reload())
    .catch((err) => showUpdateError(err.message));
});

const hideAlert = () => {
  const el = document.querySelector(".message");
  if (el) el.parentElement.removeChild(el);
};

const showMessage = () => {
  hideAlert();
  const markup = `<div class="message">Image uploaded successfully, please save changes.</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideAlert, 3000);
};

const showUpdateError = (message) => {
  hideAlert();
  const markup = `<div class="message" style="background-color: red">There was an error: ${message}</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideAlert, 3000);
};