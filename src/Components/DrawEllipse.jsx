import { useContext, useEffect, useState } from "react";
import FabricContext from "./FabricContext";

const DrawEllipse = () =>{

    const canvas = useContext(FabricContext);
    // const [isDrawing, setIsDrawing] = useState(false);
    let isDrawing=false;
    let ellipse;

    useEffect(() => {
        if (!canvas.current) return;
      }, []);

      canvas.current.on('mouse:down', (options) => {
        if (!isDrawing) {
            isDrawing = true;
            // setIsDrawing(true);
          const pointer = canvas.current.getPointer(options.e);
          const { x, y } = pointer;
  
          ellipse = new fabric.Ellipse({
            left: x,
            top: y,
            strokeWidth: 2,
            stroke: 'black',
            rx :1,
            ry:1,
            fill: 'transparent',
          });
  
          canvas.current.add(ellipse);
        } else {
          isDrawing = false;
        // setIsDrawing(false);
        }
      });
    canvas.current.on('mouse:move', (options) => {
       
        if (isDrawing) {
          const pointer = canvas.current.getPointer(options.e);
          const { x, y } = pointer;
          const radiusx = Math.abs(x - ellipse.left);
          const radiusy = Math.abs(y - ellipse.top);
          ellipse.set({ rx: radiusx, ry: radiusy });
          canvas.current.renderAll();
        }
      });

    return null;
}

export default DrawEllipse;