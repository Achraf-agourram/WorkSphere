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
}
function closeFormualire() {
    formulaire.classList.add("hidden");
}

const addWorkerBtn = document.getElementById('addNewWorker');
const formulaire = document.getElementById('formulaire');
const closeFormulaireBtns = Array.from(document.getElementsByClassName('closeFormulaire'));
const defaultAvatar = "https://www.gravatar.com/avatar/?d=mp&s=128"
const profileAvatar = document.getElementById('profileAvatar');
profileAvatar.style.backgroundImage = `url('${defaultAvatar}')`;


addWorkerBtn.addEventListener('click', displayFormualire);

// https://lh3.googleusercontent.com/aida-public/AB6AXuCM2RiCrSua7VgaSDjE1Znd6izeDx4YJE_TCFxdakk5j-Kgh9ta3hBMWRyOPTDPKEWSE9GAulBDKfdm1tqFAAfkBkE2762euRUhc49XJQLASeaE1ueyUjVHSXnbogN1trK-KfkLUQa_ZfS70dS58mZU29xzae6wdsV9E2IYLyYbumzzcRTxWAjRhLxxfqH55btMulR6CA4ebECP2h5pwqxEEj5SIJHpI5Bcvu3jaOV0OlaOG0u66Xd9u8-Cz0v0Or6DMJA7KrA5Iak
