
import { getAuth,
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from 'firebase/auth'
import {getDatabase, ref, set, get, child, onValue, update, push, onChildAdded, onChildChanged, off } from "firebase/database";
import 'firebase/auth'
import 'firebase/database'

let messagesRef



const state = {
    userDetails: {},
    users: {},
    messages: {}
}


const mutations = {
    setUserDetails (state, payload) {
        state.userDetails = payload
        },
    addUser(state, payload) {
        state.users[payload.userKey] = payload.userDetails
    },
    updateUser(state, payload) {
        Object.assign(state.users[payload.userKey], payload.userDetails)
    },
    addMessage(state, payload) {
        // state.users[payload.userKey] = payload.userDetails
        state.messages[payload.messageId] = payload.messageDetails
    },
    clearMessages(state){
        state.messages = {}
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
        return usersFiltered
    }
}


const actions = {
    registerUser ({}, payload) {
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
            // console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
    },
    
    handleAuthStateChanged({ commit, dispatch, state }) {
        const auth = getAuth();
        const db = getDatabase();
        
        onAuthStateChanged(auth, (user) => {
            if (user) { 
                let userId = getAuth().currentUser.uid
                return onValue(ref(db, '/users/' + userId), (snapshot) => {
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
        const updates = {};

        updates['/users/' + payload.userId + '/online'] = payload.online
        update(ref(db),updates)
    },

    firebaseGetUsers({ commit }) {
        const db = getDatabase();
        const usersRef = ref(db, 'users');

        // onValue(usersRef, (snapshot) => {
        //     snapshot.forEach((childSnapshot) => {
        //     const userKey = childSnapshot.key;
        //     const userDetails = childSnapshot.val();
        //     // ...
        //     console.log('child Key : ', userKey)
        //     console.log('child Data : ', userDetails)
        //     commit('addUser', {
        //         userKey,
        //         userDetails
        //     })
            
        // });
        // }, {
        // onlyOnce: true
        // });




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
    },

    logoutUser() {
        const auth = getAuth();
        signOut(auth).then(response => {

        }).catch((error) => {
            // An error happened.
            console.log("error is:- ", error)
        });
    },

    firebaseGetMessages({commit, state}, otherUserId){
        let userId = state.userDetails.userId
        let db = getDatabase();
        messagesRef = ref(db, 'chats/' + userId + '/' + otherUserId)
        onChildAdded(messagesRef, (data) => {
            let messageDetails = data.val()
            let messageId = data.key
            commit('addMessage', {
                messageId,
                messageDetails
            })
        });

    },

    firebaseStopGettingMessages({commit}) {
        if(messagesRef){
            // off(messagesRef)
            off(messagesRef)
            commit('clearMessages')
        }
    },
    firebaseSendMessage({}, payload) {
        const db = getDatabase();
        const chatRef = ref(db, 'chats/' + state.userDetails.userId + '/' + payload.otherUserId)
        const newChat = push(chatRef)
        set(newChat, payload.message)
        payload.message.from = 'them'
        const themChatRef =  ref(db, 'chats/' + payload.otherUserId + '/' + state.userDetails.userId)
        const themNewChat = push(themChatRef)
        set(themNewChat, payload.message )


    }
    
}


export default {
    namespaced: true,
    getters,
    mutations,
    actions,
    state
}