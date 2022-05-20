import React, { useEffect, useRef, useState } from 'react'

const CanvasDrawing = () => {
     const canvasRef = useRef(null);
     const contextRef = useRef(null)
     const [isDrawing, setIsDrawing] = useState(false);
     const [image, setImage] = useState(null)
     const [text, setText] = useState('')

     useEffect(() => {
         const catImage =  new Image();
         catImage.src = 'https://thiscatdoesnotexist.com/'
         catImage.onload = () => setImage(catImage)
     }, [])
    useEffect(() => {
       if(canvasRef && image){
        const canvas = canvasRef.current

        const ctx = canvas.getContext("2d")
        ctx.fillStyle= 'black'
        ctx.fillRect(0, 0, 400, 256+80)
        ctx.drawImage(image,(400-256)/4,30)

        ctx.font = '20px Comic Sans MS'
        ctx.fillStyle = 'white'
        ctx.textAlign = 'center'

        ctx.fillText(text,200,25)
       }
    }, [image,canvasRef, text]);

/*      const startDrawing=({nativeEvent})=>{
         const {offsetX:x, offsetY:y} = nativeEvent
        contextRef.current.beginPath();
        contextRef.current.moveTo(x,y)
        setIsDrawing(true)
     }
    const finishDrawing=()=>{
        contextRef.current.closePath()
        setIsDrawing(false)
    }
    const drawing=({nativeEvent})=>{
        if(!isDrawing){
            return;
        }
        const {offsetX:x, offsetY:y} = nativeEvent
        contextRef.current.lineTo(x,y)
        contextRef.current.stroke()
    } */
    return (
        <div>
{/*             <canvas  
            
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={drawing}
            ref={canvasRef}
            /> */}
            <canvas
            style={{backgroundColor:'pink', border:'1px solid black'}}
            ref={canvasRef}
            id="clock" width="400" height={256+80}>
</canvas>
<input value={text} onChange={e=> setText(e.target.value)} />
        </div>
    )
}

export default CanvasDrawing
