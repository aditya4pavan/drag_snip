import React, { useEffect, Fragment, useRef } from 'react';
import Stop from '../../images/stop.svg'
import Yield from '../../images/yield.svg'
import SpeedLimit10 from '../../images/speedlimit10.svg'
import SpeedLimit15 from '../../images/speedlimit15.svg'
import SpeedLimit20 from '../../images/speedlimit20.svg'
import SpeedLimit25 from '../../images/speedlimit25.svg'
import SpeedLimit30 from '../../images/speedlimit30.svg'
import SpeedLimit35 from '../../images/speedlimit35.svg'
import SpeedLimit40 from '../../images/speedlimit40.svg'
import SpeedLimit45 from '../../images/speedlimit45.svg'
import SpeedLimit50 from '../../images/speedlimit50.svg'
import SpeedLimit55 from '../../images/noImage.svg'
import SpeedLimit60 from '../../images/speedlimit60.svg'
import SpeedLimit65 from '../../images/speedlimit65.svg'

export default function ImageBox({ link, data }) {



    const layer = useRef(null)
    const photo = useRef(null)

    useEffect(() => {
        window.addEventListener("resize", drawImage);
        return () => {
            window.removeEventListener('resize', cleanUp)
        }
    }, [])

    const cleanUp = () => {
        console.log('event removed')
    }


    const signType = (type) => {
        switch (type) {
            case 'stop':
                return Stop
            case 'yield':
                return Yield
            case 'speedLimit 10':
                return SpeedLimit10
            case 'speedLimit 15':
                return SpeedLimit15
            case 'speedLimit 20':
                return SpeedLimit20
            case 'speedLimit 25':
                return SpeedLimit25
            case 'speedLimit 30':
                return SpeedLimit30
            case 'speedLimit 35':
                return SpeedLimit35
            case 'speedLimit 40':
                return SpeedLimit40
            case 'speedLimit 45':
                return SpeedLimit45
            case 'speedLimit 50':
                return SpeedLimit50
            case 'speedLimit 55':
                return SpeedLimit55
            case 'speedLimit 60':
                return SpeedLimit60
            case 'speedLimit 65':
                return SpeedLimit65
            default:
                return SpeedLimit55
        }
    }

    const drawImage = () => {
        //console.log('layer.current,photo.current', layer.current, photo.current, photo.current.height, overlayimg.current)
        let cnvs = layer.current
        const pht = photo.current
        let ctx = cnvs.getContext("2d");
        cnvs.height = pht.height
        cnvs.width = pht.width
        cnvs.style.left = "0px";
        cnvs.style.top = "0px";
        //console.log('photo width height', photo.current.naturalWidth, photo.current.naturalHeight, photo.current.width, photo.current.height)
        data.forEach(each => {
            const coordinates = each.box
            const label = each.label
            const [xcoordinate, ycoordinate, xscoordinate, yscoordinate] = coordinates
            const layerwidth = xscoordinate - xcoordinate
            const layerheight = yscoordinate - ycoordinate
            const { naturalHeight, naturalWidth, width, height } = photo.current
            const overlaywidth = width * layerwidth / naturalWidth
            const overlayheight = height * layerheight / naturalHeight
            const overlayx = width * xcoordinate / naturalWidth
            const overlayy = height * ycoordinate / naturalHeight

            //console.log('xcoordinate, ycoordinate, xscoordinate, yscoordinate', xcoordinate, ycoordinate, xscoordinate, yscoordinate)
            // console.log(' naturalHeight, naturalWidth, width, height', naturalHeight, naturalWidth, width, height)
            //console.log('overlay', overlaywidth, overlayheight, overlayx, overlayy)

            ctx.beginPath();
            ctx.rect(overlayx, overlayy, overlaywidth, overlayheight);
            let base = new Image()
            base.src = signType(label)
            base.height = 100
            base.width = 100
            base.onload = () => {
                ctx.drawImage(base, overlayx + overlaywidth * 0.25, overlayy + overlayheight * 0.75, overlaywidth * 0.5, overlaywidth * 0.5)
            }
            ctx.fillStyle = 'rgba(148, 203, 200, 0.5)';
            ctx.fill();
            ctx.strokeStyle = "rgb(63, 191, 191)";
            ctx.stroke();

        })
    }

    console.log('link to image', link)

    return (
        <Fragment>
            <div style={{ position: 'relative' }}  >
                <img width='100%' height='auto' alt='Test' ref={photo} src={link} onLoad={drawImage} />
                <canvas id='myCanvas' ref={layer} style={{ position: 'absolute' }} >
                </canvas>
            </div>
        </Fragment >
    );
}