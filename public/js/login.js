const showPassword= document.getElementById('password-icon');
const passwordEl= document.getElementById('password');
const form= document.getElementById('login-form');
const submitBtn= document.getElementById('submit-btn');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    form.submit();
    submitBtn.value="Processing...";
    submitBtn.setAttribute('disabled', '');
});

showPassword.addEventListener('click', ()=>{
    if(passwordEl.getAttribute("type")==="password"){
        showPassword.classList.replace("bxs-hide", "bxs-show");
        passwordEl.setAttribute("type", "text");
    }else{
        showPassword.classList.replace("bxs-show", "bxs-hide");
        passwordEl.setAttribute("type", "password");
    }
})