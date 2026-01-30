import {Footer} from './components.styled/index.styled'
import React from 'react'



export const FooterComponent:React.FC<React.PropsWithChildren> = ()=>{
    
   return(
      <Footer  >
        <div className='table-div'>
           <table>
            <thead>
               <tr>
                 <th>
                <ul>
                <li>
                    <img  width="28px"  src="facebook_icon.png" alt="logo" />
                </li>
                <li>
                     <img width="28px" src="youtube_icon.png" alt="logo" />
                </li>
            </ul>
                </th>
               </tr>
            </thead>
              <tbody>
                  <tr>
                   <td>Audio Description</td>
                  <td>Help Centre</td>
                  <td>Gift Cards</td>
                  <td>Media Centre</td>
                 </tr>
                  <tr>
                   <td>Investor Relations</td>
                  <td>Jobs</td>
                  <td>Terms of use</td>
                  <td>Privacy</td>
                 </tr>
                   <tr>
                   <td>Legal Notices</td>
                  <td>Corporate Information</td>
                  <td>Contact Us</td>
                  <td>Cookies Preference</td>
                 </tr>
                 
              </tbody>
           </table>
        </div>
        <div className='copyright-div'>
                <p>
                    Copyright &copy; 1997-2025 Netflix. This website and its contents are protected by international copyright laws.
                </p>
        </div>
     </Footer>
   )
}
