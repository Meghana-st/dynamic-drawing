import { useContext, useEffect, useState } from "react";
import FabricContext from "./FabricContext";

const DrawCircle = (props) =>{

    const canvas = useContext(FabricContext);
    // const [isDrawing, setIsDrawing] = useState(false);
    let isDrawing=false;
    let circle;

    useEffect(() => {
        if (!canvas.current) return;
      }, []);

      const mouseDownHandler = (options) => {
        if (!isDrawing) {
          const pointer = canvas.current.getPointer(options.e);
          const { x, y } = pointer;
  
          circle = new fabric.Circle({
            left: x,
            top: y,
            strokeWidth: 1,
            stroke: 'black',
            radius: 1,
            fill: 'transparent'
          });
  
          canvas.current.add(circle);
          isDrawing = true;
  
          // Detach event listeners after drawing one circle
          // canvas.current.off('mouse:down', mouseDownHandler);
          // canvas.current.off('mouse:move', mouseMoveHandler);
        } else {
          // console.log(circle);
          circle.setCoords();
          isDrawing = false;
          canvas.current.off('mouse:down', mouseDownHandler);
          canvas.current.off('mouse:move', mouseMoveHandler);
          props.setIsCircle(false);
        }
      };
  
      const mouseMoveHandler = (options) => {
        if (isDrawing) {
          const pointer = canvas.current.getPointer(options.e);
          const { x, y } = pointer;
          const radius = Math.sqrt((x - circle.left) ** 2 + (y - circle.top) ** 2);
  
          circle.set({ radius });
          canvas.current.renderAll();
        }
      };
  
      canvas.current.on('mouse:down', mouseDownHandler);
      canvas.current.on('mouse:move', mouseMoveHandler);

    //   canvas.current.on('mouse:down', (options) => {
    //     if (!isDrawing) {
    //         isDrawing = true;
    //         // setIsDrawing(true);
    //       const pointer = canvas.current.getPointer(options.e);
    //       const { x, y } = pointer;
  
    //       circle = new fabric.Circle({
    //         left: x,
    //         top: y,
    //         strokeWidth: 2,
    //         stroke: 'black',
    //         radius: 1,
    //         fill: 'transparent',
    //         selectable: true,
    //       });
  
    //       canvas.current.add(circle);
    //     } else {
    //       isDrawing = false;
    //     // setIsDrawing(false);
    //     }
    //   });
    // canvas.current.on('mouse:move', (options) => {
       
    //     if (isDrawing) {
    //       const pointer = canvas.current.getPointer(options.e);
    //       const { x, y } = pointer;
    //       const radius = Math.sqrt((x - circle.left) ** 2 + (y - circle.top) ** 2);
    //       circle.set({ radius });
    //       canvas.current.renderAll();
    //     }
    //   });

    return null;
}

export default DrawCircle;