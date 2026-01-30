import styled from "styled-components";

export const MovieDetails = styled.div`
    /* border: 3px solid red; */
    max-width: 100%;
    height: 40rem;
    width: 64rem;
    display: flex;
   .overview-text-div{  //truncate - ellipse
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
   }
`