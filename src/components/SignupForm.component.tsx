import {SignUpForm} from './components.styled/index.styled'
import {auth} from '../firebase/firebaseConfig'
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {useReducer} from 'react'
import { toast } from 'react-toastify'
import {useNavigate} from 'react-router'

import  type {FormErrorsType,FormStateType} from '../types/FormStateAndErrorType'
import type {Action} from '../types/FormActionType'

interface SignUpComponent{
    isSwitch (): void
}


export const SignUpComponent:React.FC<React.PropsWithChildren<SignUpComponent>> = ({isSwitch})=>{

  // no useState() instead useReduces()  for form submission.
 const navigate = useNavigate()


 // helper for validation
const validateValues = (values: FormStateType): FormErrorsType=>{
 
  const errors: FormErrorsType  ={}
        if(!values.email.includes('@')){
          errors.email= 'Invalid email';
        }
        if(values.password.length < 6){
          errors.password = 'Password must be at least 6 characters'
        }
        if(!/^[a-zA-Z]+$/.test(values.userName || '')){
          errors.userName = 'Username must contain only letters';
        }
        return errors
}

 // useReducer start
 //  dispatch cb
  const formReducer = (
    state: {
      values: FormStateType;
      errors: FormErrorsType;
    },
    action: Action
  )=>{
    switch(action.type){
      case 'UPDATE_FIELD':
        // console.log('p>',action.field)
        return(
          {
            ...state, 
             values:{
              ...state.values,
              [action.field]: action.value
            }
          }
        )
      case 'VALIDATE':{
       const errors = action.errors ?? validateValues(state.values)
        return {
            ...state,
            errors,
          }
        
      }
      case 'RESET':
         return{
            values:{
              email: '',
              password: '',
              userName: ''
            },
            errors:{}
         }

      default: 
        return state;
    }
  }

  const [state, dispatch] = useReducer(formReducer,{values:{
    email: '',
    password:'',
    userName: ''
  },
    errors:{}
  })
  // useReducer end

    //  handle change
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
      dispatch(
        {        
          type: 'UPDATE_FIELD',  // keyof converts FormStateType (interface or type) to " type FormStateType = 'email' | 'userName' | 'password' " it act as a type guard.
          field: e.target.name as keyof FormStateType,  // type assertion treat as interface not string (it will act as 'type guard' the name. It acts like " type input='userName'|'email'|'password' " beyond no value support) like instead of password we use passwords it willn't support we want to use password.
          value: e.target.value?.trim()
        }
      )
    }

        // logic for firebase signup
    // handle submit
    const handleSubmit = async (e:React.FormEvent)=>{
      e.preventDefault()
      const errors = validateValues(state.values)
      dispatch({type: 'VALIDATE', errors});
      const hasErrors = Object.keys(state.errors).length > 0;
      if(!hasErrors){  // if error no request will go.
             try {
         const email = state?.values?.email;
          const userName = state?.values?.userName || '';
          const password = state?.values?.password;
         if(email && userName && password){
          const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(userCredential.user,{displayName: state?.values?.userName}) 
          toast.success(`✅  registered successfully`, {
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
        dispatch({type: 'RESET'})
        
        // navigator
           setTimeout(()=>{
                 navigate('/', {replace:true})
           },2000)
         }
         return;
       } catch (err: any) {
          console.log(err?.message)
         toast.error(`❌ already registered go to login`, {
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
     <SignUpForm>
       <div className='heading-div'>
         <h1>Sign Up</h1>
       </div>
       <div className='input-and-btn-div'>
            <input  name='userName' type="text" placeholder='Your name'  value={state?.values?.userName}     onChange={ handleChange}/>
            {state?.errors?.userName && <span  className='text-[#e50913] text-[0.7rem] m-1!'>{state?.errors?.userName}</span>} 
        <input name='email'  type="email" placeholder='Email' value={state?.values?.email}  onChange={handleChange} />
           {state?.errors?.email && <span className='text-[#e50913] text-[0.7rem] m-1!'>{state?.errors?.email}</span>}
        <input name='password' type="password" placeholder='Password' value={state?.values?.password}  onChange={handleChange} />
         {state?.errors?.password && <span className='text-[#e50913] text-[0.7rem] m-1!'>{state?.errors?.password}</span>}
        <button  className='cursor-pointer'  onClick={handleSubmit}>Sign Up</button>
       </div>
        <div className='form-footer-div'>
            <p>Already have an account?</p>
            <h4 style={{textDecoration: "underline",cursor:"pointer"}}    onClick={isSwitch}>Sign in Now</h4>
        </div>
    </SignUpForm>
    </>
   )
}