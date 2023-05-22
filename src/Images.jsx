import React, { useState, useEffect,startTransition,useTransition} from 'react'
//+import { , animated, config, useSpring } from 'react-spring'
import axios from 'axios';
import {Button} from '@mui/material';



const Images=()=>{
    const[images, setImages]=useState([]);
    const[showImages,setShowImages]=useState(false);
    const[buttonAvailble,setButtonAvalable]=useState(false);
    const[isPending,startTransition]=useTransition();

    useEffect(()=>{
        if(isPending){
            setButtonAvalable(true);
        }
    },[isPending]);

    const fetchImages=async ()=>{
       // setButtonAvalable(true);
       // setShowImages(true)
        const getI=await axios.get('https://jsonplaceholder.typicode.com/photos');
        setImages(getI.data);
        setButtonAvalable(false);
        // isPending(false)
        
    }

  

    const handleClickButton=()=>{
        setButtonAvalable(true);
        setShowImages(true);
        
        startTransition(()=>{fetchImages()})
       
    }
  

   
    return(
        <div>
            <Button onClick={handleClickButton} disabled={buttonAvailble} >to fetch images
            
            </Button>
           {isPending && <p style={{color:'red'}}>Updating pictures...</p>}
            {showImages &&(
                  <div> {images.map((image)=>(<img key={image.id} src={image.url} alt={image.title}/>) 
                
            )}
             </div>)}
         </div>
    );
}





export default Images;