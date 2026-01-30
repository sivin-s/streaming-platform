import styled from "styled-components";



export const CardSection = styled.div`
   height: 15rem;
   margin-bottom:  1.3rem;
   .heading-div{
     height: 3.5rem;
     background-color: hsl(72, 14%, 7%);
     display: flex; 
     align-items: center;
     justify-content: space-between;
   }
   .heading-div h1{
    color: aliceblue;
     font-size: 2rem;
     font-weight: bold;
     margin-left: 1.5rem;
   }
   .heading-div button{
     color: aliceblue;
      margin-right: 2rem;
      outline: none;
      border: none;
      cursor: pointer;
   }
   .card{
     margin-top: 0.8rem;
     margin-left: 1.5rem;
     /* border: 1px solid aliceblue; */
     cursor: pointer;
   }



   .card-scrolling-div{
       height: 11.4rem;
       max-width: 100%;
       display: inline-flex;
       /* flex-wrap: nowrap; */
       align-items: center;
       gap: 0 5px;
       overflow-x: auto;
       overflow-y: hidden;
       scroll-behavior: smooth;
       background-color: hsl(72, 14%, 7%);
       /* scroll hiding */
       -ms-overflow-style: none;
       scrollbar-width: none;
       &::-webkit-scrollbar{
          display: none;
       }
   }
`