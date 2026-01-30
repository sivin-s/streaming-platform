import {FallBack404} from './components.styled/index.styled'

export const FallBack404Component = ()=>{
    return(
        <>
          <FallBack404>
             <div>
                 <h1>404 <span>NOT FOUND 📽️</span></h1>
                 <p>Please wait it will Redirect in <span className='n-span'>2s</span></p>
             </div>
          </FallBack404>
        </>
    )
}