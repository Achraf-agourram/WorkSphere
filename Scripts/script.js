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
    document.getElementById('add-employee').addEventListener("click", validatingData)
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
function validatingData(){
    const inputs = document.getElementsByClassName('form-input');
    if(!/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)+$/.test(inputs[1].value) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs[3].value) || !/^\+212 [6-7]\d{8}$/.test(inputs[4].value)){
        return false;
    }
}

const addWorkerBtn = document.getElementById('addNewWorker');
const formulaire = document.getElementById('formulaire');
const closeFormulaireBtns = Array.from(document.getElementsByClassName('closeFormulaire'));
const defaultAvatar = "https://www.gravatar.com/avatar/?d=mp&s=128"
const profileAvatar = document.getElementById('profileAvatar');
profileAvatar.style.backgroundImage = `url('${defaultAvatar}')`;
const addNewExperienceBtn = document.getElementById('addNewExperience');


addWorkerBtn.addEventListener('click', displayFormualire);

// https://lh3.googleusercontent.com/aida-public/AB6AXuCM2RiCrSua7VgaSDjE1Znd6izeDx4YJE_TCFxdakk5j-Kgh9ta3hBMWRyOPTDPKEWSE9GAulBDKfdm1tqFAAfkBkE2762euRUhc49XJQLASeaE1ueyUjVHSXnbogN1trK-KfkLUQa_ZfS70dS58mZU29xzae6wdsV9E2IYLyYbumzzcRTxWAjRhLxxfqH55btMulR6CA4ebECP2h5pwqxEEj5SIJHpI5Bcvu3jaOV0OlaOG0u66Xd9u8-Cz0v0Or6DMJA7KrA5Iak