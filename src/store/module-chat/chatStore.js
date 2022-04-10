
import { getAuth,
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from 'firebase/auth'
import {getDatabase, ref, set, get, child, onValue, update, push, onChildAdded, onChildChanged } from "firebase/database";
import 'firebase/auth'
import 'firebase/database'


const state = {
    userDetails: {},
    users: {}
}


const mutations = {
    setUserDetails (state, payload) {
        state.userDetails = payload
        },
    addUser(state, payload) {
        console.log('payload from add user : ', payload)
        state.users[payload.userKey] = payload.userDetails
    },
    updateUser(state, payload) {
        Object.assign(state.users[payload.userKey], payload.userDetails)
    }

}

const getters = {
    users: state => {
        let usersFiltered = {}
        Object.keys(state.users).forEach(key => {
            if(key !== state.userDetails.userId){
                usersFiltered[key] = state.users[key]
            }
        })
        console.log('filtered users from getters: ', usersFiltered )
        return usersFiltered
    }
}


const actions = {
    registerUser ({}, payload) {
        console.log('payload: ', payload)
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
    },
    
    loginUser({}, payload) {
        signInWithEmailAndPassword(getAuth(), payload.email, payload.password)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
    },
    
    handleAuthStateChanged({ commit, dispatch, state }) {
        console.log('handleAuthStateChanged')
        const auth = getAuth();
        const db = getDatabase();
        
        onAuthStateChanged(auth, (user) => {
            if (user) { 
                let userId = getAuth().currentUser.uid
                return onValue(ref(db, '/users/' + userId), (snapshot) => {
                    // console.log('snapshot: ', snapshot.val()) username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
                    // ...
                    let userDetails = snapshot.val()


                    commit('setUserDetails', {
                        name: userDetails.name,
                        email: userDetails.email,
                        userId: userId
                    })
                    dispatch('firebaseUpdateUser', {
                        userId: userId,
                        online: true
                    })
                    dispatch('firebaseGetUsers')
                    this.$router.push('/')
                }, {
                    onlyOnce: true
                });
                
            } else {
                dispatch('firebaseUpdateUser', {
                    userId: state.userDetails.userId,
                    online: false
                })
                this.$router.replace('/auth')
                commit('setUserDetails', {})
                
            }
        });
    },

    firebaseUpdateUser({}, payload) {
        const db = getDatabase();
        // const userKey = push(child(ref(db), 'users')).key;
        const updates = {};

        updates['/users/' + payload.userId + '/online'] = payload.online
        update(ref(db),updates)
        // let userId = getAuth().currentUser.uid
        // const db = getDatabase();
        // set(ref(db, 'users/' + payload.userId).update(payload.update));
    },

    firebaseGetUsers({ commit }) {
        const db = getDatabase();
        const usersRef = ref(db, 'users');
        onChildAdded(usersRef, (data) => {
        let userDetails = data.val()
        let userKey = data.key
        commit('addUser', {
            userKey,
            userDetails
        })
        });

        onChildChanged(usersRef, (data) => {
            let userDetails = data.val()
            let userKey = data.key
            commit('updateUser', {
                userKey,
                userDetails
            })
            });
        
        
        
        // const dbRef = ref(getDatabase());
        // get(child(dbRef, 'users/')).then((snapshot) => {
        //     if (snapshot.exists()) {
        //         console.log('raw snapshot ', snapshot);
        //         let userDetails = snapshot.val();
        //         let userKey = snapshot.key
        //         console.log('userDetails', userDetails)
        //         console.log('userKey: ', userKey)
        //     } else {
        //         console.log("No data available");
        //     }
        //     }).catch((error) => {
        //     console.error(error);
        //     });
        // let userId = getAuth().currentUser.uid
        // const db = getDatabase();
        // const userRef = ref(db, 'users/');
        // onValue(userRef, (snapshot) => {
        //     console.log('snapshot raw: ', snapshot)
        //     let userDetails = snapshot.val();
        //     // let userKey = Object.keys(userDetails)
        //     let userKey = Object.keys(snapshot.val())[1];
        //     console.log('userDetails from get users: ', userDetails)
        //     console.log('userKey from get users: ', userKey)
        //     commit('addUser', {
        //         userKey,
        //         userDetails
        //     })
        // // updateStarCount(postElement, data);
        // });

        // onValue(userRef, (snapshot) => {
        //     let userDetails = snapshot.val();
        //     let userKey = snapshot.key
        //     commit('updateUser', {
        //         userKey,
        //         userDetails
        //     })
        //     window.localStorage
        // // updateStarCount(postElement, data);
        // });



    },

    logoutUser() {
        const auth = getAuth();
        signOut(auth).then(response => {
            console.log("response is :- ", response)

        }).catch((error) => {
            // An error happened.
            console.log("error is:- ", error)
        });
    }
    
}


export default {
    namespaced: true,
    getters,
    mutations,
    actions,
    state
}