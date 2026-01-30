import styled from "styled-components";

export const SignUpForm = styled.div`
/* start  */

   width: 27rem;
   height: 34rem;
   padding:  3rem;
   display: flex;
   flex-direction: column;
   gap: 2rem 0;
   justify-content: space-between;
   border-radius: 0.8rem;
   background-color: hsla(72, 14%, 7%, 95%);

   .heading-div{
      width: 100%;
      height: 3rem;
      font-size: 2rem;
      color: aliceblue;
   }

   .input-and-btn-div{
         height: 20rem;
         display: flex;
         flex-direction: column;
         justify-content: space-between;
        
   }

  .input-and-btn-div > button{
    font-size: 0.900rem;
    height: 3.3rem;
    font-weight: bold;
    width: 100%;
      border-radius: 0.5rem;
      background-color: hsl(357, 92%, 47%);
      color: aliceblue;
      border: none;
      outline: none;
  }


   .form-footer-div{
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 4.5rem;
          font-weight: 200;
        color: aliceblue;
   }
   
   input[type="text"], input[type='email'], input[type='password']{
      font-size: 1rem;
      height: 3.3rem;
      width: 100%;
      padding: 0 0.9rem;
      border-radius: 0.5rem;
       border: none;
       outline: none;
       background-color: #333333;
       color: aliceblue;
       font-weight: lighter;
   }

  /* end  */
`