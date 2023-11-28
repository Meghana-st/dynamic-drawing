import { useContext, useEffect, useState } from "react";
import FabricContext from "./FabricContext";

const DrawPolyline = (props) =>{

    const canvas = useContext(FabricContext);
    let isDrawing=false;
    let polyline;
    
    useEffect(() => {
        if (!canvas.current) return;
      }, []);

    const mouseDownHandler = (options) => {
          if (!isDrawing && !polyline) {
              
              isDrawing = true;
            const pointer = canvas.current.getPointer(options.e);
            const { x, y } = pointer;
    
            polyline = new fabric.Polyline([{x,y}, {x,y}],{
              strokeWidth: 1,
              stroke: 'black',
              fill:'transparent'
            });
    
            canvas.current.add(polyline);
          }
          if (isDrawing && polyline) {
            const pointer = canvas.current.getPointer(options.e);
            const { x, y } = pointer;
            polyline.set({ points:[...polyline.points, {x,y}] });
            canvas.current.renderAll();
          }
        }

    const mouseMoveHandler = (options) => {

          if (isDrawing) {
              const pointer = canvas.current.getPointer(options.e);
              const { x, y } = pointer;
              const updatedPoints = [...polyline.points.slice(0,-1), {x,y}];
              polyline.set({ points: updatedPoints});
              canvas.current.renderAll();
          }
        }

    const mouseDblClickHandler = ()=>{
          console.log(polyline);
          polyline.setCoords();
          isDrawing = false;
          canvas.current.off('mouse:down', mouseDownHandler);
          canvas.current.off('mouse:move', mouseMoveHandler);
          canvas.current.off('mouse:dblclick', mouseDblClickHandler);
          props.setIsPolyline(false);
      }

    canvas.current.on('mouse:down', mouseDownHandler);
    canvas.current.on('mouse:move', mouseMoveHandler);
    canvas.current.on('mouse:dblclick', mouseDblClickHandler);

    //   canvas.current.on('mouse:down', (options) => {
    //     if (!isDrawing && !polyline) {
            
    //         isDrawing = true;
    //       const pointer = canvas.current.getPointer(options.e);
    //       const { x, y } = pointer;
  
    //       polyline = new fabric.Polyline([{x,y}, {x,y}],{
    //         strokeWidth: 2,
    //         stroke: 'black',
    //         fill:'transparent'
    //       });
  
    //       canvas.current.add(polyline);
    //     }
    //     if (isDrawing && polyline) {
    //       const pointer = canvas.current.getPointer(options.e);
    //       const { x, y } = pointer;
    //       polyline.set({ points:[...polyline.points, {x,y}] });
    //       canvas.current.renderAll();
    //     }
    //   });
    // canvas.current.on('mouse:move', (options) => {

    //     if (isDrawing) {
    //         const pointer = canvas.current.getPointer(options.e);
    //         const { x, y } = pointer;
    //         const updatedPoints = [...polyline.points.slice(0,-1), {x,y}];
    //         polyline.set({ points: updatedPoints});
    //         canvas.current.renderAll();
    //     }
    //   });

    // canvas.current.on('mouse:dblclick', ()=>{
    //     isDrawing = false;
    // })

    return null;
}

export default DrawPolyline;