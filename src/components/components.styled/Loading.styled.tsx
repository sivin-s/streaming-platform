import styled, { keyframes } from 'styled-components'
// import icon from '../../assets/loading.svg'


//  creating svg component
const SvgComponent  = styled.svg.attrs({
    role:"img",
     viewBox:"0 0 24 24",
    xmlns:"http://www.w3.org/2000/svg",
    fill: '#E50914',
})`
  /* style applying.. */
  width: 6rem;
`

const LoadingComponent = ({className, ...props}: {className?: string; [key: string]: any})=>{
    return(
         <div>
             <SvgComponent  className={className} {...props}>
            <title>Netflix</title>
            <path d="m5.398 0 8.348 23.602c2.346.059 4.856.398 4.856.398L10.113 0H5.398zm8.489 0v9.172l4.715 13.33V0h-4.715zM5.398 1.5V24c1.873-.225 2.81-.312 4.715-.398V14.83L5.398 1.5z"/>
            </SvgComponent>
         </div>
    )
}


// animation 
const scaleAndRotate = keyframes`
    to{
        transform: scale(0.8);
    }from{
        transform: scale(1.7);
    }
`
//    export loading component ..............
export const Loading =  styled(LoadingComponent)`
    animation: ${scaleAndRotate} 3s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite alternate-reverse;
    transform-origin: center;
`