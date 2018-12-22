"use strict"

// Date variables

const month = new Date().getMonth();

const day = new Date().getDate().toString();

console.log(month);

console.log('day', day);

// Elements variables

const mainEl = document.querySelector("#Calendar");

const titleEl = document.querySelector("#Title");

const renderTitle = document.querySelector('#title');

const renderContent = document.querySelector('#content');

const renderButton = document.querySelector("#button");


// Title of the Calendar with month

let monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

titleEl.innerHTML = `${monthArray[month]} 2018 Calendar`;

// Selecting first calendar cell 

function testing () {
    console.log(document.querySelector('.item1'));
}

// Toggles a blue border around calendar cells when clicked

document.querySelector("#CalendarPage").addEventListener('click', (e) => { 
    
    const days = document.querySelectorAll('#CalendarPage > li');
    
    for(let day of days) {
        day.classList.remove('red-border');
    }
    
    if(e.target.nodeName === "LI") {
    e.target.classList.add('red-border');
    }

});

// Listens to content input change

const contentEl = document.querySelector('#content');

contentEl.addEventListener('input', (e) => console.log(e.target.value));


// Selected date

const datePicker = document.querySelector('#datePicker');

datePicker.addEventListener('input', (e) => {
    
    console.log('Date', e.target.valueAsDate.getDate() + 1);
    return e.target.valueAsDate.getDate() + 1;
    
});

// Renders an Appointement from local storage
    
function removeAppointment() {
    renderTitle.innerHTML = "" ;
    renderContent.innerHTML = "" ;
    renderButton.innerHTML = "" ;  
}

function renderAppointment () {
    
    const appointmentObj = JSON.parse(localStorage.getItem('Appointment'))
    const { title, content } = appointmentObj;
    
    const renderTitle = document.querySelector('#title');
    const renderContent = document.querySelector('#content');
    const renderButton = document.querySelector("#button");
    
    const titleEl = document.createElement('h3');
    const contentEl = document.createElement('p');
    const deleteButtonEl = document.createElement('button');
    
    deleteButtonEl.setAttribute('id', 'delete');
    deleteButtonEl.setAttribute('onclick', 'removeAppointment()');
    
    titleEl.textContent = title;
    contentEl.textContent = content;
    deleteButtonEl.textContent = "Delete";
    
    console.log(titleEl, contentEl);
    
    renderTitle.appendChild(titleEl);
    renderContent.appendChild(contentEl);
    renderButton.appendChild(deleteButtonEl);
}
    


// Gets form title and content and sets it to local storage

document.querySelector('#formInputs').addEventListener('submit', (e) => onSubmit(e) )

function onSubmit (e) {
    
    e.preventDefault();
    
    const formInputs = document.querySelector('#formInputs');
    
    console.log('Title', formInputs.elements[1].value, 'Content', formInputs.elements[2].value, formInputs.elements.value);
    
    const titleString = formInputs.elements[1].value;
    
    const contentString = formInputs.elements[2].value;
    
    const dayString =  formInputs.elements[0].value;
    
    const appointmentObj = { title: titleString, content: contentString, date: day.toString() }
    
    localStorage.setItem('Appointment', JSON.stringify(appointmentObj));
    
    console.log(localStorage.getItem('Appointment'));
    
    renderAppointment();
    
    formInputs.elements[1].value = "";
    formInputs.elements[2].value = "";
    
}

document.querySelector('.clear').addEventListener('click', () => {
    FormData.delete();
});


// Put multiple items in local Storage

let appointmentsArr = [];

function setToStorage (title, content) {
  appointmentsArr.push({ title: title, content: content, date: day });
  localStorage.setItem('Appointments', JSON.stringify(appointmentsArr));
};

setToStorage ('here', 'now');
setToStorage ('another', 'again');















