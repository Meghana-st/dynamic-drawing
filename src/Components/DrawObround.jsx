import { useContext, useEffect, useState } from "react";
import FabricContext from "./FabricContext";

const DrawObround = () =>{

    const canvas = useContext(FabricContext);
    // const [isDrawing, setIsDrawing] = useState(false);
    let isDrawing=false;
    let obround;

    useEffect(() => {
        if (!canvas.current) return;
      }, []);

      canvas.current.on('mouse:down', (options) => {
        if (!isDrawing) {
            isDrawing = true;
            // setIsDrawing(true);
          const pointer = canvas.current.getPointer(options.e);
          const { x, y } = pointer;
  
          obround = new fabric.Rect({
            left: x,
            top: y,
            strokeWidth: 2,
            stroke: 'black',
            fill: 'transparent',
            rx:1,
            ry:1
          });
  
          canvas.current.add(obround);
        } else {
          isDrawing = false;
        // setIsDrawing(false);
        }
      });
    canvas.current.on('mouse:move', (options) => {
        if (isDrawing) {
            console.log("in");
          const pointer = canvas.current.getPointer(options.e);
          const { x, y } = pointer;
          const width = x - obround.left;
          const height = y - obround.top;
          obround.set({ width, height, rx:height/2, ry:width/2 });
          canvas.current.renderAll();
        }
      });

    return null;
}

export default DrawObround;