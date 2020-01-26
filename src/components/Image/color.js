import React, { useEffect, useRef } from 'react';


export default function ColorBox({ colors = [] }) {

    const elem = useRef(null)

    useEffect(() => {
        if (elem.current.getContext) {
            var ctx = elem.current.getContext("2d");
            let cnt = colors.length;
        
            colors.forEach((e, i) => {
                console.log(e, i)
                ctx.fillStyle = e.color
                ctx.fillRect(i * 100 / cnt, 0, 100 / cnt, 25)
            })
        }
    }, [colors])

    return <canvas ref={elem} width='100' height='25' />
}