const showPassword= document.getElementById('password-icon');
const passwordEl= document.getElementById('password');

showPassword.addEventListener('click', ()=>{
    if(passwordEl.getAttribute("type")==="password"){
        showPassword.classList.replace("bxs-hide", "bxs-show");
        passwordEl.setAttribute("type", "text");
    }else{
        showPassword.classList.replace("bxs-show", "bxs-hide");
        passwordEl.setAttribute("type", "password");
    }
})