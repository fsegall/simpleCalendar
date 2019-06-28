"use strict"

// Date variables

const month = new Date().getMonth();

const day = new Date().getDate().toString();

// Elements variables

// const mainEl = document.querySelector("#Calendar");

const headerTitleEl = document.querySelector("#headerTitle");

// Title of the Calendar with month

let monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

headerTitleEl.innerHTML = `${monthArray[month]} 2018 Calendar`;


// Divs to render a appointment

const renderTitle = document.querySelector('#title');

const renderDate = document.querySelector('#date');

const renderContent = document.querySelector('#content');

const renderButton = document.querySelector("#button");

// Gets Appointments array rom local storage or sets an empty default

let appointmentsArr = localStorage.getItem('Appointments') ? JSON.parse(localStorage.getItem('Appointments')) : [];

// Renders appointment titles inside calendar on page load 

window.addEventListener('load', () => {

for(let i = 0; i < appointmentsArr.length; i++) {
  const { title, date } = appointmentsArr[i];
  
  dayWithAppointment(title, date);
  
}

})

// Toggles a blue border around calendar cells when clicked and renders the selected appointment

document.querySelector("#CalendarPage").addEventListener('click', (e) => { 
    
    const days = document.querySelectorAll('#CalendarPage > li');
    
    let counter = 0
    for(let day of days) {
        day.classList.remove('green-border');
        counter++;
        day.setAttribute('date', `${counter}`)
    };
    
    if(e.target.nodeName === "LI") {
    e.target.classList.add('green-border');
    }

    const appointments = JSON.parse(localStorage.getItem('Appointments'));

    const appointmentDaily = appointments.filter(appointment => appointment.date === e.target.attributes.date.textContent);

    if (appointmentDaily.length === 0) {

      clearAppointment();
      
    } else {

        clearAppointment();

        const { date, title, content } = appointmentDaily[0];

        renderAppointment (date, title, content);
    }

});

// Renders an Appointement from local storage

function renderAppointment (date, title, content) {

    
    const renderTitle = document.querySelector('#title');
    const renderDate = document.querySelector('#date');
    const renderContent = document.querySelector('#content');
    const renderButton = document.querySelector("#button");
    
    const titleEl = document.createElement('h3');
    titleEl.setAttribute('contenteditable', 'true');
    const dateEl = document.createElement('h4');
    const contentEl = document.createElement('p');
    contentEl.setAttribute('contenteditable', 'true');
    const deleteButtonEl = document.createElement('button');
    const saveButton = document.createElement('button');
    
    deleteButtonEl.setAttribute('id', 'delete');

    deleteButtonEl.setAttribute('onclick', `removeAppointment(${date})`);

    saveButton.setAttribute('id', 'save');
    saveButton.setAttribute('onclick', `editAppointment(${date})` )
    
    titleEl.textContent = title;
    dateEl.textContent = `Appointment for day ${date}`;
    contentEl.textContent = content;
    deleteButtonEl.textContent = "Delete";
    saveButton.textContent="Save";
    
    renderTitle.appendChild(titleEl);
    renderDate.appendChild(dateEl);
    renderContent.appendChild(contentEl);
    renderButton.appendChild(deleteButtonEl);
    renderButton.appendChild(saveButton);



    
    dayWithAppointment(title, date);

}

// Renders the title of an appointment to the calendar cell

function dayWithAppointment (title, day) {

  let itemClass = `.item${day}`;

  let cell = document.querySelector(itemClass);

  // Doesn't allow appointment title to render twice inside calendar cell

  if (cell.hasAttribute('data-content')) {
    return;
  }

  const titleEl = document.createElement('span');

  titleEl.textContent = title;

  cell.setAttribute('data-content', 'true');

  cell.appendChild(titleEl);

}

// Removes an Appointment

    
function removeAppointment(day) {

  const deleted = appointmentsArr.filter(function (appointment) { 
    
    return appointment.date !== day.toString();
   });

  localStorage.setItem('Appointments', JSON.stringify(deleted));


  clearAppointment();

  
  reload(); 

}

// Edits an appointment

function editAppointment(day) {

  const edit = appointmentsArr.filter(function (appointment) { 
    
    return appointment.date !== day.toString();
   });


   const titleString = document.querySelector('#title').children[0].innerText;
   const contentString = document.querySelector('#content').children[0].innerText;
   const daySelect = day.toString();


   const appointmentObj = { title: titleString, content: contentString, date: daySelect }

   const editedArr = appointmentsArr.filter(appointment => appointment.date !== appointmentObj.date);

   editedArr.push(appointmentObj);

   localStorage.setItem('Appointments', JSON.stringify(editedArr));

   reload();

}

// Gets form title and content and sets it to local storage

document.querySelector('#formInputs').addEventListener('submit', (e) => onSubmit(e) );

function onSubmit (e) {
    
    e.preventDefault();
    
    const formInputs = document.querySelector('#formInputs');
    
    const titleString = formInputs.elements[1].value;
    
    const contentString = formInputs.elements[2].value;

    // Fix current day being yesterday (Some issue with getDate and local time in Brazil)
    
    const daySelect = formInputs.elements[0].valueAsDate.getMonth() === 10 ? "1" :  (formInputs.elements[0].valueAsDate.getDate() + 1).toString();
    
    const appointmentObj = { title: titleString, content: contentString, date: daySelect }

    // Validate unique appointment

    for(appointment of appointmentsArr) {
      if(appointmentObj.date === appointment.date) {
        alert('You have already scheduled an appointment for this day. You can delete to add a different appointment or edit the current one.');
      }
    }

    appointmentsArr.push(appointmentObj);

    localStorage.setItem('Appointments', JSON.stringify(appointmentsArr));

    clearAppointment();
    
    renderAppointment(appointmentObj.date, appointmentObj.title, appointmentObj.content);
    
    formInputs.elements[1].value = "";
    formInputs.elements[2].value = "";
    
}

document.querySelector('.clear').addEventListener('click', () => {
    FormData.delete();
});

// Helper function to clear appointment divs

function clearAppointment() {
  renderTitle.innerHTML = "" ;
  renderDate.innerHTML = "";
  renderContent.innerHTML = "" ;
  renderButton.innerHTML = "" ;  
}

// Helper function to relaod page content

function reload () {
  location.reload();
}









