const disclosures=document.querySelectorAll(".js-disclosure");
const orders=document.querySelectorAll(".orders");
const ordersNav=document.querySelector(".orders-nav");
ordersNav.setAttribute("aria-current", "page");

function toggleDisclosure(){
    const isExpanded= this.getAttribute('aria-expanded')==='true';
    this.setAttribute('aria-expanded', !isExpanded);
}

disclosures.forEach(component=>{
    component.dataset.state= 'ready';
    const disclosureButtons=component.querySelectorAll('.js_disclosure_btn');
    disclosureButtons.forEach(btn=>{
        btn.removeAttribute('title');
        btn.removeAttribute('disabled');

        btn.addEventListener('click', toggleDisclosure);
    })
});

// reload page on inactivity

let inactivityTimeout; // Variable to store the timeout

// Function to reload the page
function reloadPage() {
  location.reload();
}

// Function to reset the inactivity timer
function resetInactivityTimer() {
  clearTimeout(inactivityTimeout); // Clear the previous timeout
  inactivityTimeout = setTimeout(reloadPage, 60000); // Set new timeout for 1 minute (60000ms)
}

// Add event listeners to detect user activity
window.onload = resetInactivityTimer;
window.onmousemove = resetInactivityTimer;
window.onclick = resetInactivityTimer;
window.onscroll = resetInactivityTimer;

// update order status
const completedBtns = document.querySelectorAll(".completed");
completedBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const id = btn.getAttribute("data-id");
    updateOrderStatus(id);
  });
});

const deleteBtn= document.querySelectorAll(".delete");
deleteBtn.forEach((btn) => {
  const id = btn.getAttribute("data-id");
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    fetch(`/admin/order/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then(()=>{
      location.reload();
    }).
    catch((err) => {
      showUpdateError(err);
    });
  });
});

 async function updateOrderStatus(id) {
  await fetch(`/admin/order/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "Ready" }),
  }).catch((err) => {
    showUpdateError(err);
  });
  location.reload();
};



const hideUpdateError = () => {
  const el = document.querySelector(".update-error");
  if (el) el.parentElement.removeChild(el);
};

// type is success or error
const showUpdateError = (err) => {
  hideUpdateError();
  const markup = `<div class="update-error">There was an error: ${err}</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideUpdateError, 3000);
};
