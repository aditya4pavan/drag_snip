import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
    root: {
        textAlign: 'center'
    },
});

export default function RangeSlider(props) {
    const classes = useStyles();
    const { label, range, step, min, max, shareRange, marks } = props
    const [value, setValue] = React.useState(range);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        shareRange && shareRange(newValue)

    };

    useEffect(() => {
        setValue(null)
    }, [min, max])


    return (
        <div className={classes.root}>
            <Typography variant='caption' gutterBottom>
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
                marks={marks}
            />
        </div>
    );
}