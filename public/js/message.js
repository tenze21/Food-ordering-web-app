export const hideAlert=()=>{
    const el=document.querySelector('.alert');
    if(el) el.parentElement.removeChild(el)
};

// type is success or error
export const showMessage=(item)=>{
    hideAlert();
    const markup= `<div class="message">${item} added to cart!</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
    window.setTimeout(hideAlert, 5000);
};