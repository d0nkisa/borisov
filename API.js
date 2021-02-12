const firebaseConfig = {
    apiKey: "AIzaSyDrxRDTE4IOE5bCvK4eHetoVv_UC6b6uuk",
    authDomain: "borisovstroi-a35e8.firebaseapp.com",
    databaseURL: "https://borisovstroi-a35e8-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "borisovstroi-a35e8",
    storageBucket: "borisovstroi-a35e8.appspot.com",
    messagingSenderId: "962927030971",
    appId: "1:962927030971:web:0a3bb1706e6e47401f6f9e"
};

firebase.initializeApp(firebaseConfig);
var firebase = firebase.firestore();

const docRef = firestore.doc("sample/mailOne");
const inputFname = document.querySelector("#fname");
const inputLname = document.querySelector("#lname");
const inputMail = document.querySelector("#email");
const inputText = document.querySelector("#subject");
const submitBtn = document.querySelector("#sendBtn");

submitBtn.addEventListener("click", function () {
    const firstname = inputFname.value;
    const lastname = inputLname.value;
    const email = inputMail.value;
    const message = inputText.value;
    console.log("I am going to save " + firstname + lastname + email + message + "to Firestore.");
    docRef.set({
        firstName: firstname,
        lastName: lastname,
        email: email,
        textMsg: message,
    }).then(function () {
        console.log("File saved");
    }).catch(function (error) {
        console.log("Got an error: ", error);
    })
})

const Auth = firebase.auth();
const cloudData = firebase.firestore();

function signIn() {
    var Email = document.getElementById("signInEmailInputFieldText");
    var Password = document.getElementById("signInPasswordInputFieldText");

    Auth.signInWithEmailAndPassword(Email.value, Password.value).then(function () {
        location.replace("adminPage.html")
    }).catch(function (error) {
        if (error) {
            var errorCode = error.code;

            if (errorCode == 'auth/invalid-email') {
                errorDisplay("Email", true);
            }
            else if (errorCode == 'auth/email-already-in-use') {
                errorDisplay("Email", true);
            }
            else if (errorCode != 'auth/invalid-email') {
                errorDisplay("Email", false);
            }

            if (errorCode == 'auth/wrong-password') {
                errorDisplay("Password", true);
            }
            else if (errorCode == 'auth/user-not-found') {
                errorDisplay("Email", false);
                errorDisplay("Password", false);
            }
            else if (errorCode != 'auth/wrong-password' && errorCode != 'auth/user-not-found') {
                errorDisplay("Password", false);
            }

            if (errorCode == 'auth/too-many-requests') {
                errorDisplay("Email", false);
                errorDisplay("Password", false);
                console.log("too-many-requests");
            }
            console.log(error);
        }
        else
            throw error;
    });
}

function signOut() {
    firebase.auth().signOut().then(function () {
        location.replace("index.html")
    });
}

function errorDisplay(error, have) {
    if (have) {
        document.getElementById("signIn" + error + "InputFieldText").style.borderBottomColor = "red";
        document.getElementById("signIn" + error + "InputFieldLabel").style.color = "red";
    }
    else {
        document.getElementById("signIn" + error + "InputFieldText").style.borderBottomColor = "#fefefe";
        document.getElementById("signIn" + error + "InputFieldLabel").style.color = "#fefefe";
    }
}

function loadAdminData() {
    Auth.onAuthStateChanged(function (user) {
        if (user) {

        }
        else {
            location.replace("index.html")
        }
    });
}