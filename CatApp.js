let catForm = document.getElementById('catForm');  //declared catForm and catID
let currentCatId = null;


document.addEventListener('DOMContentLoaded', function() {  //DOM event for document object 
    getCats();                                 
});


catForm.addEventListener('submit', function (e) {   //addEventListener method to process function
    e.preventDefault();
    const catData = {                              //declared all items as a target
        arrival: document.getElementById('arrivalDate').value,
        name: document.getElementById('catName').value,
        gender: document.getElementById('gender').value,
        color: document.getElementById('color').value,
        hair: document.getElementById('hair').value,
        adoptedDate: document.getElementById('adoptedDate').value
    };
    if (currentCatId) {               // using if else,branch off to either update or add data
        updateCat(currentCatId, catData);
    } else {
        addCat(catData);
    }
});


//used fetch()method to fetch API, & POST request to send new data to server
function addCat(catData) {        
    fetch('https://65aca5feadbd5aa31bdf6584.mockapi.io/12345/cats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(catData),
    })
    .then(response => response.json())
    .then(() => {
        alert('Cat Added');             //get pop up after successfully added cat
        getCats();
        resetForm();                    //then reset form for next one
    })
    .catch((error) => {
        console.error('Error:', error);    //if error happened, shows error
    });
}


function getCats() {                         //GET request for get data from server
    fetch('https://65aca5feadbd5aa31bdf6584.mockapi.io/12345/cats', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('catsTable').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = '';
        data.forEach(cat => {           //forEach method to execute put data into cell
            const row = tableBody.insertRow();
            Object.keys(cat).forEach(key => {
                if (key !== 'id') {
                    const cell = row.insertCell();
                    cell.appendChild(document.createTextNode(cat[key]));
                }
            });
            const editButton = document.createElement('button'); //edit btn setting 
            editButton.textContent = 'Edit';
            editButton.classList.add('editBtn');
            editButton.onclick = function () { editCat(cat.id, cat); };
            row.insertCell().appendChild(editButton);

            const deleteButton = document.createElement('button'); //delete btn setting in the cells
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('deleteBtn');
            deleteButton.onclick = function () { deleteCat(cat.id); };
            row.insertCell().appendChild(deleteButton);
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


function updateCat(catId, catData) {        //PUT request for update data in the server
    fetch(`https://65aca5feadbd5aa31bdf6584.mockapi.io/12345/cats/${catId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(catData),
    })
    .then(response => response.json())          //below same as POST request
    .then(() => {
        alert('Cat Updated');
        getCats();
        resetForm();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


function deleteCat(catId) {         //DELETE request to delete data from server
    fetch(`https://65aca5feadbd5aa31bdf6584.mockapi.io/12345/cats/${catId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            alert('Cat Deleted');
            getCats();
        } else {
            alert('Error Deleting Cat');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


function editCat(catId, cat) {      //edit context by textupdate event for document object
    document.getElementById('arrivalDate').value = cat.arrival;
    document.getElementById('catName').value = cat.name;
    document.getElementById('gender').value = cat.gender;
    document.getElementById('color').value = cat.color;
    document.getElementById('hair').value = cat.hair;
    document.getElementById('adoptedDate').value = cat.adoptedDate;
    currentCatId = catId;
}


function resetForm() {              //reset method to reset form
    document.getElementById('catForm').reset();
    currentCatId = null;
}