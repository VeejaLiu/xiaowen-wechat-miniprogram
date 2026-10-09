import React, {useEffect, useRef, useState} from 'react';
import './DrawPage.css';

const DrawPage: React.FC = () => {
    const imageCanvasRef = useRef<HTMLCanvasElement>(null);
    const drawingCanvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [lineWidth, setLineWidth] = useState<number>(5); // 初始画笔粗细

    // 动态更新鼠标光标
    useEffect(() => {
        if (drawingCanvasRef.current) {
            const cursorCanvas = document.createElement('canvas');
            const ctx = cursorCanvas.getContext('2d');
            cursorCanvas.width = +lineWidth;
            cursorCanvas.height = +lineWidth;

            ctx!.beginPath();
            ctx!.arc(lineWidth / 2, lineWidth / 2, lineWidth / 2, 0, 2 * Math.PI);
            ctx!.fillStyle = 'black';
            ctx!.fill();
            ctx!.closePath();

            drawingCanvasRef.current.style.cursor = `url(${cursorCanvas.toDataURL()}), auto`;
        }
    }, [lineWidth]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];
        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
            const img = new Image();
            img.onload = () => {
                // 定义最大尺寸为 768px
                const maxDimension = 768;
                let scale = 1;

                // 如果图片的宽度或高度大于最大尺寸，计算缩放比例
                if (img.width > maxDimension || img.height > maxDimension) {
                    scale = Math.min(maxDimension / img.width, maxDimension / img.height);
                }

                // 根据缩放比例计算图片的新尺寸
                const scaledWidth = img.width * scale;
                const scaledHeight = img.height * scale;

                // 获取 imageCanvas 和 drawingCanvas 的引用
                const imageCanvas = imageCanvasRef.current;
                const drawingCanvas = drawingCanvasRef.current;

                // 如果 canvas 存在，则设置它们的尺寸为图片的新尺寸
                if (imageCanvas && drawingCanvas) {
                    imageCanvas.width = scaledWidth;
                    imageCanvas.height = scaledHeight;
                    drawingCanvas.width = scaledWidth;
                    drawingCanvas.height = scaledHeight;

                    // 在 imageCanvas 上绘制缩放后的图片
                    const ctx = imageCanvas.getContext('2d');
                    ctx?.drawImage(img, 0, 0, scaledWidth, scaledHeight);
                }
            };
            img.src = event.target?.result as string;
        };
        reader.readAsDataURL(file);
    };


    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const {offsetX, offsetY} = e.nativeEvent;
        const ctx = drawingCanvasRef.current?.getContext('2d');
        if (!ctx) return;

        // 开始新的路径
        ctx.beginPath();

        // 移动到点击的位置
        ctx.moveTo(offsetX, offsetY);

        // 绘制一个点：通过在同一位置绘制一个非常小的线条来实现
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();

        // 设置正在绘制的状态
        setIsDrawing(true);
    };


    const getMousePos = (canvas: HTMLCanvasElement, evt: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    const draw = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if (!isDrawing || !drawingCanvasRef.current) return;
        const mousePos = getMousePos(drawingCanvasRef.current, e.nativeEvent);
        const ctx = drawingCanvasRef.current?.getContext('2d');
        if (!ctx) return;

        ctx!.lineWidth = lineWidth; // 使用 lineWidth 状态
        ctx!.lineJoin = 'round';
        ctx!.lineCap = 'round';
        ctx!.imageSmoothingEnabled = true;

        // 设置画笔颜色为黑色半透明
        ctx!.strokeStyle = 'rgba(0, 0, 0, 1)';

        ctx!.lineTo(mousePos.x, mousePos.y);
        ctx?.stroke();
    };
    const stopDrawing = () => {
        const ctx = drawingCanvasRef.current?.getContext('2d');
        ctx?.closePath();
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const ctx = drawingCanvasRef.current?.getContext('2d');
        if (drawingCanvasRef.current) {
            ctx?.clearRect(0, 0, drawingCanvasRef.current.width, drawingCanvasRef.current.height);
        }
    };

    const saveMask = () => {
        if (drawingCanvasRef.current) {
            const imageDataURL = drawingCanvasRef.current.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = 'mask.png';
            link.href = imageDataURL;
            link.click();
        }
    };

    return (
        <div>
            <div className={"toolbar"}>
                <input type="file" onChange={handleImageUpload}/>
                <button onClick={clearCanvas}>清除涂鸦</button>
                <button onClick={saveMask}>保存蒙版</button>
            </div>
            <div>
                <label htmlFor="lineWidth">画笔粗细：</label>
                <input
                    type="range"
                    id="lineWidth"
                    min="1"
                    max="50"
                    value={lineWidth}
                    onChange={(e) => setLineWidth(parseInt(e.target.value))}
                />
                {lineWidth}px
            </div>
            <div id="canvas-container">
                <canvas id="image-canvas" ref={imageCanvasRef}/>
                <canvas id="drawing-canvas"
                        ref={drawingCanvasRef}
                        onMouseDown={startDrawing}
                        onMouseUp={stopDrawing}
                        onMouseMove={draw}
                />
                aaa
            </div>
        </div>
    );
};

export default DrawPage;
