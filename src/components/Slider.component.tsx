// import {Styled_div} from './Slider.styled'
import { useState,useEffect } from "react"

export const SliderComponent =()=>{
    const [currentSlide,setCurrentSlide] =useState(0);
    //! temp dummy data..
    const slides=[
        {
            id:1,
            img:'https://shorturl.at/rFXVA',
            alt:'slide 1'
        },
        {
            id:2,
            img:'https://shorturl.at/rFXVA',
            alt:'slide 1'
        },
        {
            id:3,
            img:'https://shorturl.at/rFXVA',
            alt:'slide 1'
        },
    ]

    useEffect(()=>{
        const interval = setInterval(()=>{
             setCurrentSlide((prev)=>(prev+1)%slides.length)
        },3000)
        return ()=> clearInterval(interval)
    },[slides.length])

   
    return(
        <>
        {/* <Styled_div/> */}
        <div className="absolute border-2 border-red-600  left-0 right-0 -z-50  w-full h-screen  overflow-hidden bg-[#09090b]">
             {slides.map((slide,i)=>(
                <div
                key={slide.id}
                className={`absolute inset-0 w-full h-full transition-transform duration-1000 ease-in-out ${i===currentSlide ? "translate-x-0":"translate-x-full"}`}
                >
                    <img
                    src={slide.img}
                    alt={slide.alt}
                    className="w-full h-full object-cover"
                    />
                </div>
             ))}
             {/*Dots indicator*/}
             {/*
             Note: ⚠️  don't use index as 'key'
             */}
             <div className="absolute gap-x-7  flex min-w-[20rem] h-11 z-50 bottom-44  right-12 transform   space-x-2">
                
                 <div className="items-center w-full h-full flex">
                 {slides.map((_,i)=>(
                    <div key={i}
                    className={`w-10 h-1 rounded-full transition-colors ${i===currentSlide?'bg-green-500':'bg-blue-950'}`}
                    >  
                    </div>
                  ))}
                 </div>
                 <div className="w-1/2 h-full">
                     <button className="border-2 border-green-500  w-full rounded-md h-full font-semibold text-white">More</button>
                  </div>
             </div>

        </div>
        </>
    )
}