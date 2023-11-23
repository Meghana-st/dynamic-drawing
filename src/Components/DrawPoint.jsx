import { useContext, useEffect, useState } from "react";
import FabricContext from "./FabricContext";

const DrawPoint = () =>{

    const canvas = useContext(FabricContext);
    // const [isDrawing, setIsDrawing] = useState(false);
    let point;

    useEffect(() => {
        if (!canvas.current) return;
      }, []);

      canvas.current.on('mouse:down', (options) => {
       
          const pointer = canvas.current.getPointer(options.e);
          const { x, y } = pointer;
  
          point = new fabric.Circle({
            left: x,
            top: y,
            strokeWidth: 2,
            stroke: 'black',
            radius: 1,
          });
  
          canvas.current.add(point);
      });

    return null;
}

export default DrawPoint;