function scrollDown(){
    document.getElementById('unassigned-workers-container').classList.remove('hidden');
    addWorkerBtn.classList.remove('hidden');
    scrollArrowBtn.querySelector('img').src = "icons/arrow-up.png";
    scrollArrowBtn.removeEventListener("click", scrollDown);
    scrollArrowBtn.addEventListener("click", scrollUp);
}
function scrollUp(){
    document.getElementById('unassigned-workers-container').classList.add('hidden');
    addWorkerBtn.classList.add('hidden');
    scrollArrowBtn.querySelector('img').src = "icons/arrow-down.png";
    scrollArrowBtn.removeEventListener("click", scrollUp);
    scrollArrowBtn.addEventListener("click", scrollDown);
}
function displayNotification(msg, color){
    let notification = document.querySelector(".notification");
    notification.textContent = msg;
    notification.classList.replace("hidden", color);
    setTimeout(() => {
        notification.classList.replace(color, "hidden");
    }, 2000);
}
function displayFormualire() {
    formulaire.classList.remove("hidden");
    const photoInput = document.getElementById('photoInput');

    closeFormulaireBtns.forEach(btn => {
        btn.addEventListener('click', closeFormualire);
    });
    photoInput.addEventListener("input", () => {
        if (photoInput.value.trim()) {
            profileAvatar.style.backgroundImage = `url('${photoInput.value.trim()}')`;
        } else {
            profileAvatar.style.backgroundImage = `url('${defaultAvatar}')`;
        }
    });
    addNewExperienceBtn.addEventListener("click", addNewExperience);
    document.getElementById('add-employee').addEventListener("click", addNewWorker)
}
function closeFormualire() {
    formulaire.classList.add("hidden");
}
function addNewExperience() {
    let experienceContainer = document.querySelector('.experiences-container');
    let newExperienceCard = document.querySelector('.experience-form').cloneNode(true);
    let deleteCardBtn = `
    <button class="absolute top-3 right-3 flex items-center justify-center h-7 w-7 rounded-full bg-red-500 text-white hover:bg-red-600 delete-experience">
        <span class="material-symbols-outlined text-base">delete</span>
    </button>`
    newExperienceCard.innerHTML += deleteCardBtn;

    newExperienceCard.querySelector(".delete-experience").addEventListener("click", () => {
        newExperienceCard.remove();
    });
    experienceContainer.appendChild(newExperienceCard);
}
function addNewWorker() {
    const inputs = document.getElementsByClassName('form-input');
    let worker = {id: idCount, photo: inputs[0].value, name: inputs[1].value, role: inputs[2].value, email: inputs[3].value, phone: inputs[4].value, experiences: []};
    let valid = true;
    idCount++
    if (!worker.photo) { worker.photo = defaultAvatar }
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)+$/.test(worker.name) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(worker.email) || !/^\+212 [6-7]\d{8}$/.test(worker.phone)) {
        displayNotification("Please Enter valid informations", "bg-red-400");
        return;
    }
    let experiencesArray = [];
    let experiencesNode = Array.from(document.querySelectorAll('.experience-form'));
    experiencesNode.forEach(exp => {
        let object = {"poste": "", "entreprise": "", "startDate": "", "endDate": ""};
        for(let i=0; i<4; i++){
            if(exp.querySelectorAll('.experience-input')[i].value){
                object[Object.keys(object)[i]] = exp.querySelectorAll('.experience-input')[i].value;
            }else{
                valid = false
                displayNotification("Please fill all informations about experiences", "bg-red-400");
                break;
            }
        }
        experiencesArray.push(object);
    });
    if(valid){
        worker.experiences = experiencesArray;
        unassignedWorkers.push(worker);
        closeFormualire();
        showAWorker(worker, "unassigned-workers-container");
    }
}
function showAWorker(worker, container) {
    const workerCard = `
    <div class="flex items-center justify-between p-3 bg-gray-100 rounded-lg id${worker.id}">
        <div class="flex items-center gap-3">
            <img class="size-10 rounded-full" alt="Staff member avatar" src="${worker.photo}">
            <div>
                <p class="font-bold">${worker.name}</p>
                <p class="text-sm text-[#617589]">${worker.role}</p>
            </div>
        </div>
    </div>
    `
    document.getElementById(container).innerHTML += workerCard;
}
function showAllWorkers(container, roomToAssign) {
    if(!roomToAssign){
        unassignedWorkers.forEach(worker => {
            if (!worker.photo) { worker.photo = defaultAvatar }
            showAWorker(worker, container);
        });
    }else{
        let roles = rolesDict[roomToAssign];
        roles.forEach(role => {
            unassignedWorkers.forEach(worker => {
                if(worker.role == role){
                    showAWorker(worker, container);
                }
            });
        });
    }
}
function updateUnassignedWorkers(){
    document.getElementById("unassigned-workers-container").innerHTML = "";
    showAllWorkers("unassigned-workers-container", false);
}
function assignWorker(roomToAssign) {
    try {
        if(roomsWithCurrentNum[roomToAssign] < limitNum){
            let worker = unassignedWorkers.find(w => w.id === parseInt(selected.classList[6][2]));
            let index = unassignedWorkers.findIndex(w => w.id === worker.id);
            let workerCard = document.createElement("div");
            workerCard.className = `rounded-lg flex flex-col items-center justify-center gap-1 cursor-pointer id${worker.id}`
            workerCard.title = worker.name;
            workerCard.innerHTML = `
                                    <img src="${worker.photo}"
                                        class="w-10 h-10 rounded-full object-cover border border-gray-100">
                                    <button class="text-white hover:text-red-600 retirer-btn${worker.id}" title="Retirer">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="2" stroke="currentColor" class="w-3.5 h-3.5">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M6 18 18 6M6 6l12 12">
                                        </svg>
                                    </button>
                                    `
            assignedWorkers.push(worker);
            unassignedWorkers.splice(index, 1);
            roomsWithCurrentNum[roomToAssign]++;
            document.getElementById("workersToAssignContainer").innerHTML = "";
            showAllWorkers("workersToAssignContainer", roomToAssign);
            updateUnassignedWorkers();
            selected = null;
            updateObligatoryRoomsStatus()
            let roomsDict = {"conference-room": 0, "reception-room": 1, "servers-room": 2, "security-room": 3, "staff-room": 4, "archives-room": 5};
            rooms[roomsDict[roomToAssign]].appendChild(workerCard);
            rooms[roomsDict[roomToAssign]].querySelector(".retirer-btn"+worker.id).addEventListener("click", () => unassignWorker(worker, roomsDict[roomToAssign], roomToAssign))
        }else{displayNotification("Sorry sir, the room is already full", "bg-red-400")}
            
    } catch (er) { console.log(er) }
}
function unassignWorker(worker, roomIndex, roomToUnassign){
    let index = unassignedWorkers.findIndex(w => w.id === worker.id);
    unassignedWorkers.push(worker);
    assignedWorkers.splice(index, 1);
    roomsWithCurrentNum[roomToUnassign]--;
    rooms[roomIndex].querySelector(".id"+worker.id).remove();
    updateUnassignedWorkers();
    updateObligatoryRoomsStatus()
}
function showPopupToAssign(roomToAssign) {
    const assign = () => assignWorker(roomToAssign);
    const workersToAssignContainer = document.getElementById("workersToAssignContainer");
    workersToAssignContainer.innerHTML = "";
    popUp = document.getElementById('popUpAssign');
    popUp.classList.remove('hidden');
    popUp.querySelector('#closePopUpAssign').addEventListener("click", () => {
        popUp.classList.add('hidden');
        selected = null;
        document.getElementById("assignWorkerBtn").removeEventListener("click", assign);
    });
    showAllWorkers("workersToAssignContainer", roomToAssign);

    workersToAssignContainer.addEventListener("click", (e) => {
        if (selected) {
            selected.classList.replace("bg-gray-300", "bg-gray-100");
        }
        e.target.classList.replace("bg-gray-100", "bg-gray-300");
        selected = e.target;
    });
    document.getElementById("assignWorkerBtn").addEventListener("click", assign);
}
function updateObligatoryRoomsStatus(){
    let obligatoryRooms = ["reception-room", "servers-room", "security-room", "archives-room"];
    for(let i=0; i<obligatoryRooms.length; i++){
        if(roomsWithCurrentNum[obligatoryRooms[i]]){
            document.querySelectorAll(".salle-obligatory")[i].classList.replace('bg-red-300', 'bg-green-300')
        }else{
            document.querySelectorAll(".salle-obligatory")[i].classList.replace('bg-green-300', 'bg-red-300')
        }
    }
}
const unassignedWorkers = [
    { id: 0, photo: 'https://intranet.youcode.ma/storage/users/profile/thumbnail/1741-1760996434.png', name: 'achraf agourram', role: 'manager', email: 'achraf@gmail.com', phone: '+212 705283823', experiences: []},
    { id: 1, photo: 'https://img.freepik.com/premium-vector/male-face-avatar-icon-set-flat-design-social-media-profiles_1281173-3806.jpg', name: 'rayan r', role: 'technician', email: 'rayan@gmail.com', phone: '+212 705283823', experiences: []},
    { id: 2, photo: 'https://static.vecteezy.com/system/resources/previews/002/002/427/large_2x/man-avatar-character-isolated-icon-free-vector.jpg', name: 'manal m', role: 'reception', email: 'achraf@gmail.com', phone: '+212 705283823', experiences: []},
    { id: 3, photo: 'https://static.vecteezy.com/system/resources/previews/002/002/332/large_2x/ablack-man-avatar-character-isolated-icon-free-vector.jpg', name: 'aicha a', role: 'cleaner', email: 'rayan@gmail.com', phone: '+212 705283823', experiences: []},
    { id: 4, photo: '', name: 'salma s', role: 'client', email: 'achraf@gmail.com', phone: '+212 705283823', experiences: []},
    { id: 5, photo: 'https://static.vecteezy.com/system/resources/previews/002/002/403/large_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg', name: 'hassan h', role: 'security', email: 'rayan@gmail.com', phone: '+212 705283823', experiences: []}
];
const assignedWorkers = [];
const roomsWithCurrentNum = {"conference-room": 0, "reception-room": 0, "servers-room": 0, "security-room": 0, "staff-room": 0, "archives-room": 0}
var idCount = 6;
var selected = null;
const limitNum = 6;
const addWorkerBtn = document.getElementById('addNewWorker');
const formulaire = document.getElementById('formulaire');
const closeFormulaireBtns = Array.from(document.getElementsByClassName('closeFormulaire'));
const defaultAvatar = "https://www.gravatar.com/avatar/?d=mp&s=128"
const profileAvatar = document.getElementById('profileAvatar');
profileAvatar.style.backgroundImage = `url('${defaultAvatar}')`;
const addNewExperienceBtn = document.getElementById('addNewExperience');
const assignBtns = Array.from(document.getElementsByClassName('assign-btn'));
const rooms = document.getElementsByClassName("assigned-room");
const rolesDict = {"conference-room": ["reception", "technician", "security", "manager", "cleaner", "client"], "reception-room": ["reception", "manager", "cleaner"], "servers-room": ["technician", "manager", "cleaner"], "security-room": ["security", "manager", "cleaner"], "staff-room": ["reception", "technician", "manager", "cleaner"], "archives-room": ["manager"]}
const scrollArrowBtn = document.getElementById('scrollDownOrUp');

updateUnassignedWorkers();
scrollArrowBtn.addEventListener("click", scrollDown);
addWorkerBtn.addEventListener("click", displayFormualire);
assignBtns.forEach(btn => {
    btn.addEventListener("click", () => showPopupToAssign(btn.id));
});