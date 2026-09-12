import { useCallback, useEffect, useRef } from "react";
import defaultCover from "../assets/defaultcover.png";
import defaultCollectionCover from "../assets/defaultCollectionCover.png";

const CollectionCover = ({ Initialbooks, width = 300, height = 420, setDomColour ,id}) => {



    const canvasRef = useRef(null);
    const dpr = window.devicePixelRatio;
    const getDominant = useCallback(((ctx, x, y, w, h) => {
        const { data } = ctx.getImageData(x, y, w, h);

        const colorCounts = {};
        for (let i = 0; i < data.length; i += 4) {
            const r = Math.round(data[i] / 20) * 20;
            const g = Math.round(data[i + 1] / 20) * 20;
            const b = Math.round(data[i + 2] / 20) * 20;
            const key = `${r},${g},${b}`
            colorCounts[key] = (colorCounts[key] || 0) + 1;
        }
        const dominantColor = Object.entries(colorCounts).sort((a, b) => b[1] - a[1])[0][0];
        if (setDomColour) {
            setDomColour(dominantColor,id)
        }

    }),[setDomColour,id])
    useEffect(() => {
        let cancelled = false;

        const books = (Initialbooks || []).map((item) => {
            if (item.coverpicid) {


                return {
                    cover: `https://covers.openlibrary.org/b/id/${item.coverpicid}-M.jpg`
                }
            } else {
                return {
                    cover: defaultCover
                }
            }
        })
        if (books.length < 4) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        const halfWidth = width / 2;
        const halfHeight = height / 2;
        canvas.width = width*dpr;
        canvas.height = height*dpr;
        ctx.scale(dpr,dpr)

        const positons = [
            { x: 0, y: 0 },
            { x: 0, y: halfHeight },
            { x: halfWidth, y: 0 },
            { x: halfWidth, y: halfHeight }
        ]
        const latestFour = books.slice(-4);

        const imageLoad = (src) =>
            new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = "anonymous";
                img.onload = () => resolve(img);
                img.onerror = (e)=>{
                    console.error("image failed to paint",src,e)
                    reject(e);
                }
                img.src = src

            });


        Promise.all(latestFour.map(image => imageLoad(image.cover))).
            then((images) => {
                if (cancelled) return;

                images.forEach((image, i) => {
                    const { x, y } = positons[i];
                    ctx.drawImage(image, x, y, halfWidth, halfHeight)
                })
                getDominant(ctx, 0, 0, width*dpr, height*dpr);
            }).catch((err) => console.error("Failed to load mosaic images:", err))
        return () => { cancelled = true }
    }, [Initialbooks, height, width,getDominant,dpr]);



    useEffect(() => {

        let cancelled = false;
        const books = (Initialbooks || []).map((item) => {
            if (item.coverpicid) {


                return {
                    cover: `https://covers.openlibrary.org/b/id/${item.coverpicid}-M.jpg`
                }
            } else {
                return {
                    cover: defaultCover
                }
            }
        })
        if (books.length > 3) return;
        var src;
        if (books.length === 0) {
            src = defaultCollectionCover;
        }
        else {
            src = books.at(-1).cover;
        }
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        canvas.width = width*dpr;
        canvas.height = height*dpr;
        ctx.scale(dpr,dpr)



        const loadImage = (src) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = "anonymous";
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = src
            })
        }

        async function draw() {
            try {
                const img = await loadImage(src);
                if (cancelled) return;

                ctx.drawImage(img, 0, 0, width, height);
                getDominant(ctx, 0, 0, width*dpr, height*dpr);

            } catch (error) {
                console.error("Failed to draw the pic", error);
            }
        }
        draw();
        return () => { cancelled = true }
    }, [Initialbooks, height, width,getDominant,dpr])
    return (
        <canvas ref={canvasRef}  style={{
            width:"100%",
            height:"auto",
            aspectRatio:`${width} / ${height}`
        }}></canvas>
    )

}

export default CollectionCover;