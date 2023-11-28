import { useState } from "react";
import DrawCircle from "./DrawCircle";
import DrawRect from "./DrawRect";
import DrawLine from "./DrawLine";
import DrawPoint from "./DrawPoint";
import DrawEllipse from "./DrawEllipse";
import DrawObround from "./DrawObround";
import DrawPolyline from "./DrawPolyline";
import CopyPasteObject from "./CopyPasteObject";
import MirrorObject from "./MirrorObject";
import DrawTextbox from "./DrawTextbox";
import DrawArc from "./DrawArc";
import DrawSpline from "./DrawSpline";
import DrawRegularPolygon from "./DrawRegularPolygon";

const Toolbar = () =>{

    const [isCircle, setIsCircle] = useState(false);
    const [isRect, setIsRect] = useState(false);
    const [isLine, setIsLine] = useState(false);
    const [isPoint, setIsPoint] = useState(false);
    const [isEllipse, setIsEllipse] = useState(false);
    const [isObround, setIsObround] = useState(false);
    const [isPolyline, setIsPolyline] = useState(false);
    const [isTextbox, setIsTextbox] = useState(false);
    const [isArc, setIsArc] = useState(false);
    const [isSpline, setIsSpline] = useState(false);
    const [isRegularPolygon, setIsRegularPolygon] = useState(false);

    const onCircleHandler = () =>{
        setIsRect(false);
        setIsLine(false);
        setIsCircle(true);
    }
    const onRectHandler = () =>{
        setIsCircle(false);
        setIsLine(false);
        setIsRect(true);
    }
    const onLineHandler = () =>{
        setIsCircle(false);
        setIsRect(false);
        setIsLine(true);
    }
    const onPointHandler = () =>{
        setIsPoint(true);
    }

    // console.log("circle:", isCircle, "rect:", isRect)
    return(<div style={{display:"flex"}}>
    <button onClick={onCircleHandler}>Circle</button>
    <button onClick={onRectHandler}>Rectangle</button>
    <button onClick={onLineHandler}>Line</button>
    <button onClick={onPointHandler}>Point</button>
    <button onClick={()=>{setIsEllipse(true)}}>Ellipse</button>
    <button onClick={()=>{setIsObround(true)}}>Obround</button>
    <button onClick={()=>{setIsPolyline(true)}}>Polyline</button>
    <button onClick={()=>{setIsTextbox(true)}}>Textbox</button>
    <button onClick={()=>{setIsArc(true)}}>Arc</button>
    <button onClick={()=>{setIsSpline(true)}}>Spline</button>
    <button onClick={()=>{setIsRegularPolygon(true)}}>Regular Polygon</button>
    {isCircle && <DrawCircle setIsCircle={setIsCircle}/>}
    {isRect && <DrawRect setIsRect={setIsRect}/>}
    {isLine && <DrawLine setIsLine={setIsLine}/>}
    {isPoint && <DrawPoint setIsPoint={setIsPoint}/>}
    {isEllipse && <DrawEllipse setIsEllipse={setIsEllipse}/>}
    {isObround && <DrawObround setIsObround={setIsObround}/>}
    {isPolyline && <DrawPolyline setIsPolyline={setIsPolyline}/>}
    {isTextbox && <DrawTextbox setIsTextbox={setIsTextbox}/>}
    {isArc && <DrawArc setIsArc={setIsArc}/>}
    {isSpline && <DrawSpline setIsSpline={setIsSpline}/>}
    {isRegularPolygon && <DrawRegularPolygon setIsRegularPolygon={setIsRegularPolygon}/>}
    <CopyPasteObject />
    <MirrorObject />
    </div>)

}

export default Toolbar;