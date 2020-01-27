import React, { useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { GetDetection, GetUnique } from '../REST/road';
import { round } from 'lodash';
import { useDispatch } from 'react-redux';
import { setResults } from '../actions';
export default function Download({ road = [], end }) {

    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);
    const [mile, setMile] = React.useState(0);
    const [current, setCurrent] = React.useState(-1);
    const [assets, setAssets] = React.useState([]);

    const handleClickOpen = () => {
        setOpen(true);
        if (road.length > 0)
            setCurrent(0)
    };

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
                setCurrent(getNextMile())
            })
        }
    }, [current, road])

    const getNextMile = () => {
        let next = round(current + 0.01, 2);
        while ((road.findIndex(e => e.milepoint === next) === -1) && next < end) {
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

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Run Detections
      </Button>
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
