import { useContext, useEffect, useState } from "react";
import FabricContext from "./FabricContext";

const DrawLine = () =>{

    const canvas = useContext(FabricContext);
    let isDrawing=false;
    let line;
    
    useEffect(() => {
        if (!canvas.current) return;
      }, []);

      canvas.current.on('mouse:down', (options) => {
        
        if (!isDrawing) {
            
            isDrawing = true;
          const pointer = canvas.current.getPointer(options.e);
          const { x, y } = pointer;
  
          line = new fabric.Line([x,y,x,y],{
            strokeWidth: 2,
            stroke: 'black',
          });
  
          canvas.current.add(line);
        } else {
          isDrawing = false;
        }
      });
    canvas.current.on('mouse:move', (options) => {

        if (isDrawing) {
          const pointer = canvas.current.getPointer(options.e);
          const { x, y } = pointer;
          line.set({ x2:x, y2:y });
          canvas.current.renderAll();
        }
      });

    return null;
}

export default DrawLine;