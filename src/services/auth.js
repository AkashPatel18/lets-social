import { auth , provider } from "../firebase/firebase"

const signInWithGoogle = async () => {

    let user

    await auth.signInWithPopup(provider)
    .then((res) => {
        console.log(res.user);
        user = res.user
        

    }).catch((err) => {
        console.log(err.message);
    })

    return user

} 

export const logout = async () => {
    let logoutSucess ;

    await auth.signOut()
    .then(() => {
        logoutSucess = true
    }).catch((err) => {
        console.log(err);
    })

    return logoutSucess
}

export default  signInWithGoogle