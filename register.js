var login = ()=>{
    window.location.assign("../pages/login.html")
}

const FirstName= document.getElementById("firstname")
const LastName= document.getElementById("lastname")
const MobileNumber= document.getElementById("mobilenumber")
const Email= document.getElementById("emailaddress")
const Password= document.getElementById("password")
const ReEnterPassword= document.getElementById("repassword")
const Message= document.getElementById("message")
const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const signup = ()=> {
    if(FirstName.value === ""){
        Message.innerHTML = "First Name is Required"
        Message.style.color = "red"
    }else if (LastName.value === ""){
        Message.innerHTML = "Last Name is Required"
        Message.style.color = "red"
    }else if (MobileNumber.value === ""){
        Message.innerHTML = "Moblie Number is Required"
        Message.style.color = "red"
    }else if (MobileNumber.value.length < 10){
        Message.innerHTML = "Please enter 10 digit mobile number"
        Message.style.color = "red"
    }else if (Email.value === ""){
        Message.innerHTML = "email id is Required"
        Message.style.color = "red"
    }else if (!Email.value.match(regex)){
        Message.innerHTML = "Please enter valid email address"
        Message.style.color = "red"
    }else if (Password.value === ""){
        Message.innerHTML = "Password is Required"
        Message.style.color = "red"
    }else if (Password.value.length < 6){
        Message.innerHTML = "Please enter atleast 6 digit password"
        Message.style.color = "red"
    }else if (ReEnterPassword.value === ""){
        Message.innerHTML = "Re-enter your password"
        Message.style.color = "red"
    }else if (Password.value !== ReEnterPassword.value){
        Message.innerHTML = "Password doesn't match"
        Message.style.color = "red"
    }else{

        firebase.auth().createUserWithEmailAndPassword(Email.value, Password.value)
  .then((userCredential) => {

    var d = new Date().toLocaleDateString();
    const userData ={
        FirstName: FirstName.value,
        LastName: LastName.value,
        MobileNumber: MobileNumber.value,
        Email: Email.value,
        Password: Password.value,
        ReEnterPassword: ReEnterPassword.value,
        uid: userCredential.user.uid,
        ProfilePicture: "",
        CoverPicture: "",
        Description: "",
        Signupdate: `${d}`

    }
    firebase.firestore().collection("users").doc(userCredential.user.uid).set(userData).then((res)=>{
        Message.innerHTML = "Account was successfully created"
        Message.style.color = "green"
        //send email verification code on email

        const user = firebase.auth().currentUser;
        user.sendEmailVerification().then((res)=>{
            setTimeout(()=>{
                window.location.assign("../pages/emailVerification.html")
            },2000)
            
        })
    })
    
  })
  .catch((error) => {
   Message.innerHTML = error.message;
   Message.style.color = "red"
    
  });
    }
}

