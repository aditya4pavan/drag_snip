import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import { setConfidence, setArea, setCount, setColor } from '../actions';
import { TextField, DialogTitle } from '@material-ui/core';
import Pickr from '@simonwep/pickr';
import '@simonwep/pickr/dist/themes/classic.min.css';

const options = {
    theme: 'classic',
    lockOpacity: true,

    swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 0.95)',
        'rgba(156, 39, 176, 0.9)',
        'rgba(103, 58, 183, 0.85)',
        'rgba(63, 81, 181, 0.8)',
        'rgba(33, 150, 243, 0.75)',
        'rgba(3, 169, 244, 0.7)',
        'rgba(0, 188, 212, 0.7)',
        'rgba(0, 150, 136, 0.75)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(139, 195, 74, 0.85)',
        'rgba(205, 220, 57, 0.9)',
        'rgba(255, 235, 59, 0.95)',
        'rgba(255, 193, 7, 1)'
    ],

    components: {
        preview: true,
        opacity: true,
        hue: true,

        interaction: {
            hex: true,
            rgba: true,
            hsva: true,
            input: true,
            clear: true,
            save: true
        }
    }
}

export default function Settings() {

    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);
    const [confidence, area, count, color] = useSelector(e => [e.confidence, e.area, e.count, e.color])

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

    useEffect(() => {
        if (open && document.querySelector('.color-picker')) {
            const pickr = Pickr.create({
                el: '.color-picker', default: color, ...options
            })
            pickr.on('save', (c, instance) => {
                console.log(c)
                pickr.hide()
                setColor(c.toHEXA())
            })
        }
    }, [open, color])

    return (
        <div>
            <Button className='float-right' variant="outlined" color="primary" onClick={handleClickOpen}>
                Settings
      </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                keepMounted
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
                        <div className='col-12'>
                            <div className='color-picker' />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
