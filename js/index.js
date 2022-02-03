let goto_Signup_btn = document.getElementById("goto_Signup_btn");
let return_toLogin_btn = document.getElementById("return_toLogin_btn");
console.log(goto_Signup_btn);
goto_Signup_btn.addEventListener("click", Register_btn)
return_toLogin_btn.addEventListener("click",Return_toLogin_btn)

function Register_btn(){
    login_form.style.left = ("-400px");
    register_form.style.left = ("0px")
}

function Return_toLogin_btn(){
    login_form.style.left = ("0px");
    register_form.style.left = ("400px")
}




// REGISTER

const reg_btn = document.getElementById("reg_btn");
reg_btn.addEventListener("click", Register);

function Register(event){
    event.preventDefault();
    const user_name = document.getElementById(`reg_login`).value;
    const password = document.getElementById(`reg_password`).value;
    const check_password = document.getElementById(`reg_password_check`).value;

    if(Password_Match(password, check_password) == false || user_name === undefined){
        alert("Erreur matching password");
    } else {
        fetch(`http://greenvelvet.alwaysdata.net/kwick/api/signup/${user_name}/${password}`)
        .then(function(data){return data.json();})
        .then(function(json){console.log(json.result)})
        .catch(function(error){console.log(error)});
        Return_toLogin_btn();
        alert("Votre compte a bien été créé.");
    }
    
    function Password_Match(password1, password2){
        if(password1 === password2){return true}else{return false}}
    
}

// LOGIN

const login_btn = document.getElementById("login_btn");
login_btn.addEventListener("click", Login);

function Login(event){
    event.preventDefault();
    const user_name = document.getElementById(`login`).value;
    const password = document.getElementById(`password`).value;

    fetch(`http://greenvelvet.alwaysdata.net/kwick/api/login/${user_name}/${password}`)
    .then(function(data){return data.json();})
    .then(function(json){console.log(json.result.status);
        localStorage.setItem('token', json.result.token);
        localStorage.setItem("id", json.result.id);
        localStorage.setItem("user_name", user_name)
        window.location.href = "chat.html"})
    .catch(function(error){console.log(error)});
}