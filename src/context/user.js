import { createContext, useEffect, useState } from "react";
import firebase from "../services/firebaseConfig";
import { toast } from "react-toastify";

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

    //user login 
    async function signIn(email, password) {
        setLoadingAuth(true);
        await firebase.auth().signInWithEmailAndPassword(email, password).then(async (value) => {
            let uid = value.user.uid;

            const userProfile = await firebase.firestore().collection('users').doc(uid).get();

            let data = {
                uid: uid,
                name: userProfile.data().name,
                avatarUrl: userProfile.data().avatarUrl,
                email: value.user.email
            };
            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            toast.success('Bem vindo de volta')
        })
        .catch((error) => {
            console.error(error);
            toast.error('Ops, algo de errado!')
            setLoadingAuth(false);
        })
    }

    //register new user
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
                    email: value.user.email,
                    avatarUrl: null
                };
                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
                toast.success('Bem vindo a plataforma');
            });
        })
        .catch((error) => {
            console.log(error);
            toast.error('Ops, algo de errado!')
            setLoadingAuth(false);
        })
    }

    function storageUser(data) {
        localStorage.setItem('UserSystem', JSON.stringify(data));
    }

    //logout
    async function signOut() {
        await firebase.auth().signOut();
        localStorage.removeItem('UserSystem');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ 
            signed: !!user, user, loading, signUp, signOut, signIn,loadingAuth, setUser, storageUser
            }} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider; 

