const reviewNav = document.querySelector(".reviews");
reviewNav.setAttribute("aria-current", "page");
const homeNav= document.querySelector(".home");
homeNav.removeAttribute("aria-current");

const addBtn= document.querySelector(".add-btn");
const model= document.querySelector(".model-container");
const closeBtn= document.querySelector("#cancel-btn");

addBtn.addEventListener("click", () => model.showModal());
closeBtn.addEventListener("click", () => model.close());

const form= document.querySelector("#review-form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.submit();
});

function deleteReview(id) {
    fetch(`/user/reviews/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    }).then(() => {
        location.reload();
    })
}