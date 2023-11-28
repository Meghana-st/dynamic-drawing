import { useContext, useEffect, useState } from "react";
import FabricContext from "./FabricContext";

const DrawRegularPolygon = (props) =>{

    const canvas = useContext(FabricContext);
    let isDrawing=false;
    let polygon;

    useEffect(() => {
        if (!canvas.current) return;
      }, []);

    const mouseDownHandler =  (options) => {
            if (!isDrawing) {
                isDrawing = true;
              const pointer = canvas.current.getPointer(options.e);
              const { x, y } = pointer;
      
              const radius = 1; // Initial radius
              const sides = 5; // Number of sides for a pentagon
              const angle = (2 * Math.PI) / sides;
              const polygonPoints = [];
      
              for (let i = 0; i < sides; i++) {
                const newX = x + radius * Math.cos(angle * i);
                const newY = y + radius * Math.sin(angle * i);
                polygonPoints.push({ x: newX, y: newY });
              }
      
              polygon = new fabric.Polygon(polygonPoints, {
                fill: 'transparent',
                stroke: 'black',
                strokeWidth: 1,
              });
      
              canvas.current.add(polygon);
            //   isDrawing = true;
            } else {
              // Terminate the drawing on the second click
              polygon.setCoords();
              isDrawing = false;
              canvas.current.off('mouse:down', mouseDownHandler);
              canvas.current.off('mouse:move', mouseMoveHandler);
              props.setIsRegularPolygon(false);
            }
          };

    const mouseMoveHandler = (options) => {
            if (isDrawing) {
              const pointer = canvas.current.getPointer(options.e);
              const { x, y } = pointer;
      
              // Calculate the new size of the regular pentagon
              const radius = Math.sqrt(
                Math.pow(x - polygon.left, 2) + Math.pow(y - polygon.top, 2)
              );
              const newPolygonPoints =[];
              // Update the polygon's points based on the new radius
              const angle = (2 * Math.PI) / polygon.points.length;
              for (let i = 0; i < polygon.points.length; i++) {
                const newx = polygon.left + radius * Math.cos(angle * i);
                const newy = polygon.top + radius * Math.sin(angle * i);
                newPolygonPoints.push({x: newx, y:newy});
              }
    
              polygon.set({points : newPolygonPoints})
              polygon.setCoords();
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
  
    //       const radius = 1; // Initial radius
    //       const sides = 5; // Number of sides for a pentagon
    //       const angle = (2 * Math.PI) / sides;
    //       const polygonPoints = [];
  
    //       for (let i = 0; i < sides; i++) {
    //         const newX = x + radius * Math.cos(angle * i);
    //         const newY = y + radius * Math.sin(angle * i);
    //         polygonPoints.push({ x: newX, y: newY });
    //       }
  
    //       polygon = new fabric.Polygon(polygonPoints, {
    //         fill: 'transparent',
    //         stroke: 'black',
    //         strokeWidth: 2,
    //       });
  
    //       canvas.current.add(polygon);
    //     //   isDrawing = true;
    //     } else {
    //       // Terminate the drawing on the second click
    //       isDrawing = false;
    //     }
    //   });
  
    //   canvas.current.on('mouse:move', (options) => {
    //     if (isDrawing) {
    //       const pointer = canvas.current.getPointer(options.e);
    //       const { x, y } = pointer;
  
    //       // Calculate the new size of the regular pentagon
    //       const radius = Math.sqrt(
    //         Math.pow(x - polygon.left, 2) + Math.pow(y - polygon.top, 2)
    //       );
    //       const newPolygonPoints =[];
    //       // Update the polygon's points based on the new radius
    //       const angle = (2 * Math.PI) / polygon.points.length;
    //       for (let i = 0; i < polygon.points.length; i++) {
    //         const newx = polygon.left + radius * Math.cos(angle * i);
    //         const newy = polygon.top + radius * Math.sin(angle * i);
    //         newPolygonPoints.push({x: newx, y:newy});
    //       }

    //       polygon.set({points : newPolygonPoints})
  
    //       canvas.current.renderAll();
    //     }
    //   });

      return null;
  
}

export default DrawRegularPolygon;