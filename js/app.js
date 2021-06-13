// Global Variables
let employee = [];
const urlAPI = 'https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US';
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector("overlay");
const modalConatainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");

// Fetch from API
fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err));

// Function for Employee Display
function displayEmployees(employeeData) {  
    employees = employeeData;
    let employeeHTML = '';

    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;

        employeeHTML += `
            <div class="card" data-index="${index}">
                <img class="avatar" src="${picture.large}" />
                <div class="text-container">
                    <h2 class="name">${name.first} ${name.last}</h2>
                    <p class="email">${email}</p>
                    <p class="address">${city}</p>
                </div>
            </div>
        `
    });

    gridContainer.innerHTML = employeeHTML;
}

// Function for Modal Display
function displayModal(index) { 

    let { name, dob, phone, email, location: { city, street, state, postcode}, picture } = employees[index];

    let date = new Date(dob.date);

    const modalHTML = `
        <img class="avatar" src="${picture.large}" />
        <div class="text-conatiner">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            <hr />
            <p>${phone}</p>
            <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
            <p>Birthday:
${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
        `;

        overlay.classList.remove("hidden");
        modalConatainer.innerHTML = modalHTML;
}

//Event Listeners

//Nearest Card
gridContainer.addEventListener('click', e => {
    if (e.target !== gridContainer) {

        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');

        displayModal(index);
    }
});

//Close Modal

modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
});