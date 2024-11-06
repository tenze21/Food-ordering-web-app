const img= document.getElementById("image");
const input= document.getElementById("food-image");
input.addEventListener("change", (e) => {
    const file = e.target.files[0];
    img.src = URL.createObjectURL(file);
});