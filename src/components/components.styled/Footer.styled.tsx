import styled from "styled-components";



export const Footer = styled.footer`
   max-width: 100%;
   display: flex;
   align-items: center;
   justify-content: center;
   flex-direction: column;
   height: 19rem;
   background-color: hsl(72, 14%, 7%);
   color: aliceblue;
   .table-div{
    
     width: 100%;
    height: 10.7rem;
     margin-bottom: 0.5rem;
     display: flex;
     align-items: center;
     justify-content: center;
   }
   .table-div table{
     border-collapse: collapse;
     width: 53rem;
     height: inherit;
     font-size: 1.1rem;
     font-weight: 500;
   }

   .table-div th > ul{
      display: flex;
      list-style: none;
   }
     .table-div th > ul > li{
      padding: 8px;
   }
   .copyright-div{
    font-size: 0.7rem;
    margin-top: 2rem;
   }
`