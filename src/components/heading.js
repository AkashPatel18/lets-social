import {React,useState,useContext} from 'react'
import { UserContext } from '../context/user'
import signInWithGoogle from '../services/auth'
// import { auth , provider } from "../firebase/firebase"

//css
import './heading.css'


const Heading = () => { 

    const [user,setUser] = useContext(UserContext).user


    const signInBtnClick = async () => {
        let userBySignIn = await signInWithGoogle();
        if(userBySignIn) setUser(userBySignIn)

}
        
    return (
    <>
        <div className="heading_bar">
            <h1 className="heading_h1"><b>Lets Social</b></h1>
            { user ? <img className="user_img"src={user.photoURL} alt=""></img> :
            <button onClick={signInBtnClick} className="signin_btn"><b>Sign in with Google</b></button>}
        </div>
    </>
    )
    }   
export default Heading
