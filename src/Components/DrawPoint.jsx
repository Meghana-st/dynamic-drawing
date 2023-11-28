import { useContext, useEffect, useState } from "react";
import FabricContext from "./FabricContext";

const DrawPoint = (props) =>{

    const canvas = useContext(FabricContext);
    // const [isDrawing, setIsDrawing] = useState(false);
    let point;

    useEffect(() => {
        if (!canvas.current) return;
      }, []);

    const mouseDownHandler = (options) => {
       
          const pointer = canvas.current.getPointer(options.e);
          const { x, y } = pointer;
  
          point = new fabric.Circle({
            left: x,
            top: y,
            strokeWidth: 1,
            stroke: 'black',
            radius: 1,
          });
  
          canvas.current.add(point);
          point.setCoords();
          canvas.current.off('mouse:down', mouseDownHandler);
          props.setIsPoint(false);
      }

    canvas.current.on('mouse:down', mouseDownHandler);

      // canvas.current.on('mouse:down', (options) => {
       
      //     const pointer = canvas.current.getPointer(options.e);
      //     const { x, y } = pointer;
  
      //     point = new fabric.Circle({
      //       left: x,
      //       top: y,
      //       strokeWidth: 2,
      //       stroke: 'black',
      //       radius: 1,
      //     });
  
      //     canvas.current.add(point);
      // });

    return null;
}

export default DrawPoint;