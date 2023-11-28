import { useContext, useEffect, useState } from "react";
import FabricContext from "./FabricContext";

const DrawLine = (props) =>{

    const canvas = useContext(FabricContext);
    let isDrawing=false;
    let line;
    
    useEffect(() => {
        if (!canvas.current) return;
      }, []);

    const mouseDownHandler = (options) => {
        
          if (!isDrawing) {
              
              isDrawing = true;
            const pointer = canvas.current.getPointer(options.e);
            const { x, y } = pointer;
    
            line = new fabric.Line([x,y,x,y],{
              strokeWidth: 1,
              stroke: 'black',
            });
    
            canvas.current.add(line);
          } else {
            line.setCoords();
            isDrawing = false;
            canvas.current.off('mouse:down', mouseDownHandler);
            canvas.current.off('mouse:move', mouseMoveHandler);
            props.setIsLine(false);
          }
        };

      const mouseMoveHandler = (options) => {

            if (isDrawing) {
              const pointer = canvas.current.getPointer(options.e);
              const { x, y } = pointer;
              line.set({ x2:x, y2:y });
              canvas.current.renderAll();
            }
          }
      
      canvas.current.on('mouse:down', mouseDownHandler);
      canvas.current.on('mouse:move', mouseMoveHandler);

    //   canvas.current.on('mouse:down', (options) => {
        
    //     if (!isDrawing) {
            
    //         isDrawing = true;
    //       const pointer = canvas.current.getPointer(options.e);
    //       const { x, y } = pointer;
  
    //       line = new fabric.Line([x,y,x,y],{
    //         strokeWidth: 2,
    //         stroke: 'black',
    //       });
  
    //       canvas.current.add(line);
    //     } else {
    //       isDrawing = false;
    //     }
    //   });
    // canvas.current.on('mouse:move', (options) => {

    //     if (isDrawing) {
    //       const pointer = canvas.current.getPointer(options.e);
    //       const { x, y } = pointer;
    //       line.set({ x2:x, y2:y });
    //       canvas.current.renderAll();
    //     }
    //   });

    return null;
}

export default DrawLine;