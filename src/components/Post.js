import React,{useState,useContext} from 'react'
import { UserContext } from "../context/user" 
import {db,storage } from '../firebase/firebase'

import "./post.css"


const Post = ({ userprofileUrl,username,id,photoURL,caption,comments,time}) => {

    const [user,setUser] = useContext(UserContext).user


    const deletePost = () => {
        //delete from db

        //get refrence
        var imageRef = storage.refFromURL(photoURL) 
        if(imageRef){
        imageRef.delete().then(() => {
            console.log("delered");
        })
    }

        db.collection("posts").doc(id).delete().then(() => {
            console.log("deleted");
        })

        console.log(db.collection("posts").doc(id))
    }
    return (<>
        
            <div className="post">
               <p>{username}</p>
               <img src={photoURL} alt="" className="post_img"></img>
                <p>{time}</p>
               <p><b>{username}</b> <span>{caption}</span></p>
               {user ?

               <button onClick={deletePost} className="post_delete_btn">Delete</button>
               :
              <div></div> }
            </div>
        
    </>)
}

export default Post