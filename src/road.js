import React, { useState, useEffect, Fragment } from 'react';
import { GetRoad } from './REST/road';
import DragSelect from 'dragselect';

export default function ({ match }) {

    const { id } = match.params;

    const [road, setRoad] = useState({})

    const [mile, setMile] = useState(0);

    useEffect(() => {
        GetRoad(id).then(response => {
            const { data } = response.data;
            if (Array.isArray(data)) {
                let roads = {};
                data.forEach(e => {
                    roads[e.milepoint] = {
                        latitude: e.latitude,
                        longitude: e.longitude,
                        left: e.frontLeftImageLink,
                        right: e.frontRightImageLink,
                        center: e.frontCenterImageLink
                    }
                })
                setRoad(roads);
            }
        })
    }, [id])

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col pr-0'><ImageBox align='left' link={road[mile] ? road[mile].left : ''} /></div>
                <div className='col p-0'><ImageBox align='center' link={road[mile] ? road[mile].center : ''} /></div>
                <div className='col pl-0'><ImageBox align='right' link={road[mile] ? road[mile].right : ''} /></div>
            </div>
            <button onClick={() => setMile(parseFloat(((parseFloat(mile) + parseFloat(0.01)).toFixed(2))))}>Forward</button>
            <button onClick={() => setMile(parseFloat(((parseFloat(mile) - parseFloat(0.01)).toFixed(2))))}>Backward</button>
        </div>
    )
}

function ImageBox({ link, align }) {
    const [position, setPosition] = useState({ start: { x: 0, y: 0 }, end: { x: 0, y: 0 } });

    useEffect(() => {
        let dragControl = new DragSelect({
            area: document.querySelector(`.selectable-${align}`),
            onDragMove: (response) => {
                onSelect(dragControl);
            }
        })
    }, [align])

    const onSelect = (control) => {
        let start = control.getInitialCursorPosition();
        let end = control.getCurrentCursorPosition();
        setPosition({ start, end })
    }

    return (
        <Fragment>
            <div className={`selectable-${align}`}>
                <img className='No-Drag' width='100%' height='auto' alt='Test' src={`http://192.168.1.149/testfile/` + link} />
            </div>
            <div>
                <h6>Top {position.start.x}, {position.start.y}</h6>
                <h6>Bottom {position.end.x}, {position.end.y}</h6>
            </div>
        </Fragment >
    );
}