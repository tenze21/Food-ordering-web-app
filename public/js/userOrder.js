const disclosures = document.querySelectorAll(".js-disclosure");
const orders = document.querySelectorAll(".orders");
const ordersNav = document.querySelector(".orders-nav");
ordersNav.setAttribute("aria-current", "page");
const homeNav= document.querySelector(".home");
homeNav.removeAttribute("aria-current");

function toggleDisclosure() {
  const isExpanded = this.getAttribute("aria-expanded") === "true";
  this.setAttribute("aria-expanded", !isExpanded);
}

disclosures.forEach((component) => {
  component.dataset.state = "ready";
  const disclosureButtons = component.querySelectorAll(".js_disclosure_btn");
  disclosureButtons.forEach((btn) => {
    btn.removeAttribute("title");
    btn.removeAttribute("disabled");

    btn.addEventListener("click", toggleDisclosure);
  });
});

const deleteBtn = document.querySelectorAll(".delete");
deleteBtn.forEach((btn) => {
  const id = btn.getAttribute("data-id");
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    fetch(`/admin/order/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).catch((err) => {
      showUpdateError(err);
    });
    location.reload();
  });
});
