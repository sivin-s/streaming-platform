import styled from "styled-components";

export const FallBack404 = styled.div`
    height: 100vh;
    width: 100%;
    background-color: hsl(72, 14%, 7%);
     display: flex;
        align-items: center;
        justify-content: center;
    div{
        width: 40rem;
        height: 15rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 11px 0px;
    }
    h1{
        color: hsl(0, 55%, 43%);
        font-size: 5rem;
    }
    span{
        font-size: 1.6rem;
    }
    p{
        color: #f0f8ff68
    }
    .n-span{
        color:  hsl(0, 55%, 43%);
         font-size: 1.3rem;
         font-weight: 700;
    }
`