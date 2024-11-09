const firstNameInput = document.querySelector('#first-name-input');
// const lastNameInput = document.querySelector('#last-name-input');
const submitButton = document.querySelector('.submit-input');
const inputList = document.querySelector('.input-list-dynamic');
const errorMessage = document.querySelector('.hidden');
firstNameInput.placeholder = "Please enter first name";
// lastNameInput.placeholder = "Please enter last name";


firstNameInput.addEventListener('input', () => {
    if (/\d/.test(firstNameInput.value)) {
        errorMessage.style.display = "inline-block"
        submitButton.disabled = true;
    } else {
        errorMessage.style.display = "none"
        submitButton.disabled = false;
    }
});

// input.addEventListener("keypress", function(event) {
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

    return Object.values(namesObj);
}

function appendNewItem() {
    const firstName = firstNameInput.value.trim(); 
    // const lastName = firstNameInput.value.trim(); 
    if (firstName) {
        const listItem = document.createElement('li');
        listItem.setAttribute('class', 'list-item');
        listItem.textContent = assignFormNamesToObject();
        console.log(listItem);
        listItem.appendChild(createEditButton());
        listItem.appendChild(createRemoveButton());
        
        inputList.appendChild(listItem);
    } else {
        alert("Enter valid item");
    }

    
    firstNameInput.value = '';
    console.log("firstNameInput cleared");
}

function createRemoveButton() {
    const removeButton = document.createElement('button');
    removeButton.setAttribute('class', 'remove-button');
    removeButton.textContent = "X";
    removeButton.onclick = (event) => {
        const listItem = event.target.parentNode;
        inputList.removeChild(listItem);
    };
    return removeButton;
}

function createEditButton() {
    const editButton = document.createElement('button');
    editButton.setAttribute('class', 'edit-button');
    editButton.textContent = "Edit";
    editButton.onclick = (event) => {
        const listItem = event.target.parentNode;
        const currentInput = listItem.firstChild.textContent;
        firstNameInput.value = currentInput;
        submitButton.onclick = () => {
            listItem.firstChild.textContent = firstNameInput.value.trim();
            submitButton.onclick = appendNewItem;
            firstNameInput.value = ''; 
        }
    }
    return editButton;
}
