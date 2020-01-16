import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import { setConfidence, setArea, setCount } from '../actions';
import { TextField, DialogTitle } from '@material-ui/core';

export default function Settings() {

    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);
    const [confidence, area, count] = useSelector(e => [e.confidence, e.area, e.count])


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAction = (control, func) => {
        let elem = document.getElementById(control);
        dispatch(func(parseFloat(elem.value)))
    }

    return (
        <div>
            <Button className='float-right' variant="outlined" color="primary" onClick={handleClickOpen}>
                Settings
      </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
            >
                <DialogTitle>Settings</DialogTitle>
                <DialogContent>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='row'>
                                <div className='col-10'>
                                    <TextField type='number' id='setting_conf' fullWidth defaultValue={confidence} required label='Minimum Confidence %' />
                                </div>
                                <div className='col-2'>
                                    <Button onClick={() => handleAction('setting_conf', setConfidence)}>Apply</Button>
                                </div>
                            </div>
                        </div>
                        <div className='col-12'>
                            <div className='row'>
                                <div className='col-10'>
                                    <TextField type='number' id='setting_area' fullWidth defaultValue={area} required label='Minimum Area' />
                                </div>
                                <div className='col-2'>
                                    <Button onClick={() => handleAction('setting_area', setArea)}>Apply</Button>
                                </div>
                            </div>
                        </div>
                        <div className='col-12'>
                            <div className='row'>
                                <div className='col-10'>
                                    <TextField type='number' id='setting_cnt' fullWidth defaultValue={count} required label='Minimum No. of Instances' />
                                </div>
                                <div className='col-2'>
                                    <Button onClick={() => handleAction('setting_cnt', setCount)}>Apply</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
