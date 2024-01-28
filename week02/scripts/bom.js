const input = document.querySelector('input');
const button = document.querySelector('button');
const list = document.querySelector('#list');

button.addEventListener('click', (e) => {
    e.preventDefault();

    if (input.value) {
        const li = document.createElement('li');
        const deleteButton = document.createElement('button');

        li.textContent = input.value;
        deleteButton.textContent = '❌';
        deleteButton.addEventListener('click', () => {
            list.removeChild(li);
            input.focus();
        });

        li.appendChild(deleteButton);
        list.appendChild(li);

        input.value = '';
    }
    input.focus();
});