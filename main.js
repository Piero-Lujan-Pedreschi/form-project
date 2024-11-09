const input = document.querySelector('#string-input');
const submitButton = document.querySelector('.submit-input');
const inputList = document.querySelector('.input-list-dynamic');
const errorMessage = document.querySelector('.hidden');
input.placeholder = "Please enter an item";


input.addEventListener('input', () => {
    if (/\d/.test(input.value)) {
        errorMessage.style.display = "inline-block"
        submitButton.disabled = true;
    } else {
        errorMessage.style.display = "none"
        submitButton.disabled = false;
    }
});

input.addEventListener("keypress", function(event) {
    if (event.key === 'Enter') {
        appendNewItem();
    }
});

function appendNewItem() {
    const newString = input.value.trim(); 
    if (newString) {
        const listItem = document.createElement('li');
        listItem.setAttribute('class', 'list-item');
        listItem.textContent = newString;
        listItem.appendChild(createEditButton());
        listItem.appendChild(createRemoveButton());
        
        inputList.appendChild(listItem);
    } else {
        alert("Enter valid item");
    }
    input.value = '';
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
        input.value = currentInput;
        submitButton.onclick = (item) => {
            listItem.firstChild.textContent = input.value.trim();
            submitButton.onclick = appendNewItem;
            input.value = ''; 
        }
    }
    return editButton;
}
