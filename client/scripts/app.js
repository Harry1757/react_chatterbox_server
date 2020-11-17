// eslint-disable-next-line
const app = {
  server: 'http://localhost:3000/messages',

  init: ()=>{
    app.bringserverData()
  },

  fetch: () =>{
    return fetch(app.server)
    .then(response => response.json())
  },

  send: message=>{
    fetch(app.server,{
      method: 'POST',
      body: JSON.stringify(message),
      headers: {
        "Content-Type":"application/json",
      }
    }).then(response => response.json())
    app.bringserverData()
  },

  renderMessage:message =>{
    let chats = document.querySelector("#chats")
    let div = document.createElement('div')
    div.className = 'chat'
    let user = document.createElement('div')
    user.className = 'username'
    user.textContent = message.username
    let msg = document.createElement('div')
    msg.className = 'message'
    msg.textContent=message.text
    let date = document.createElement('div')
    date.className = 'date'
    date.textContent = message.date
    let room = document.createElement('div')
    room.className ='roomname'
    room.textContent = message.roomname
    div.append(user,msg,date,room);
    chats.prepend(div);
  },
  bringserverData: () =>{
    app.fetch()
    .then(data=>{
      for(let el of data.results){
        app.renderMessage(el);
      }
    })
  },
  clearMessages : () =>
  document.querySelector('#chats').textContent=""
};
app.init();

document.querySelector('#submit').onclick = () =>{
  let message = {
    username : document.querySelector("#username").value,
    text : document.querySelector("#text").value,
    roomname : document.querySelector("#Roomname").value,
  }
  app.send(message);
  app.renderMessage(message);
  app.bringserverData();
}
