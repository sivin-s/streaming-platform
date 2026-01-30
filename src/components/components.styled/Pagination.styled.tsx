import styled from "styled-components";


export const Pagination = styled.div`
    width: 18rem;
    height: 2.6rem;
    display:  flex;
    justify-content: center;
    flex: 1;
    background-color: hsl(72, 14%, 7%);
    svg {
        color: aliceblue;
        margin: 0 auto;
    }
    .next-btn{
        width: 3.5rem;
        height: 100%;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        border: 1px solid aliceblue;
        cursor: pointer;
    }
     .prev-btn{
       
          width: 3.5rem;
        height: 100%;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
          border: 1px solid aliceblue;
          cursor: pointer;
    }

    span{
        border: 1px solid aliceblue;
        text-align: center;
        width: 2.5rem;
        height: 100%;
        padding-top: 0.4rem;
        font-size: medium;
        font-weight: bold;
        color: aliceblue;
        cursor: pointer;
    }
`