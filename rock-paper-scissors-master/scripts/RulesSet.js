let modal = document.querySelector('.RulesSet');
let btn = document.querySelector('.RulesButton');
let close = document.querySelector('.RulesModClose');
function toggleModal() {
    modal.classList.toggle('show-modal');
}

function windowOnClick(event) {
    if(event.target === modal){
        toggleModal();
    }
}
btn.addEventListener('click', toggleModal);
close.addEventListener('click', toggleModal);
window.addEventListener('click', windowOnClick);
