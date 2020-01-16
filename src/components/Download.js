import React, { useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { GetDetection, GetRoad } from '../REST/road';
import { round } from 'lodash';
export default function Download({ road }) {
    const [open, setOpen] = React.useState(false);

    const [data, setData] = React.useState([]);
    const [mile, setMile] = React.useState(0);
    const [current, setCurrent] = React.useState(0);
    const [assets, setAssets] = React.useState([]);

    const handleClickOpen = () => {
        setOpen(true);
        GetRoad(road).then(result => {
            let info = result.data.data.map(e => {
                return { milepoint: e.milepoint, image: e.frontCenterImageLink.split('/').join('+') }
            })
            info.sort((a, b) => {
                return a.milepoint - b.milepoint;
            })
            setData(info);
        })
    };

    useEffect(() => {
        if (data.length > 0)
            setCurrent(0.01)
    }, [data])

    useEffect(() => {
        let sample = data.filter(e => e.milepoint === current);
        const updateAssets = (milepoint, asset) => {
            setAssets(x => x.concat([{ milepoint, asset }]))
        }
        if (sample.length > 0) {
            let e = sample[0]
            GetDetection(sample[0].image).then(result => {
                setMile(e.milepoint)
                try {
                    if (result.data) {
                        let parsed = JSON.parse(result.data.replace(/'/g, '"'));
                        if (parsed.data)
                            updateAssets(e.milepoint, parsed.data)
                    }
                }
                catch (ex) { console.log(ex, result.data) }
                setCurrent(round(e.milepoint + 0.01, 2))

            })
        }
    }, [current, data])

    if (data.length && mile === data[data.length - 1].milepoint)
        console.log(JSON.stringify(assets))

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
                        {data.length > 0 && (
                            <div>
                                <p>Processing Mile Point: {mile} / {data[data.length - 1].milepoint}</p>
                                <LinearProgress variant="determinate" value={(mile / data[data.length - 1].milepoint) * 100} color="secondary" />
                            </div>
                        )}
                        {data.length < 1 && (
                            <div>
                                <p className='lead'>Downloading Road Data...</p>
                                <LinearProgress variant="query" />
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}