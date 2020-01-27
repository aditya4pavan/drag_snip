import React, { useEffect, useState } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { GetDetection, GetUnique } from '../REST/road';
import { round } from 'lodash';
import { useDispatch } from 'react-redux';
import { setResults } from '../actions';
import RangeSlider from './RangeSlider'
import Settings from './Settings';

export default function Download({ road = [], end }) {

    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);
    const [mile, setMile] = React.useState(0);
    const [current, setCurrent] = React.useState(-1);
    const [assets, setAssets] = React.useState([]);
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(0)
    const [range, setRange] = useState([0, 0])
    const [start, last] = range

    useEffect(() => {
        if (road.length) {
            const min = road[0].milepoint
            const max = road[road.length - 1].milepoint
            setMin(min)
            setMax(max)
            setRange([min,max])
        }

    }, [road])
    

    const handleClickOpen = () => {
        setOpen(true);
        if (road.length > 0) {
            setCurrent(start)
        }
        else setOpen(false)
    };

    const changeMilePt = () => {
        const next = getNextMile()
        if (next > start && next < last) setCurrent(next)
        else setCurrent(max)
    }

    useEffect(() => {
        let sample = road.filter(e => e.milepoint === current);
        const updateAssets = (milepoint, asset) => {
            setAssets(x => x.concat([{ milepoint, asset }]))
        }
        if (sample.length > 0) {
            let e = sample[0]
            let img = sample[0].frontCenterImageLink //? sample[0].frontCenterImageLink.split('/').join('+') : 'Fail'
            GetDetection(img).then(result => {
                setMile(e.milepoint)
                try {
                    if (result.data) {
                        let parsed = JSON.parse(result.data.replace(/'/g, '"'));
                        if (parsed.data)
                            updateAssets(e.milepoint, parsed.data)
                    }
                }
                catch (ex) { console.log(ex, result.data) }
                changeMilePt()
                //setCurrent(round(e.milepoint + 0.01, 2))
            })
        }
    }, [current, road])

    const getNextMile = () => {
        let next = round(current + 0.01, 2);
        while ((road.findIndex(e => e.milepoint === next) === -1) && next < last) {
            console.log(next)
            next = round(next + 0.01, 2)
        }
        return next;
    }

    useEffect(() => {
        if (road.length && mile === road[road.length - 1].milepoint) {
            // eslint-disable-line no-console
            let dict = {}
            assets.forEach(e => {
                dict[e.milepoint] = e.asset;
            })
            console.log(dict);
            GetUnique(dict).then(result => {
                let modify = result.data;
                modify = modify.replace(/'/g, '"');
                let detects = JSON.parse(modify);
                dispatch(setResults(detects));
                handleClose()
            })
            //dispatch(setDetections(assets))
        }
    }, [mile, road, assets])


    const handleClose = () => {
        setOpen(false);
    };

    const getValue = (sliderValue) => {
        setRange(sliderValue)
    }

    return (
        <div>
            <div className='row'>
                <div className='col-sm-7'>
                    <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                        Run Detections
                    </Button>
                </div>
                <div className='col'>
                    <Settings />
                </div>
            </div>
            <RangeSlider label='Adjust Road Range' min={min} max={max} step={0.01} shareRange={getValue} />
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                disableBackdropClick
            >
                <DialogContent>
                    <div className='p-3'>
                        {road.length > 0 && (
                            <div>
                                <p>Processing Mile Point: {mile} / {road[road.length - 1].milepoint}</p>
                                <LinearProgress variant="determinate" value={(mile / road[road.length - 1].milepoint) * 100} color="secondary" />
                            </div>
                        )}
                        {road.length < 1 && (
                            <p className='lead'>No Road Data</p>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
