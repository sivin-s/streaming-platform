import React, { useEffect, useState } from 'react'
import {Header} from './components.styled/index.styled'
import { useLocation,Link } from 'react-router'
import { useAuthContext } from '../hooks/useAuthContext'
import {signOut, getAuth} from 'firebase/auth'



export const HeaderComponent: React.FC<React.PropsWithChildren> = ()=>{
    const {user} = useAuthContext()
    // console.log(user?.displayName)
    // scrolling then header style change 
   const [isScrolled, setIsScrolled] = useState(false)
   const {pathname} = useLocation()  

useEffect(()=>{
     const handleScroll =()=>{
        setIsScrolled((window.scrollY > 900));
        // console.log(window.scrollY > 200)
        // console.log(window.scrollY)
     }
     window.addEventListener('scroll', handleScroll);
     return ()=> window.removeEventListener('scroll',handleScroll)
},[])

// handle the sign out
const handleSignOut = async()=>{
    const auth  = getAuth()
       await signOut(auth)
}


    //useLocation is for change the style  of when user the enters in wishlist page.
   
    // console.log(typeof pathname)
    // console.log(pathname==="/watch-list")

    return(<>
     <Header $location={pathname}   $isScrolled={isScrolled}>
        <div className='s-1-div'>
            <div className='img-div'>
                <img src="logo.png" alt="log" />
            </div>
            <ul>
               <li>
                <Link to="/">Home</Link>
              </li>
               <li>Tv shows</li>
               <li>Movies</li>
               <li>New & Popular</li>
               <li>My List</li>
               <li>Browse by language</li>
            </ul>
        </div>

        <div className='s-2-div'>
           <ul>
            <li>
                <button>
                    {/* search */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
                </button>
            </li>
            <li>
               <Link to='/watch-lists'>
                    <button>
                    {/* watch list  */}
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
</svg>

                </button> 
              </Link>
            </li>
            <li>
                <button>
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
</svg>

                </button>
            </li>
            <li>
                {/*logout*/}
                <button className='profile-div' data-title={`${user?.displayName} - sign out`} onClick={handleSignOut}>
                        <img src="profile_img.png" alt="img" />
                </button>
            </li>
           </ul>
        </div>
     </Header>
    </>)
}