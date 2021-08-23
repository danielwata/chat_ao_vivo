const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const updateNameForm = document.querySelector('.new-name');
const updateMsg = document.querySelector('.update-msg');
const rooms = document.querySelector('.chat-rooms');

//add new chat
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(()=> newChatForm.reset())
        .catch(err => console.log(err));
});

updateNameForm.addEventListener('submit', e => {
    e.preventDefault();
    const newName = updateNameForm.name.value.trim();
    chatroom.updateName(newName);
    //reset the form
    updateNameForm.reset();
    //show then hide the update message
    updateMsg.innerText = `Seu nome foi atualizado para ${newName}`;
    setTimeout(() => updateMsg.innerText='', 3000);
});

//atualizar sala
rooms.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON'){
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat));
    }

});

//check local storage for name
const username = localStorage.username ? localStorage.username : 'anônimo' ;

//class instances
const chatroom = new Chatroom('gaming', username);
const chatUI = new ChatUI(chatList);

// get chats and render
chatroom.getChats(data => chatUI.render(data));