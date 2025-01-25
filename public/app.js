document.addEventListener('click', event => {
    if (event.target.dataset.type === 'remove' ) {
        const id = event.target.dataset.id
    remove(id).then(() => {
        event.target.closest('li').remove()
    })
    }
})

async function remove(id) {
    await fetch(`/${id}`, {
        method: 'DELETE'
    })
}

document.addEventListener('click', async (event) => {
    if (event.target.dataset.type === 'edit') {
        const liElement = event.target.closest('li');
        const id = event.target.dataset.id;
        const currentText = liElement.querySelector('.note-title').textContent;
        const newTitle = prompt('Введите новый текст', currentText);

        if (newTitle && newTitle !== currentText) {
            try {
                await edit(id, newTitle);
                liElement.querySelector('.note-title').textContent = newTitle;
            } catch (error) {
                alert('Ошибка при редактировании заметки');
                console.log(error);
            }
        }
    }
});

async function edit(id, title) {
    const res = await fetch(`/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: title })
    });

    if (!res.ok) {
        console.log(`HTTP error! status: ${res.status}`);
    }
    return res.json();
}

