listForm.employee.addEventListener('keyup', (e) => validateField(e.target));
listForm.employee.addEventListener('blur', (e) => validateField(e.target));

listForm.number.addEventListener('input', (e) => validateField(e.target));
listForm.number.addEventListener('blur', (e) => validateField(e.target));

listForm.phone.addEventListener('input', (e) => validateField(e.target));
listForm.phone.addEventListener('blur', (e) => validateField(e.target));

listForm.addEventListener('submit', onSubmit);
const packingListElement = document.getElementById('packingList');

let employeeValid = true;
let numberValid = true;
let phoneValid = true;


const api = new Api('http://localhost:5000/tasks');

function validateField(field) {
  const { name, value } = field;
  let = validationMessage = '';
  switch (name) {
    case 'employee': {
      if (value.length < 2) {
        employeeValid = false;
        validationMessage = "Fältet 'Namn' måste innehålla minst 2 tecken.";
      } else if (value.length > 100) {
        employeeValid = false;
        validationMessage =
          "Fältet 'Namn' får inte innehålla mer än 100 tecken.";
      } else {
        employeeValid = true;
      }
      break;
    }
    case 'number': {
      if (value.length < 5) {
        numberValid = false;
        validationMessage = "Fältet 'Anställningsnummer' måste innehålla 5 tecken.";
      } else if (value.length > 5) {
        numberValid = false;
        validationMessage =
          "Fältet 'Anställningsnummer' måste innehålla 5 tecken.";
      } else {
        numberValid = true;
      }
      break;
    }
    case 'phone': {
      if (value.length < 2) {
        phoneValid = false;
        validationMessage = "Fältet 'Telefonnummer' måste innehålla minst 2 tecken.";
      } else if (value.length > 20) {
        phoneValid = false;
        validationMessage =
          "Fältet 'Telefonnummer' får inte innehålla mer än 20 tecken.";
      } else {
        phoneValid = true;
      }
      break;
    }
  }
  
  field.previousElementSibling.innerText = validationMessage;
  field.previousElementSibling.classList.remove('hidden');
}



function onSubmit(e) {
  e.preventDefault();

  if (employeeValid && numberValid && phoneValid) {
    console.log('Submit');
    saveEmployee();
  }
}


function saveEmployee() {
  const employee = {
    employee: listForm.employee.value,
    number: listForm.number.value,
    phone: listForm.phone.value,
  };
   
api.create(employee).then((employee) => {
  
  if (employee) {
      renderList();
    }
  });

  listForm.employee.value="" ;
  listForm.number.value="" ;
  listForm.phone.value="";
}

function renderList() {
  console.log('rendering');
  api.getAll().then((employees) => {
    packingListElement.innerHTML = '';

    if (employees && employees.length > 0) {
      employees.forEach((employee) => {
        packingListElement.insertAdjacentHTML('beforeend', renderEmployee(employee));
      });
    }
  });
}


function renderEmployee({ id, employee, number, phone}) {
let html = `
<li class="flex select-none mt-2 pt-4 border-b bg-white/90 rounded-lg">
  <div class="flex justify-between w-5/6">
    <p class="mb-6 ml-8 mr-30 w-1/3">${employee}</p><p class=" mb-6 ml-8 w-1/3">${number}</p> <p class="mb-6 ml-8 w-1/3">${phone}</p>
  </div>
  <div>
  <button onclick="deleteEmployee(${id})" class="inline-block ml-10 rounded-md bg-yellow-500 hover:bg-yellow-400 px-4 py-1">Ta bort</button>
</div>`;
return html;
}


function deleteEmployee(id) {
  api.remove(id).then(() => {
    renderList();
  });
}


renderList();
