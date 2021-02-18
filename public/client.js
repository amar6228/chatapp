const socket=io()
var user;
var textarea=document.querySelector('#textarea')
var messageArea=document.querySelector('.message_area')

do{

    user=prompt("Enter Your name");

}while(!user)

textarea.addEventListener('keyup', (e)=>{
    if(e.key == 'Enter'){
        sendMessage(e.target.value)
    }
})

//send message................>>>
function sendMessage(message){
    let msg={
        user:user,
        message:message.trim()  //trim escape whitespace
    }
//Apend
    appendMessage(msg,'outgoing')
    textarea.value=""
    srollToBottom()

//Server
    socket.emit('message', {
        user:user,
        message:message
    })
}

function appendMessage(msg, type){
    let mainDiv=document.createElement('div')
    let className=type
    mainDiv.classList.add(className, 'message')

    let markup=`
            <h4> ${msg.user} </h4>
            <p> ${msg.message} </p>
            `
    mainDiv.innerHTML=markup
    messageArea.appendChild(mainDiv)

}

//Recieve message
socket.on('message', (msg)=>{
    appendMessage(msg, 'incoming')
    srollToBottom()
})

function srollToBottom(){
    messageArea.scrollTop=messageArea.scrollHeight

}