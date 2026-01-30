
import {LoginForm} from './components.styled/index.styled'
import React, { useEffect, useReducer } from 'react';
import type  {FormErrorsType,FormStateType} from '../types/FormStateAndErrorType'
import type  {Action} from '../types/FormActionType'
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import {useAuthContext} from '../hooks/useAuthContext'

interface LoginComponentProps{
    isSwitch (): void 
}

export const LoginComponent:React.FC<React.PropsWithChildren<LoginComponentProps>> = ({isSwitch})=>{

    const navigate = useNavigate()

    // auth consumer hook
    const {user} = useAuthContext()


   
 
    // helper state value validate
    const  validateValues = (values: FormStateType):FormErrorsType=>{
        const errors: FormErrorsType = {}
        if(!values.email.includes('@') || values.password.length < 6){
          errors.email= 'Invalid email';
          errors.password = 'Password must be at least 6 characters'
        }   
        return errors
    }

    // reducer dispatch cb
   const formReducer = (
    state:{
        values: FormStateType,
        errors: FormErrorsType
    },
    action: Action
   )=>{
      switch(action.type){
        case 'UPDATE_FIELD':
            return {
                ...state, values:{
                    ...state.values,
                    [action.field] : action.value
                }
            }
        case 'VALIDATE':{
              const errors = action.errors ?? validateValues(state.values)
            return {
                ...state,
                errors
            }
        }
        case 'RESET':{
            return{
                values:{
                    email:'',
                    password:''
                },
                errors:{}
            }
        }
        default:
            return state
      }
   }

   const [state, dispatch] = useReducer(formReducer,{values:{
    email: '',
    password: ''
   },errors:{}})

   const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
         dispatch({
            field: e.target.name as keyof FormStateType,
            type: 'UPDATE_FIELD',
            value: e.target.value?.trim()
         })
   }

   const handleSubmit = async(e:React.MouseEvent<HTMLButtonElement>)=>{
     e.preventDefault()
     const errors = validateValues(state.values)
     dispatch({
       type: 'VALIDATE',
       errors
     })
     const hasError = Object.keys(state.errors).length > 0
     if(!hasError){
        // submit
        try {
            const email = state.values.email;
            const password = state.values.password;
            if(email && password){
                await setPersistence(auth,browserLocalPersistence)
                 await signInWithEmailAndPassword(auth, email, password)
                    
                     toast.success(`✅  login  successfully`, {
                            position: "top-right",
                            autoClose: 4000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                            // transition:' Flip',
                        })
                        // reset state
                        // setUser({displayName: , uid: })
                        dispatch({type:"RESET"})
                setTimeout(()=>{
                       navigate('/',{replace:true})
                },2000)
                console.log(user)
            }
            return;
        } catch (err:any) {
             toast.error(`❌ login failed check the credentials`, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            // transition:' Flip',
        })
        return;
        }
     }
   }


    return(
     <>
         <LoginForm>
          <div className='heading-div'>
         <h1>Sign In</h1>
       </div>
       <div className='input-and-btn-div'>
        <input name="email" type="email" placeholder='Email' onChange={handleChange}   value={state.values.email}/>
        {state.errors.email &&  <span  className='text-[#e50913] text-[0.7rem] m-1!'>{state?.errors?.email}</span>}
        <input name="password" type="password" placeholder='Password' onChange={handleChange} value={state?.values?.password}/>
                {state.errors.password &&  <span  className='text-[#e50913] text-[0.7rem] m-1!'>{state?.errors?.password}</span>}

        <button  onClick={handleSubmit} className='cursor-pointer'>Sign In</button>
       </div>
        <div className='form-footer-div'>
            <p>New to Netflix?</p>
            <h4 style={{textDecoration: "underline",cursor:"pointer"}}  onClick={isSwitch}>Sign up</h4>
        </div>
      </LoginForm>
     </>
    )
}