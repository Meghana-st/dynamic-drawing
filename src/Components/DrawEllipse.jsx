import { useContext, useEffect, useState } from "react";
import FabricContext from "./FabricContext";

const DrawEllipse = (props) =>{

    const canvas = useContext(FabricContext);
    // const [isDrawing, setIsDrawing] = useState(false);
    let isDrawing=false;
    let ellipse;

    useEffect(() => {
        if (!canvas.current) return;
      }, []);

    const mouseDownHandler = (options) => {
          if (!isDrawing) {
              isDrawing = true;
              // setIsDrawing(true);
            const pointer = canvas.current.getPointer(options.e);
            const { x, y } = pointer;
    
            ellipse = new fabric.Ellipse({
              left: x,
              top: y,
              strokeWidth: 1,
              stroke: 'black',
              rx :1,
              ry:1,
              fill: 'transparent',
            });
    
            canvas.current.add(ellipse);
          } else {
            ellipse.setCoords();
            isDrawing = false;
            canvas.current.off('mouse:down', mouseDownHandler);
            canvas.current.off('mouse:move', mouseMoveHandler);
            props.setIsEllipse(false);
          // setIsDrawing(false);
          }
        }

    const mouseMoveHandler = (options) => {
       
          if (isDrawing) {
            const pointer = canvas.current.getPointer(options.e);
            const { x, y } = pointer;
            const radiusx = Math.abs(x - ellipse.left);
            const radiusy = Math.abs(y - ellipse.top);
            ellipse.set({ rx: radiusx, ry: radiusy });
            canvas.current.renderAll();
          }
        }

    canvas.current.on('mouse:down', mouseDownHandler);
    canvas.current.on('mouse:move', mouseMoveHandler);

    //   canvas.current.on('mouse:down', (options) => {
    //     if (!isDrawing) {
    //         isDrawing = true;
    //         // setIsDrawing(true);
    //       const pointer = canvas.current.getPointer(options.e);
    //       const { x, y } = pointer;
  
    //       ellipse = new fabric.Ellipse({
    //         left: x,
    //         top: y,
    //         strokeWidth: 2,
    //         stroke: 'black',
    //         rx :1,
    //         ry:1,
    //         fill: 'transparent',
    //       });
  
    //       canvas.current.add(ellipse);
    //     } else {
    //       isDrawing = false;
    //     // setIsDrawing(false);
    //     }
    //   });
    // canvas.current.on('mouse:move', (options) => {
       
    //     if (isDrawing) {
    //       const pointer = canvas.current.getPointer(options.e);
    //       const { x, y } = pointer;
    //       const radiusx = Math.abs(x - ellipse.left);
    //       const radiusy = Math.abs(y - ellipse.top);
    //       ellipse.set({ rx: radiusx, ry: radiusy });
    //       canvas.current.renderAll();
    //     }
    //   });

    return null;
}

export default DrawEllipse;