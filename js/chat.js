// GENERAL VARIABLES

const token = localStorage.getItem("token");
const id = localStorage.getItem("id");
const user_name = localStorage.getItem("user_name");


//LOGOUT
const logout_btn = document.getElementById("logout_btn");
logout_btn.addEventListener("click", Logout);

function Logout(event){
    event.preventDefault();

    fetch(`http://greenvelvet.alwaysdata.net/kwick/api/logout/${token}/${id}`)
    .then((data) =>{
        return data.json()
    })
    .then((dataJson) =>{
        localStorage.clear();
        window.location.href = "index.html"
    })
    .catch((error) =>{console.log(error)})
}

//CONNECTED USERS
//Récupère les utilisateurs actuellements connectés

let connected_users;

Get_Users();

function Get_Users(event){

    fetch(`http://greenvelvet.alwaysdata.net/kwick/api/user/logged/${token}`)
    .then((data) => {
        return data.json();
    })
    .then((dataJson) => {
        console.log(dataJson.result.user);
        connected_users = dataJson.result.user;
        Create_Users(connected_users)
    })
    .catch((error) => {console.log(error)})
}

//Affiche les utilisateurs en ligne dans la boîte "connectés"
function Create_Users(users){
    if(users.length > 0){
        for(let i = 0; i<users.length; i++){
            let user_container = document.getElementById("user_container");
            let user_div = document.createElement('article');
            user_div.setAttribute('class', 'd-flex justify-content-center my-2');
            user_div.innerHTML = `<img class="w-10" src="images/istockphoto-1223671392-170667a.jpg" alt="Photo de profil par defaut"><span id="user_name">${users[i]}</span>`
            user_container.append(user_div);
        }
    }
}

//RECEIVE MESSAGES

let timestamp = 0;

function Get_Messages_fromServer(){
    fetch(`http://greenvelvet.alwaysdata.net/kwick/api/talk/list/${token}/0`)
    .then((data) =>{
        return data.json()
    })
    .then((dataJson) => {
        let listMsg = dataJson.result.talk;
        console.log(listMsg);
        for(let i = listMsg.length - 50; i<listMsg.length; i++){
            if(listMsg[i].timestamp > timestamp){
                Create_Chat(listMsg[i]);
                updateScroll();
            }
        }
        timestamp = listMsg[listMsg.length - 1].timestamp;
    })
    .catch((error) =>{console.log(error)})
}

function updateScroll(){
    let chat = document.getElementById("chat");
    chat.scrollTop = chat.scrollHeight;
}
setInterval(Get_Messages_fromServer, 1000);

function Create_Chat(message){
        let chat = document.getElementById("chat");
        let user_msg = document.createElement('article');
        if(message.user_name == user_name){
            user_msg.setAttribute('class', 'msg_container d-flex flex-row-reverse align-self-end my-2');
        } else {
            user_msg.setAttribute('class', 'third_party_msg d-flex my-2');
        }
        user_msg.innerHTML = `<div class="username px-3"><span>${message.user_name}</span></div>
        <div class="paragraph_container bg-white">
            <p class="tpm_p">${message.content}
            </p>
        </div>`;
        chat.append(user_msg);
    
}

//SEND MESSAGES

const submit_text_button = document.getElementById("submit_text_button");
const submit_text_box = document.getElementById("submit_text_box")
submit_text_box.addEventListener("keyup", (event) => {
    if(event.key = "Enter"){Send_Msg}
})
submit_text_button.addEventListener("click", Send_Msg);

function Send_Msg(){
    let message = document.getElementById("submit_text_box").value;

    fetch(`http://greenvelvet.alwaysdata.net/kwick/api/say/${token}/${id}/${message}`)
    .then(function(data){return data.json()})
    .then(function(json){console.log(json)})
    .catch((error) =>{console.log(error)})

    message = "";

    Get_Messages_fromServer;
}