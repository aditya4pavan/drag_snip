import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
    root: {
        width: 300,
    },
});

export default function RangeSlider(props) {
    const classes = useStyles();
    const { label, range, step, min, max, shareRange } = props
    const [value, setValue] = React.useState(range);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        shareRange && shareRange(newValue)

    };
   
    return (
        <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
                {label}
            </Typography>
            <Slider
                value={value || [min, max]}
                onChange={handleChange}
                step={step || 0.1}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={min}
                max={max}
            />
        </div>
    );
}