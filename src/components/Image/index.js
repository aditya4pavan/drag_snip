import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ImageBox from './box';

export default function ImageView({ road = [] }) {
    const milepoint = useSelector(state => state.milepoint)
    const detections = useSelector(state => state.detections);

    let src = 'https://images.fineartamerica.com/images-medium-large-5/traffic-control-signs-on-black-russell-shively.jpg'

    if (road.length) {
        let image = road.find(e => e.milepoint === milepoint);
        if (image)
            src = 'http://192.168.1.149/testfile/' + image.frontCenterImageLink
    }

    const getAssets = () => {
        let reduced = detections.map(e => e.details).reduce((acc, val) => acc.concat(val), []);
        return reduced.filter(e => parseFloat(e.mile) == milepoint).map(e => {
            return { box: e.box, label: e.label }
        });
    }

    return <ImageBox link={src} data={getAssets()} />
}