import styled  from "styled-components";

interface HeaderProps{
    $isScrolled?: boolean;
    $location?: string;
}

// export const Header = styled.header<HeaderProps>`
export const Header = styled.header<HeaderProps>`
    
    position: ${({$isScrolled,$location})=> ($location==='/watch-list'||($isScrolled)) ? 'sticky' :  'absolute' }; 
    inset: 0 0 0 0;
    z-index:  100;
    background-color: ${({$isScrolled})=> $isScrolled ? 'hsl(72, 14%, 7%)' : "transparent"};
    display: flex; 
    align-items: center;
    justify-content: space-around;
    max-width: 100%;
    height: 5rem;
    transition: background-color 0.3s ease;
    transition: position  linear;
    
    .s-1-div{
      
        display: flex;
    }
    .s-1-div  .img-div {
       
        width: 8rem;
        height: 3.5rem;
        display: flex;
        align-items: center;
    }
    .s-1-div img{
        width: 5.8rem;
    }
    .s-1-div  ul{
         
        display: flex;
        width: 38rem;
        height: 3.5rem;
        align-items: center;
        justify-content: space-between;
        list-style: none;
        color:  aliceblue;
        font-weight: 500;
    }
    .s-1-div li{
        cursor: pointer;
    }

   
    .s-2-div  ul{
        list-style: none;
        display: flex;
        width: 13rem;
        height: 3.5rem;
        align-items: center;
        justify-content: space-between;
        list-style: none;
    }
    .s-2-div li{
         cursor: pointer;
    }
    .s-2-div svg{
        fill: aliceblue;
        width: 1.6rem;
    }
    .s-2-div button{
      font-weight: 500;
      color: aliceblue;
      background-color: transparent;
      border: none;
      outline: none;
       cursor: pointer;
    }
  
    .s-2-div .profile-div{
        object-fit: fill;
        position: relative;
    }

     .s-2-div .profile-div img{
        border-radius: 3px;
     }

     .s-2-div .profile-div:hover::after{
        content: attr(data-title);
        position: absolute;
        top: 6px;
        left: 75px;
        transform: translateX(-50%);
        background-color: #222;
        padding: 6px 12px;
        border-radius: 4px;
        font-size: 0.85rem;
        white-space: nowrap;
        z-index: 10;
        opacity: 1;
        transition: opacity 0.2s ease;
    }

    .s-2-div .profile-div::after{
        opacity: 0;
        pointer-events: none;
    }

   
`
