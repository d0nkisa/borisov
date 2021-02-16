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
var firestore = firebase.firestore();
const Auth = firebase.auth();
const cloudData = firebase.firestore();
const inputFname = document.querySelector("#fname");
const inputLname = document.querySelector("#lname");
const inputMail = document.querySelector("#email");
const inputText = document.querySelector("#subject");
const inputTheme = document.querySelector("#tema");
const sendBtn = document.querySelector("#sendBtn");

sendBtn.addEventListener('click', function () {
    const firstname = inputFname.value;
    const lastname = inputLname.value;
    const email = inputMail.value;
    const tema = inputMail.value;
    const message = inputText.value;
    console.log("I am going to save " + firstname + " " + lastname + " " + email + " " + tema + " " + message + " " + "to Firestore.");
    cloudData.doc("size/data").get().then(function (doc) {
        var Size;
        if (doc && doc.exists) {
            const data = doc.data();
            Size = data.size;
            cloudData.doc("mail" + (Size + 1) + "/data").set({
                firstname: firstname,
                lastname: lastname,
                email: email,
                theme: tema,
                text: message,
            }).then(function () {
                console.log("File saved");
            }).catch(function (error) {
                console.log("Got an error: ", error);
            });

            cloudData.doc("size/data").update({
                size: parseInt(parseInt(Size) + 1)
            }).catch(function (error) {
                console.log("Got an error: ", error);
            });
        }
    })
})

function signIn() {
    var Email = document.getElementById("signInEmailInputFieldText");
    var Password = document.getElementById("signInPasswordInputFieldText");

    firebase.auth().signInWithEmailAndPassword(Email.value, Password.value).then(function () {
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
    firebase.auth().signOut().then(() => {
        location.replace("index.html")
    }).catch((error) => {
        // An error happened.
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
            cloudData.doc("size/data").get().then(function (doc) {
                var Size;
                if (doc && doc.exists) {
                    const data = doc.data();
                    Size = data.size;

                    for (let index = 1; index < Size + 1; index++) {
                        cloudData.doc("mail" + index + "/data").get().then(function (doc) {
                            var Firstname, Lastname, Theme, Email, Text;
                            if (doc && doc.exists) {
                                const mailData = doc.data();
                                Firstname = mailData.firstname;
                                Lastname = mailData.lastname;
                                Theme = mailData.theme;
                                Email = mailData.email;
                                Text = mailData.text;

                                var newMail = "";
                                newMail += '<div class="mailRow"> <h3>';
                                newMail += Theme;
                                newMail += '</h3> <button class="btn open" onclick="displayData(this)"> open </button> <button class="btn delete">delete</button>';
                                newMail += '<p style="display:none"> от: ' + Firstname + ' ' + Lastname + '</p>';
                                newMail += '<p style="display:none"> имейл: ' + Email + '</p>';
                                newMail += '<p style="display:none"> съобщение: ' + Text + '</p> </div>';

                                document.getElementById('mails').innerHTML += newMail;
                            }
                        });
                    }
                }
            });
        }
        else {
            location.replace("index.html")
        }
    });
}