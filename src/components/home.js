import React,{useState,useEffect} from 'react'
import Post from './Post'
import  {db}  from '../firebase/firebase'
import './home.css'

const Home = () => {

    const [posts,setPosts] = useState([])

    useEffect(() => {
        db.collection("posts").onSnapshot((snapshot) => {
            setPosts(snapshot.docs.map((doc) => ({ id:doc.id,post:doc.data()})))
        })
    },[])
        
    return(<>
    <div className="home_feed">

   
  
    {posts.map(({id , post }) => {
        return (
        <Post
            key={id}
            id={id}
            photoURL={post.photoUrl}
            username = {post.username}
            caption={post.caption}
        />)
    })}

    </div>
    
  
    
    </>
    )
}

export default Home