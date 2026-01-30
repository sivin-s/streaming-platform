import styled from "styled-components";


export const Card = styled.div`
    flex: 0 0 auto;
    width: 15rem;
    height: 10.5rem;
    border-radius: 3%;
    position: relative;
    cursor: pointer;
    img{
         border-radius: 3%;
     min-width: 100%;
     height: 100%;
      object-fit: cover;
    }
    /* title (popup) */
    &:hover::after{
        content: attr(data-title);
        position: absolute;
        top: 60px;
        left: 200px;
        transform: translateX(-50%);
        background-color: #222;
        padding: 6px 12px;
        border-radius: 4px;
        font-size: 0.85rem;
        white-space: nowrap;
        z-index: 10;
        opacity: 1;
        transition: opacity 0.2s ease;
        color: aliceblue;
    }

    /* .s-2-div .profile-div::after{
        opacity: 0;
        pointer-events: none;
    } */
/* .... */

`