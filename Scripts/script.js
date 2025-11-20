function displayFormualire() {
    formulaire.classList.remove("hidden");
    const photoInput = document.getElementById('photoInput');

    closeFormulaireBtns.forEach(btn => {
        btn.addEventListener('click', closeFormualire);
    });
    photoInput.addEventListener("input", () => {
        if(photoInput.value.trim()){
            profileAvatar.style.backgroundImage = `url('${photoInput.value.trim()}')`;
        }else{
            profileAvatar.style.backgroundImage = `url('${defaultAvatar}')`;
        }
    });
    addNewExperienceBtn.addEventListener("click", addNewExperience);
    document.getElementById('add-employee').addEventListener("click", submitData)
}
function closeFormualire() {
    formulaire.classList.add("hidden");
}
function addNewExperience(){
    const originalExperienceCard = document.querySelector('.experience-form');
    const experienceContainer = document.querySelector('.experiences-conatainer');
    const newExperienceCard = originalExperienceCard.cloneNode(true);
    const deleteCardBtn = `
    <button class="absolute top-3 right-3 flex items-center justify-center h-7 w-7 rounded-full bg-red-500 text-white hover:bg-red-600 delete-experience">
        <span class="material-symbols-outlined text-base">delete</span>
    </button>`
    newExperienceCard.innerHTML += deleteCardBtn;

    newExperienceCard.querySelector(".delete-experience").addEventListener("click", () => {
        newExperienceCard.remove();
    });
    experienceContainer.appendChild(newExperienceCard);
}
function submitData(){
    const inputs = document.getElementsByClassName('form-input');
    worker = {photo: inputs[0].value, name: inputs[1].value, role: inputs[2].value, email: inputs[3].value, phone: inputs[4].value}
    if(!worker.photo){worker.photo = defaultAvatar}
    if(!/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)+$/.test(worker.name) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(worker.email) || !/^\+212 [6-7]\d{8}$/.test(worker.phone)){
        return false;
    }
    unassignedWorkers.push(worker);
    showAWorker(worker);
}
function showAWorker(worker){
    const workerCard = `
    <div class="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
        <div class="flex items-center gap-3">
            <img class="size-10 rounded-full" alt="Staff member avatar" src="${worker.photo}">
            <div>
                <p class="font-bold ">${worker.name}</p>
                <p class="text-sm text-[#617589]">${worker.role}</p>
            </div>
        </div>
    </div>
    `
    document.getElementById('unassigned-workers-container').innerHTML += workerCard;
}

const unassignedWorkers = [];
const addWorkerBtn = document.getElementById('addNewWorker');
const formulaire = document.getElementById('formulaire');
const closeFormulaireBtns = Array.from(document.getElementsByClassName('closeFormulaire'));
const defaultAvatar = "https://www.gravatar.com/avatar/?d=mp&s=128"
const profileAvatar = document.getElementById('profileAvatar');
profileAvatar.style.backgroundImage = `url('${defaultAvatar}')`;
const addNewExperienceBtn = document.getElementById('addNewExperience');


addWorkerBtn.addEventListener('click', displayFormualire);

showAWorker({photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCM2RiCrSua7VgaSDjE1Znd6izeDx4YJE_TCFxdakk5j-Kgh9ta3hBMWRyOPTDPKEWSE9GAulBDKfdm1tqFAAfkBkE2762euRUhc49XJQLASeaE1ueyUjVHSXnbogN1trK-KfkLUQa_ZfS70dS58mZU29xzae6wdsV9E2IYLyYbumzzcRTxWAjRhLxxfqH55btMulR6CA4ebECP2h5pwqxEEj5SIJHpI5Bcvu3jaOV0OlaOG0u66Xd9u8-Cz0v0Or6DMJA7KrA5Iak', name: 'achraf agourram', role: 'reception', email: 'achraf@gmail.com', phone: '+212 705283823'})