import styled from "styled-components";


export const Section = styled.section`
    height: 100vh;
    position: absolute;
    inset: 0;
    z-index: 2;
    /* background-color: hsl(72, 14%, 7%); */
    background: linear-gradient(1deg,rgba(19, 20, 15,1) 14%, rgba(255, 255, 255, -30) 150%);

    .desc-and-btn-div{
        margin: 33rem 0 0 5rem;
        width: 40rem;
        height: 7.5rem;
    }
    .desc{
      
        width: inherit;
        height: 3.5rem;
        overflow: hidden;
       text-overflow: ellipsis;
        /* display: inline-block; */
        white-space: nowrap;
        font-size: 1.8rem;
        font-weight: 500;
        color: aliceblue;
    }


    .btns-div{
        width: 16rem;
        height: 3.9rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .btns-div .btn-1{
        width: 7rem;
        height: 2.6rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6%;
        background-color: aliceblue;
    }


     .btns-div .btn-2{
       width: 7.6rem;
        height: 2.8rem;
        text-align: center;
        border-radius: 6%;
        /* background-color: aliceblue; */
    }
   
`