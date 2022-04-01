import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { getDatabase, ref, set } from "firebase/database";


function registerUser ({}, payload) {
    // console.log('payload: ', payload)
    createUserWithEmailAndPassword(getAuth(), payload.email, payload.password)
    .then(response => {
        console.log(response)
        let userId = getAuth().currentUser.uid
        const db = getDatabase()
        set(ref(db, 'users/' + userId), {
            name: payload.name,
            email: payload.email,
            online: true
        });
    })
    .catch(error => {
        console.log(error)
    })
//     .then((data) => {
//         console.log("Successfully registered!")
//     })
//     .catch((error) => {
//         console.log(error.code);
//         alert(error.message)
//     });
}

function loginUser({}, payload) {
    signInWithEmailAndPassword(getAuth(), payload.email, payload.password)
    .then(response => {
        console.log(response)
    })
    .catch(error => {
        console.log(error)
    })
}

export {registerUser, loginUser}