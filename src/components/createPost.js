import {React,useContext,useState} from 'react'
import { UserContext } from '../context/user'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import './createPost.css'
import { Button } from '@material-ui/core';
import {db, storage} from '../firebase/firebase'
import makeid from '../helper/makeId'
import firebase from 'firebase'

const CreatePost = () => {

    const [user,setUser] = useContext(UserContext).user

    const [caption,setCaption] = useState("")

    const [image,setImage] = useState(null)

    const [progress,setProgress] =useState(0)

    const handleChange = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0])

            var url = URL.createObjectURL(e.target.files[0])
            var image_preview = document.getElementById("image_preview")

            image_preview.src = url
            console.log(url);
            image_preview.style.display = "block"

        }

    }

    const handleUpload = () => {
        
        if(image){
            var imageName =makeid(10)
            const uploadTask = storage.ref(`images/${imageName}.jpg`).put(image)

            uploadTask.on("state_changed", (snapshot) => {
                //progress
                const progress = Math.round((snapshot.bytesTransferred/
                    snapshot.totalBytes)*100)
                
                setProgress(progress)

            },(err) => {
                console.log(err)
            },() => {
                //get download url
                storage.ref("images").child(`${imageName}.jpg`)
                .getDownloadURL()
                .then((url) => {
                    db.collection("posts").add({
                        timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                        caption : caption,
                        photoUrl : url,
                        username : user.email.replace("@gmail.com",""),
                        userProfileUrl : user.photoURL,

                    })
                })

                setCaption("")
                setProgress(0)
                setImage(null)

                document.getElementById('image_preview').style.display="none"
            })

           
           
        }
        
    }


    return(<> 
        <div className="createPost">
            { user ? 
            <div className="post">
                <p>Create A Post</p>
                <div className="post_div">
                    <textarea className="textarea" rows="5" value={caption} placeholder="enter caption ..."
                    onChange={(e) => setCaption(e.target.value)}
                    ></textarea>
                </div>

                <div className="image_preview">
                    <img id="image_preview" alt="" value={image}></img>
                </div>

                <div className="post_bottom">

                <div className="image_upload_post">
                    <label htmlFor="fileInput">
                        <AddAPhotoIcon style={{ cursor:"pointer",
                        fontSize:"20px"}} />
                    </label>
                    <input type="file" 
                    id="fileInput"
                    accept="image/*" 
                    onChange={handleChange}
                    style = {{ display:"none" }}
                    name="image"   
                    ></input>
                </div>

                <div>
                    <button className="post_btn"
                    onClick={handleUpload}
                    style={{ color : caption || image ? "#000" : "Lightgrey"}}
                    >
                    {`Upload ${progress !=0 ? progress : ""}`}
                    </button>
                 </div>  
                 
                </div>
            </div>
            : 
            <p> to post & comment Signin with Google</p> }    
        </div>
    </>)
}

export default CreatePost