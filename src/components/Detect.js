import React, { useState, useEffect } from 'react';
import DownloadView from './Download';
import Slider from './Image/slider';
import { GetRoad } from '../REST/road';
import ImageView from './Image';
import TableView from './TableView';
import RangeSlider from './RangeSlider'

const marks = [
    {
        value: 0,
        label: 'Selected',
    },
    {
        value: -100,
        label: 'Light',
    },
    {
        value: 100,
        label: 'Dark',
    }
];

export default function ({ match }) {

    const { id } = match.params;

    const [road, setRoad] = useState([])

    useEffect(() => {
        GetRoad(id).then(result => {
            setRoad(result.data.data)
        })
    }, [id])

    const getValue=(sliderRange)=>{
        
    }

    return (
        <div className='container-fluid'>
            <hr />
            <div className='row'>
                <div className='col-sm-5'>
                    <ImageView road={road} />
                    {road.length && <Slider min={0} max={road[road.length - 1].milepoint} />}
                </div>
                <div className='col-sm-7'>
                    <div className='row'>
                        <div className='col'>
                            <DownloadView road={road} end={Math.max.apply(null, road.map(e => parseFloat(e.milepoint)))} />
                        </div>
                        {/* <div className='col'>
                            <Settings />
                        </div> */}
                    </div>
                    <TableView road={road} />
                    <div className="row">
                        <div className='col-12'>
                            <RangeSlider label='Color Deviation' min={-100} max={100} step={1} marks={marks} shareRange={getValue}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}