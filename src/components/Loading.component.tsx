import {Loading} from './components.styled/index.styled'

export const LoadingComponent = ()=>{
    return(<div style={
        {
            backgroundColor: "hsl(72, 14%, 7%)",
            height:"100vh",
            maxWidth: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            inset: 0,
            zIndex: 1000
        }
        }>
         <Loading/>
    </div>)
}