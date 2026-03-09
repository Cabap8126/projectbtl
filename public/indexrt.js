const btnlogin = document.querySelector(".btn-login")
if(btnlogin){
    btnlogin.addEventListener("click",()=>{
        const role = document.getElementById("login-role").value
        if(role == "teacher"){
            window.location.href = "/auth/gv/login"
        }
        else if(role == "student"){
            window.location.href = "/auth/sv/login"
        }
        else{
            window.location.href = "/"
        }
    })
}