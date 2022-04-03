// import { getAuth,
//         createUserWithEmailAndPassword, 
//         signInWithEmailAndPassword,
//         onAuthStateChanged 
//     } from 'firebase/auth'
// import {getDatabase, ref, set, get, child } from "firebase/database";
// // import { setUserDetails } from './mutations';



// function registerUser ({}, payload) {
//     // console.log('payload: ', payload)
//     createUserWithEmailAndPassword(getAuth(), payload.email, payload.password)
//     .then(response => {
//         console.log(response)
//         let userId = getAuth().currentUser.uid
//         const db = getDatabase()
//         set(ref(db, 'users/' + userId), {
//             name: payload.name,
//             email: payload.email,
//             online: true
//         });
//     })
//     .catch(error => {
//         console.log(error)
//     })
// //     .then((data) => {
// //         console.log("Successfully registered!")
// //     })
// //     .catch((error) => {
// //         console.log(error.code);
// //         alert(error.message)
// //     });
// }

// function loginUser({}, payload) {
//     signInWithEmailAndPassword(getAuth(), payload.email, payload.password)
//     .then(response => {
//         console.log(response)
//     })
//     .catch(error => {
//         console.log(error)
//     })
// }

// function handleAuthStateChanged({ commit }) {
//     console.log('handleAuthStateChanged')
//     const auth = getAuth();
//     onAuthStateChanged(auth, (user) => {
//         if (user) { 
//             let userId = getAuth().currentUser.uid
//             const dbRef = ref(getDatabase());
//             get(child(dbRef, `users/${userId}`)).then((snapshot) => {
//                 if (snapshot.exists()) {
//                     let userInfo = snapshot.val();
//                     console.log('snapshot is : ', userInfo);
//                     commit('setUserDetails', {
//                         name: userInfo.name,
//                         email: userInfo.email,
//                         userId: userId

//                     })
//                 } else {
//                     console.log("No data available");
//                 }
//                 }).catch((error) => {
//                 console.error(error);
//                 });
//         } else {

//         }
//     });
// }

// export {registerUser, loginUser, handleAuthStateChanged}