import { useContext, useEffect, useState } from "react";
import FabricContext from "./FabricContext";

const DrawRect = (props) =>{

    const canvas = useContext(FabricContext);
    // const [isDrawing, setIsDrawing] = useState(false);
    let isDrawing=false;
    let rect;

    useEffect(() => {
        if (!canvas.current) return;
      }, []);

    const mouseDownHandler = (options) => {
          if (!isDrawing) {
              isDrawing = true;
              // setIsDrawing(true);
            const pointer = canvas.current.getPointer(options.e);
            const { x, y } = pointer;
    
            rect = new fabric.Rect({
              left: x,
              top: y,
              strokeWidth: 1,
              stroke: 'black',
              fill: 'transparent',
            });
    
            canvas.current.add(rect);
          } else {
            rect.setCoords();
            isDrawing = false;
            canvas.current.off('mouse:down', mouseDownHandler);
            canvas.current.off('mouse:move', mouseMoveHandler);
            props.setIsRect(false);
          // setIsDrawing(false);
          }
        }

    const mouseMoveHandler = (options) => {
          if (isDrawing) {
            const pointer = canvas.current.getPointer(options.e);
            const { x, y } = pointer;
            const width = x - rect.left;
            const height = y - rect.top;
            rect.set({ width, height });
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
  
    //       rect = new fabric.Rect({
    //         left: x,
    //         top: y,
    //         strokeWidth: 2,
    //         stroke: 'black',
    //         fill: 'transparent',
    //       });
  
    //       canvas.current.add(rect);
    //     } else {
    //       isDrawing = false;
    //     // setIsDrawing(false);
    //     }
    //   });
    // canvas.current.on('mouse:move', (options) => {
    //     if (isDrawing) {
    //       const pointer = canvas.current.getPointer(options.e);
    //       const { x, y } = pointer;
    //       const width = x - rect.left;
    //       const height = y - rect.top;
    //       rect.set({ width, height });
    //       canvas.current.renderAll();
    //     }
    //   });

    return null;
}

export default DrawRect;