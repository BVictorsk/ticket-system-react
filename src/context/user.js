import { createContext, useEffect, useState } from "react";
import firebase from "../services/firebaseConfig";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        function loadStorage() {

            const storageUser = localStorage.getItem('UserSystem');
    
            if(storageUser) {
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }
    
            setLoading(false);
        }

        loadStorage();


    }, [])

    async function signUp(name, email, password) {
        setLoadingAuth(true);
        await firebase.auth().createUserWithEmailAndPassword(email, password).then(async (value) => {
            let uid = value.user.uid;

            await firebase.firestore().collection('users').doc(uid).set({
                name: name,
                avatarUrl: null,
            })
            .then(() => {
                let data = {
                    uid: uid,
                    name: name,
                    email: value.user.email, password,
                    avatarUrl: null
                };
                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
            });
        })
        .catch((error) => {
            console.log(error);setLoadingAuth(false);
        })
    }

    function storageUser(data) {
        localStorage.setItem('UserSystem', JSON.stringify(data));
    }

    async function signOut() {
        await firebase.auth().signOut();
        localStorage.removeItem('UserSystem');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, loading, signUp, signOut }} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider; 



