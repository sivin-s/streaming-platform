import {useState} from 'react'
import {LoginComponent,SignUpComponent} from '../components/index.components'

export const LoginAndSignUpPage = ()=>{
   const [isLogin, setIsLogin] = useState(true)
     function toggleForm(){
        setIsLogin((prev)=> !prev)
     }
 
    return(
        <div style={{
            backgroundImage: "url('bg_img.jpg')",
            maxWidth: "100%",
            height: "100vh",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
              position: "absolute",
            zIndex: -1,
            inset: "0"
        }}>
         <div style={{
            backgroundColor: "hsla(72, 14%, 7%, 65%)",
            position: "inherit",
            zIndex: 5,
            inset:"inherit",
            display: "flex",
            justifyContent: "center",
            alignItems:"center",
            maxWidth: "inherit",
            height: "inherit",
         }}>
             {
            isLogin ? <LoginComponent isSwitch={toggleForm}/> : <SignUpComponent isSwitch={toggleForm}/>
           }
         </div>
        </div>
    )
}