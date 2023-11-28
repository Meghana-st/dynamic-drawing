import { useContext, useEffect, useState } from "react";
import FabricContext from "./FabricContext";

const DrawArc = (props) =>{

    const canvas = useContext(FabricContext);
    // const [isDrawing, setIsDrawing] = useState(false);
    let isDrawing=false;
    let arc;

    useEffect(() => {
        if (!canvas.current) return;
      }, []);

      const mouseDownHandler = (options) => {
        if (!isDrawing) {
          const pointer = canvas.current.getPointer(options.e);
          const { x, y } = pointer;
  
          arc = new fabric.Circle({
            left: x,
            top: y,
            strokeWidth: 1,
            stroke: 'black',
            radius: 1,
            fill: 'transparent',
            startAngle:0,
            endAngle:120,
            // angle:90
          });
  
          canvas.current.add(arc);
          isDrawing = true;
  
          // Detach event listeners after drawing one circle
          // canvas.current.off('mouse:down', mouseDownHandler);
          // canvas.current.off('mouse:move', mouseMoveHandler);
        } else {
          // console.log(circle);
          arc.setCoords();
          isDrawing = false;
          canvas.current.off('mouse:down', mouseDownHandler);
          canvas.current.off('mouse:move', mouseMoveHandler);
          props.setIsArc(false);
        }
      };
  
      const mouseMoveHandler = (options) => {
        if (isDrawing) {
          const pointer = canvas.current.getPointer(options.e);
          const { x, y } = pointer;
          const radius = Math.sqrt((x - arc.left) ** 2 + (y - arc.top) ** 2);
  
          arc.set({ radius });
          canvas.current.renderAll();
        }
      };
  
      canvas.current.on('mouse:down', mouseDownHandler);
      canvas.current.on('mouse:move', mouseMoveHandler);

    return null;
}

export default DrawArc;