import { Route , Routes } from 'react-router-dom'
import SignUpForm from './_auth/forms/SignUpForm'
import {AllUsers, CreatePost, EditPost, Explore, Home, PostDetail, Profile, Saved, UpdateProfile} from './_root/pages'
import './globals.css'
import SignInForm from './_auth/forms/SignInForm'
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'
import { Toaster } from "@/components/ui/toaster"


const App = () => {
  return (
   <main className='flex h-screen '>
    
    <Routes>
    {/* {public routes} */}
   
   
    <Route element={<AuthLayout />} >
    <Route path='/sign-up' element={<SignUpForm />} />
    <Route path='/sign-in' element={<SignInForm />} />
    </Route>

    {/* {Private Routes} */}

    <Route element={<RootLayout/> }>
        <Route index element={<Home/>} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/saved' element={<Saved />} />
        <Route path='/all-users' element={<AllUsers />} />
        <Route path='/create-post' element={<CreatePost />} />
        <Route path='/update-post/:id' element={<EditPost />} />
        <Route path='/posts/:id' element={<PostDetail />} />
        <Route path='/profile/:id/*' element={<Profile />} />
        <Route path='/update-profile/:id' element={<UpdateProfile />} />


    </Route>


    </Routes>
    <Toaster />

   </main>
  )
} 

export default App
