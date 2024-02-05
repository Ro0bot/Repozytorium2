let currentList = "";
function allowDrop(event) {
    event.preventDefault();
}
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}
function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    var draggedElement = document.getElementById(data);
    var targetList = event.target.closest('.list');
    if (targetList) {
        targetList.querySelector('.cards').appendChild(draggedElement);
    }
}
function openAddCardModal(list) {
    currentList = list;
    document.getElementById('addCardModal').style.display = 'block';
}
function closeAddCardModal() {
    document.getElementById('addCardModal').style.display = 'none';
}
function addBlankCard() {
    var containerId = currentList === 'todo' ? 'done-cards' : 'todo-cards';
    addCard(document.getElementById(containerId), '', '', '', '', '', '');
}
function addCard(container, exerciseName, gender, age, Bweight, weight, reps) {
    var card = document.createElement('div');
    var cardId = 'card-' + Date.now();
    card.id = cardId;
    card.className = 'card';
    card.draggable = true;
    card.addEventListener('dragstart', drag);
    var cardForm = document.createElement('form');
    cardForm.id = 'form-' + cardId;
    cardForm.innerHTML = `<label for="exercise-name-${cardId}">Exercise Name:</label>
                          <input type="text" id="exercise-name-${cardId}" name="exercise-name-${cardId}" value="${exerciseName}" required>
                          <label for="gender-${cardId}">Gender:</label>
                          <select id="gender-${cardId}" name="gender-${cardId}" required>
                              <option value="Male" ${gender === 'Male' ? 'selected' : ''}>Male</option>
                              <option value="Female" ${gender === 'Female' ? 'selected' : ''}>Female</option>
                          </select>
                          <label for="age-${cardId}">Age:</label>
                          <input type="number" id="age-${cardId}" name="age-${cardId}" value="${age}" required>
                          <label for="Bweight-${cardId}">Body Weight (kg):</label>
                          <input type="number" id="Bweight-${cardId}" name="Bweight-${cardId}" value="${Bweight}" required>
                          <label for="weight-${cardId}">Weight (kg):</label>
                          <input type="number" id="weight-${cardId}" name="weight-${cardId}" value="${weight}" required>
                          <label for="reps-${cardId}">Reps:</label>
                          <input type="number" id="reps-${cardId}" name="reps-${cardId}" value="${reps}" required>
                          <button type="button" onclick="updateCard('${cardId}')">Update</button>`;
    card.appendChild(document.createElement('p'));
    card.appendChild(cardForm);
    container.appendChild(card);
    updateCardText(cardId, exerciseName, gender, age, Bweight, weight, reps);
}
function updateCard(cardId) {
    var exerciseName = document.getElementById(`exercise-name-${cardId}`).value;
    var gender = document.getElementById(`gender-${cardId}`).value;
    var age = document.getElementById(`age-${cardId}`).value;
    var weight = document.getElementById(`weight-${cardId}`).value;
    var Bweight = document.getElementById(`Bweight-${cardId}`).value;
    var reps = document.getElementById(`reps-${cardId}`).value;
    updateCardText(cardId, exerciseName, gender, age, Bweight, weight, reps);
}
function updateCardText(cardId, exerciseName, gender, age, Bweight, weight, reps) {
    var cardText = document.getElementById(cardId).querySelector('p');
    cardText.innerHTML = `<strong>Exercise Name:</strong> ${exerciseName}<br><br>
                          <strong>Gender:</strong> ${gender}<br><br>
                          <strong>Age:</strong> ${age}<br><br>
                          <strong>Weight:</strong> ${weight} kg<br><br>
                          <strong>Body Weight:</strong> ${Bweight} kg<br><br>
                          <strong>Reps:</strong> ${reps}`;
}