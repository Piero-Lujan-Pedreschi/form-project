const firstNameInput = document.querySelector('#first-name-input');
const lastNameInput = document.querySelector('#last-name-input');
const submitButton = document.querySelector('.submit-input');
const inputList = document.querySelector('.input-list-dynamic');
const errorMessage = document.querySelector('.hidden');
firstNameInput.placeholder = "Please enter first name";
lastNameInput.placeholder = "Please enter last name";

const fullNameArray = [];
localStorage.setItem("fullNameArray", JSON.stringify(fullNameArray));

function appendNewItem() {
    console.log(fullNameArray);
    const firstName = firstNameInput.value.trim(); 
    const lastName = firstNameInput.value.trim();
    const fullName = assignFormNamesToObject();
    fullNameArray.push(fullName);

    if (firstName && lastName) {
        const listItem = document.createElement('li');
        listItem.setAttribute('class', 'list-item');
        listItem.textContent = Object.values(fullName);
        // listItem.appendChild(createEditButton());
        // listItem.appendChild(createRemoveButton());
        
        inputList.appendChild(listItem);
    } else {
        alert("Enter valid item");
    }
    
    firstNameInput.value = '';
    lastNameInput.value = '';
}

// function createRemoveButton(storedObject) {
//     const removeButton = document.createElement('button');
//     removeButton.setAttribute('class', 'remove-button');
//     removeButton.textContent = "X";
//     removeButton.onclick = (event) => {
//         const listItem = event.target.parentNode;
//         inputList.removeChild(listItem);
//     };
//     return removeButton;
// }

// function createEditButton() {
//     const editButton = document.createElement('button');
//     editButton.setAttribute('class', 'edit-button');
//     editButton.textContent = "Edit";
//     editButton.onclick = (event) => {
//         const listItem = event.target.parentNode;
//         firstNameInput.value = storedObject.firstName;
//         lastNameInput.value = storedObject.lastName;
//         submitButton.onclick = () => {
//             storedObject.firstName = firstNameInput.value
//             storedObject.lastName = lastNameInput.value
//             listItem.firstChild.textContent = Object.values(storedObject);
//             submitButton.onclick = appendNewItem;
//             firstNameInput.value = ''; 
//             lastNameInput.value = '';
//         }
//     }
//     return editButton;
// }

firstNameInput.addEventListener('input', () => {
    if (/\d/.test(firstNameInput.value) && /\d/.test(lastNameInput.value)) {
        errorMessage.style.display = "inline-block"
        submitButton.disabled = true;
    } else {
        errorMessage.style.display = "none"
        submitButton.disabled = false;
    }
});

// input.addEventListener("keypress", function (event) {
//     if (event.key === 'Enter') {
//         appendNewItem();
//     }
// });

function assignFormNamesToObject() {
    const form = document.querySelector('.form-input');
    const formData = new FormData(form);
    const namesObj = {};

    for (const [key, value] of formData.entries()) {
        namesObj[key] = value;
    }

    return namesObj;
}
