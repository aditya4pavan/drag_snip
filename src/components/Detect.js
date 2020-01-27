import React, { useState, useEffect, Fragment } from 'react';
import DownloadView from './Download';
import Slider from './Image/slider';
import { GetRoad } from '../REST/road';
import ImageView from './Image';
import TableView from './TableView';
import Settings from './Settings';
import RangeSlider from './RangeSlider'

export default function ({ match }) {

    const { id } = match.params;
    const [allroads, setAllRoads] = useState([])
    const [road, setRoad] = useState([])
    const min = 0
    const max = allroads.length > 0 ? allroads[allroads.length - 1].milepoint : 0
    const [roadRange, setRoadRange] = useState([min, max])
    const [begin, end] = roadRange

    useEffect(() => {
        GetRoad(id).then(result => {
            const roads = result.data.data
            setRoad(roads)
            setAllRoads(roads)
        })
    }, [id])

    const getValue = (range) => {
        console.log('range', range, road)
        const [begin, end] = range
        setRoadRange(range)
        setRoad(road.filter(each => {
            const { milepoint } = each
            if (milepoint >= begin && milepoint <= end) return each
        }))
    }

    return (
        <div className='container-fluid'>
            <hr />
            <div className='row'>
                <div className='col-sm-5'>
                    <ImageView road={road} />
                    {road.length &&
                        <Fragment>
                            <RangeSlider label='Adjust Road Range' min={min} max={max} step={0.01} shareRange={getValue} />
                            <Slider min={road[0].milepoint} max={road[road.length - 1].milepoint} />
                        </Fragment>
                    }
                </div>
                <div className='col-sm-7'>
                    <div className='row'>
                        <div className='col'>
                            <DownloadView road={road} end={Math.max.apply(null, road.map(e => parseFloat(e.milepoint)))} />
                        </div>
                        <div className='col'>
                            <Settings />
                        </div>
                    </div>
                    <TableView road={road} />
                </div>
            </div>
        </div>
    )
}