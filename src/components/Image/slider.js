import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import { useSelector, useDispatch } from 'react-redux';
import { setMilePoint } from '../../actions';
import IconButton from '@material-ui/core/IconButton';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import { round } from 'lodash';

const useStyles = makeStyles(theme => ({
    // root: {
    //     width: 300 + theme.spacing(3) * 2,
    // },
    margin: {
        height: theme.spacing(3),
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        justifyContent: 'center'
    },
    playIcon: {
        height: 38,
        width: 38,
    }
}));


function ValueLabelComponent(props) {
    const { children, open, value } = props;

    return (
        <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
            {children}
        </Tooltip>
    );
}

ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
};


const PrettoSlider = withStyles({
    root: {
        color: '#52af77',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus,&:hover,&$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    }
})(Slider);



export default function CustomizedSlider({ min, max }) {
    const classes = useStyles();
    const milepoint = useSelector(state => state.milepoint);
    const dispatch = useDispatch();
    const [start, setStart] = useState(false)

    const handleChange = (newVal) => {
        let mile = newVal >= max ? round(max - 0.01, 2) : ((newVal <= min) ? min : newVal)
        dispatch(setMilePoint(mile))
    }

    useEffect(() => {
        let interval = null;
        if (start && milepoint >= max - 0.01) {
            clearInterval(interval)
        }
        else if (start) {
            interval = setInterval(() => {
                handleChange(round(milepoint + 0.01, 2));
            }, 1000);
        } else if (!start) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [start, milepoint]);

    return (
        <div className={classes.root}>
            <PrettoSlider onChange={(evt, val) => handleChange(val)} step={0.01} valueLabelDisplay='auto' value={milepoint} min={min} max={max} />
            <div className={classes.controls}>
                <IconButton disabled={milepoint <= 0} onClick={() => handleChange(round(milepoint - 0.1, 2))}>
                    <SkipPreviousIcon />
                </IconButton>
                <IconButton onClick={() => setStart(!start)}>
                    {!start && <PlayArrowIcon className={classes.playIcon} />}
                    {start && <PauseIcon className={classes.playIcon} />}
                </IconButton>
                <IconButton disabled={milepoint >= max - 0.01} onClick={() => handleChange(round(milepoint + 0.1, 2))}>
                    <SkipNextIcon />
                </IconButton>
            </div>
        </div>
    );
}

