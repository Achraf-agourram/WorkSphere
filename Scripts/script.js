function displayFormualire(){
    formulaire.classList.remove("hidden");
}
function closeFormualire(){
    formulaire.classList.add("hidden");
}

const addWorkerBtn = document.getElementById('addNewWorker');
const formulaire = document.getElementById('formulaire');
const closeFormulaireBtns = Array.from(document.getElementsByClassName('closeFormulaire'));

addWorkerBtn.addEventListener('click', displayFormualire);
closeFormulaireBtns.forEach(btn => {
    btn.addEventListener('click', closeFormualire);
});