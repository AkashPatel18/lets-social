import React from 'react'
import CreatePost from './components/createPost'
import Heading from './components/heading'
import { UserContextProvider } from './context/user'
import Footer from './components/footer'

import Home from './components/home'

const App = () => {
    return (<>
    <UserContextProvider>
        <Heading />
        <CreatePost/>
        <Home />
        <Footer />
    </UserContextProvider>
    </>)

}

export default App