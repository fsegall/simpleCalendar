"use strict"

// Date variables

const month = new Date().getMonth();

const day = new Date().getDate().toString();

console.log(month);

console.log('day', day);

// Elements variables

// const mainEl = document.querySelector("#Calendar");

const headerTitleEl = document.querySelector("#headerTitle");


// Divs to render a appointment

const renderTitle = document.querySelector('#title');

const renderDate = document.querySelector('#date');

const renderContent = document.querySelector('#content');

const renderButton = document.querySelector("#button");

// Appointments array

let appointmentsArr = [];

// Title of the Calendar with month

let monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

headerTitleEl.innerHTML = `${monthArray[month]} 2018 Calendar`;

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

function renderAppointment () {
    
    const appointments = JSON.parse(localStorage.getItem('Appointments'))

    for(let appointment of appointments) {

    }

    const { title, content, date } = appointments[0];
    const renderDate = document.querySelector('#date');
    const renderTitle = document.querySelector('#title');
    const renderContent = document.querySelector('#content');
    const renderButton = document.querySelector("#button");
    
    const titleEl = document.createElement('h3');
    const dateEl = document.createElement('h4');
    const contentEl = document.createElement('p');
    const deleteButtonEl = document.createElement('button');
    
    deleteButtonEl.setAttribute('id', 'delete');
    deleteButtonEl.setAttribute('onclick', 'removeAppointment()');
    
    titleEl.textContent = title;
    dateEl.textContent = date;
    contentEl.textContent = content;
    deleteButtonEl.textContent = "Delete";
    
    console.log(titleEl, contentEl);
    
    renderTitle.appendChild(titleEl);
    renderDate.appendChild(dateEl);
    renderContent.appendChild(contentEl);
    renderButton.appendChild(deleteButtonEl);

    dayWithAppointment(title, date);




}

// Renders the title of an appointment to the calendar cell

function dayWithAppointment (title, day) {

  //const appointments = JSON.parse(localStorage.getItem('Appointments'))

  //const { date, title } = appointments[0];

  const className = `.item${day}`;

  console.log(className);

  const cell = document.querySelector(className);

  const titleEl = document.createElement('span');

  titleEl.textContent = title;

  cell.appendChild(titleEl);

}

// Removes an Appointment
    
function removeAppointment() {
  renderTitle.innerHTML = "" ;
  renderDate.innerHTML = "";
  renderContent.innerHTML = "" ;
  renderButton.innerHTML = "" ;  
}

// Gets form title and content and sets it to local storage

document.querySelector('#formInputs').addEventListener('submit', (e) => onSubmit(e) );

function onSubmit (e) {
    
    e.preventDefault();
    
    const formInputs = document.querySelector('#formInputs');
    
    console.log('Title', formInputs.elements[1].value, 'Content', formInputs.elements[2].value, formInputs.elements.value);
    
    const titleString = formInputs.elements[1].value;
    
    const contentString = formInputs.elements[2].value;

    // Fix current day being yesterday (Some issue with getDate and local time in Brazil)
    
    const daySelect = formInputs.elements[0].valueAsDate.getMonth() === 10 ? "1" :  (formInputs.elements[0].valueAsDate.getDate() + 1).toString() ;
    
    const appointmentObj = { title: titleString, content: contentString, date: daySelect }

    appointmentsArr.push(appointmentObj);

    localStorage.setItem('Appointments', JSON.stringify(appointmentsArr));
    
    console.log(localStorage.getItem('Appointments'));
    
    renderAppointment();
    
    formInputs.elements[1].value = "";
    formInputs.elements[2].value = "";
    
}

document.querySelector('.clear').addEventListener('click', () => {
    FormData.delete();
});


// Put multiple items in local Storage



/* function setToStorage (title, content) {
  appointmentsArr.push({ title: title, content: content, date: day });
  localStorage.setItem('Appointments', JSON.stringify(appointmentsArr));
};

setToStorage ('here', 'now');
setToStorage ('another', 'again');
 */














