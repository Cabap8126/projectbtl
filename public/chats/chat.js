//CILENT_SEND_MESSENGER
const formSentChat = document.querySelector(".chat .inner-form")
if (formSentChat) {
    formSentChat.addEventListener("submit", (e) => {
        e.preventDefault();
        const content = e.target.elements.content.value
        if (content) {
            socket.emit("CILENT_SEND_MESSAGE",{ 
                content : content
            })
            e.target.elements.content.value = ""
            socket.emit("CLIENT_SEND_TYPING", "hidden");
        }
    })
}
// END
//SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
    const my_id = document.querySelector("[my-id]").getAttribute("my-id")
    const body = document.querySelector(".chat .inner-body")
    const boxTyping = document.querySelector(".chat .inner-list-typing")
    const div = document.createElement("div")
    let htmlFullName = ""
    let htmlConten =""
    if (my_id == data.userId) {
        div.classList.add("inner-outgoing");
    }
    else {
        htmlFullName = `<div class="inner-name">${data.fullName}</div>`;
        div.classList.add("inner-incoming");
    }
    if(data.content){
        htmlConten =`<div class="inner-content">${data.content}</div>`
    }
    div.innerHTML =
    `
    ${htmlFullName}
    ${htmlConten}
    `;
    body.insertBefore(div, boxTyping);
    body.scrollTop = body.scrollHeight;
})
//end
//scroll chat
const bodyChat = document.querySelector(".chat .inner-body");
if (bodyChat) {
    bodyChat.scrollTop = bodyChat.scrollHeight;
}
// end
//show typing
var timeout;
const showtyping = () => {
    socket.emit("CLIENT_SEND_TYPING", "show");
    clearTimeout(timeout)
    timeout = setTimeout(() => {
        socket.emit("CLIENT_SEND_TYPING", "hidden");
    }, 3000)
}
//end
//SERVER_RETURN_TYPING
const elemenmt = document.querySelector(".chat .inner-list-typing")
socket.on("SERVER_RETURN_TYPING", (data) => {
    if (data.type == "show") {
        const exitsTyping = elemenmt.querySelector(`[user-id="${data.userId}"]`);
        const body = document.querySelector(".chat .inner-body")
        if (!exitsTyping) {
            const boxTyping = document.createElement("div")
            boxTyping.classList.add("box-typing");
            boxTyping.setAttribute("user-id", data.userId)
            boxTyping.innerHTML = `
            <div class="inner-name"> ${data.fullName}</div>
            <div class="inner-dots">
                <span></span> 
                <span></span> 
                <span></span> 
            </div>
            `
            elemenmt.appendChild(boxTyping)
            body.scrollTop = body.scrollHeight;
        }
    }
    else {
        const boxTypingRemove = elemenmt.querySelector(`[user-id="${data.userId}"]`)
        if (boxTypingRemove) {
            elemenmt.removeChild(boxTypingRemove)
        }
    }
})