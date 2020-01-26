import React, { useState } from 'react';
import MUIDataTable from "mui-datatables";
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
//import { round } from 'lodash';
import { setMilePoint } from '../actions';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import ColorBox from './Image/color';
import ColorDiff from 'nearest-color';
import roundBy from 'lodash/round';
import sortBy from 'lodash/sortBy';
import TinyColor from 'tinycolor2';

export default function TableView() {
    const [det, red] = useSelector(state => [state.detections, state.color]);
    //const det = [{ 'label': 'stop', 'mile': '0.17', 'frequency': 4, 'details': [{ 'direction': 'RIGHT', 'top': 38.18321197411003, 'bottom': 42.5793284789644, 'left': 59.52288834951457, 'right': 62.99548847087378, 'area': 12438.260236799979, 'label': 'stop', 'uid': '35b82a80-a050-44be-9f7b-f5c75049e46f', 'mile': '0.15', 'box': [1961.8744, 943.889, 2076.3313, 1052.561], 'colors': [{ 'rgb': [53, 31, 36], 'hsl': [245, 66, 42], 'proportion': 0.40158542755945353 }, { 'rgb': [48, 49, 56], 'hsl': [164, 19, 52], 'proportion': 0.27238994771462305 }, { 'rgb': [79, 82, 91], 'hsl': [159, 18, 85], 'proportion': 0.13282172373081463 }, { 'rgb': [49, 22, 20], 'hsl': [2, 107, 34], 'proportion': 0.08517456569404622 }, { 'rgb': [87, 75, 83], 'hsl': [226, 18, 81], 'proportion': 0.08180131556754934 }, { 'rgb': [141, 151, 168], 'hsl': [154, 34, 154], 'proportion': 0.02622701973351324 }], 'score': 99.35576319694519 }, { 'direction': 'RIGHT', 'top': 35.652868122977345, 'bottom': 42.47615695792881, 'left': 69.10909283980583, 'right': 74.16181735436894, 'area': 28090.21384026003, 'label': 'stop', 'uid': 'e6fbedaa-cb86-4275-b0e1-3a8b70da7ddc', 'mile': '0.16', 'box': [2277.8357, 881.3389, 2444.3735, 1050.0106], 'colors': [{ 'rgb': [86, 92, 103], 'hsl': [155, 22, 94], 'proportion': 0.2580054056530304 }, { 'rgb': [76, 28, 34], 'hsl': [249, 117, 52], 'proportion': 0.2531952906683769 }, { 'rgb': [148, 158, 177], 'hsl': [155, 39, 162], 'proportion': 0.153511383938797 }, { 'rgb': [75, 24, 21], 'hsl': [2, 143, 48], 'proportion': 0.13569105318612854 }, { 'rgb': [98, 80, 89], 'hsl': [233, 25, 89], 'proportion': 0.11672545696092354 }, { 'rgb': [253, 252, 250], 'hsl': [28, 109, 251], 'proportion': 0.0828714095927436 }], 'score': 99.39303398132324 }, { 'direction': 'RIGHT', 'top': 28.17887944983819, 'bottom': 41.06055703883495, 'left': 78.77674150485437, 'right': 88.0278276699029, 'area': 97095.88411710592, 'label': 'stop', 'uid': 'fa0cd540-6280-4126-9072-c32a52d7ba4b', 'mile': '0.17', 'box': [2596.4814, 696.5819, 2901.3972, 1015.01697], 'colors': [{ 'rgb': [45, 21, 25], 'hsl': [247, 92, 33], 'proportion': 0.3094516061444813 }, { 'rgb': [86, 91, 100], 'hsl': [154, 19, 93], 'proportion': 0.25988332984131535 }, { 'rgb': [45, 16, 14], 'hsl': [2, 133, 29], 'proportion': 0.19756734999944864 }, { 'rgb': [41, 43, 50], 'hsl': [160, 25, 45], 'proportion': 0.17679168091042421 }, { 'rgb': [84, 76, 82], 'hsl': [223, 12, 80], 'proportion': 0.03023719991619157 }, { 'rgb': [96, 87, 74], 'hsl': [25, 33, 85], 'proportion': 0.0260688331881389 }], 'score': 99.54610466957092 }, { 'direction': 'RIGHT', 'top': 37.45053398058253, 'bottom': 40.84319579288026, 'left': 64.35785800970874, 'right': 66.85925970873787, 'area': 6914.482476919994, 'label': 'stop', 'uid': 'b4084dd8-782d-40fa-b040-2d733ac93d3c', 'mile': '0.14', 'box': [2121.235, 925.7772, 2203.6812, 1009.6438], 'colors': [{ 'rgb': [43, 29, 33], 'hsl': [242, 49, 36], 'proportion': 0.5427530954115076 }, { 'rgb': [37, 38, 45], 'hsl': [164, 24, 41], 'proportion': 0.34959941733430444 }, { 'rgb': [40, 23, 22], 'hsl': [2, 74, 31], 'proportion': 0.05040058266569556 }, { 'rgb': [77, 81, 90], 'hsl': [156, 19, 83], 'proportion': 0.03641660597232338 }, { 'rgb': [73, 64, 70], 'hsl': [226, 16, 68], 'proportion': 0.011507647487254188 }, { 'rgb': [70, 59, 65], 'hsl': [231, 21, 64], 'proportion': 0.009322651128914785 }], 'score': 97.97320365905762 }] }, { 'label': 'speedLimit 25', 'mile': '0.22', 'frequency': 4, 'details': [{ 'direction': 'RIGHT', 'top': 37.803758090614885, 'bottom': 41.68786003236245, 'left': 67.82485740291263, 'right': 70.31018810679612, 'area': 7865.212747499972, 'label': 'speedLimit 25', 'uid': 'c116cb9f-45d1-4272-bd4f-e66b1af6553d', 'mile': '0.2', 'box': [2235.5073, 934.5089, 2317.4238, 1030.5239], 'colors': [{ 'rgb': [85, 93, 107], 'hsl': [154, 29, 96], 'proportion': 0.3774851536276788 }, { 'rgb': [34, 36, 42], 'hsl': [159, 26, 38], 'proportion': 0.35618383681900334 }, { 'rgb': [38, 34, 28], 'hsl': [25, 38, 33], 'proportion': 0.1155435063258456 }, { 'rgb': [28, 25, 28], 'hsl': [212, 14, 26], 'proportion': 0.11102504518461141 }, { 'rgb': [58, 61, 74], 'hsl': [162, 30, 66], 'proportion': 0.028789052414149238 }, { 'rgb': [30, 35, 33], 'hsl': [110, 19, 32], 'proportion': 0.010973405628711594 }], 'score': 99.99266815185547 }, { 'direction': 'RIGHT', 'top': 32.48151011326861, 'bottom': 38.44366100323625, 'left': 68.83753033980584, 'right': 72.61299150485438, 'area': 18340.39309530397, 'label': 'speedLimit 25', 'uid': '6a0d7fec-bbf2-40f3-a00d-0350fe4fa777', 'mile': '0.21', 'box': [2268.885, 802.94293, 2393.3242, 950.3273], 'colors': [{ 'rgb': [87, 96, 110], 'hsl': [153, 29, 98], 'proportion': 0.42368156985171146 }, { 'rgb': [35, 38, 45], 'hsl': [157, 31, 40], 'proportion': 0.38722265581447207 }, { 'rgb': [30, 27, 30], 'hsl': [212, 13, 28], 'proportion': 0.09387891626714238 }, { 'rgb': [42, 36, 26], 'hsl': [26, 60, 34], 'proportion': 0.05898093432935667 }, { 'rgb': [57, 61, 74], 'hsl': [160, 33, 65], 'proportion': 0.024361690266473408 }, { 'rgb': [41, 45, 43], 'hsl': [106, 11, 43], 'proportion': 0.011874233470844018 }], 'score': 99.9863052368164 }, { 'direction': 'RIGHT', 'top': 24.73224919093851, 'bottom': 36.24717233009709, 'left': 83.64894720873787, 'right': 90.51798240291261, 'area': 64445.47876625989, 'label': 'speedLimit 25', 'uid': '86ee4bee-b72c-43a3-9d47-cc0d72bec7d1', 'mile': '0.22', 'box': [2757.0693, 611.3812, 2983.4727, 896.0301], 'colors': [{ 'rgb': [93, 106, 122], 'hsl': [150, 34, 107], 'proportion': 0.3792834890965732 }, { 'rgb': [29, 33, 43], 'hsl': [157, 49, 36], 'proportion': 0.29117567384532034 }, { 'rgb': [112, 126, 147], 'hsl': [153, 35, 129], 'proportion': 0.13588649600433428 }, { 'rgb': [38, 35, 30], 'hsl': [26, 30, 34], 'proportion': 0.0718203982121089 }, { 'rgb': [126, 151, 189], 'hsl': [153, 82, 157], 'proportion': 0.06118786401191927 }, { 'rgb': [38, 33, 38], 'hsl': [212, 17, 35], 'proportion': 0.06064607882974401 }], 'score': 99.98236083984375 }, { 'direction': 'RIGHT', 'top': 39.9610821197411, 'bottom': 42.636921521035596, 'left': 64.74229975728156, 'right': 66.40237560679611, 'area': 3619.292187675006, 'label': 'speedLimit 25', 'uid': '4c1fb1a8-ffb9-46e7-bd90-450075db8b38', 'mile': '0.19', 'box': [2133.9062, 987.83795, 2188.6223, 1053.9847], 'colors': [{ 'rgb': [83, 90, 103], 'hsl': [155, 27, 93], 'proportion': 0.49173553719008267 }, { 'rgb': [39, 42, 49], 'hsl': [157, 28, 44], 'proportion': 0.28429752066115704 }, { 'rgb': [30, 27, 30], 'hsl': [212, 13, 28], 'proportion': 0.12011019283746556 }, { 'rgb': [36, 32, 27], 'hsl': [23, 36, 31], 'proportion': 0.06942148760330578 }, { 'rgb': [58, 62, 73], 'hsl': [158, 29, 65], 'proportion': 0.023415977961432508 }, { 'rgb': [30, 34, 32], 'hsl': [106, 15, 32], 'proportion': 0.011019283746556474 }], 'score': 99.97203063964844 }] }, { 'label': 'yield', 'mile': '0.77', 'frequency': 1, 'details': [{ 'direction': 'RIGHT', 'top': 5.638470873786408, 'bottom': 27.12507281553398, 'left': 91.67157160194175, 'right': 100.0, 'area': 145803.00134400005, 'label': 'yield', 'uid': 'ac155b4e-1450-4cdc-82c5-2124ec7de388', 'mile': '0.77', 'box': [3021.495, 139.383, 3296, 670.5318], 'colors': [{ 'rgb': [51, 35, 37], 'hsl': [249, 47, 43], 'proportion': 0.31373296079925495 }, { 'rgb': [167, 215, 252], 'hsl': [146, 238, 209], 'proportion': 0.27098467530268394 }, { 'rgb': [46, 34, 33], 'hsl': [3, 41, 39], 'proportion': 0.20451274235881806 }, { 'rgb': [31, 37, 42], 'hsl': [146, 38, 36], 'proportion': 0.08128016256032512 }, { 'rgb': [79, 96, 107], 'hsl': [144, 38, 93], 'proportion': 0.06499872999746 }, { 'rgb': [236, 252, 251], 'hsl': [124, 185, 244], 'proportion': 0.06449072898145797 }], 'score': 89.0340268611908 }] }]
    const dispatch = useDispatch();
    const [asset, setAsset] = useState(null)


    const columns = [
        'Sign Type', 'Mile Point', 'No. of Instances', 'Information', 'Possible Obstruction', '', ''
    ]

    const output = det.map(d => {
        const newDets = d.details.map(x => {
            const newColors = sortBy(x.colors.filter(e => e.proportion >= 0.2).map(e => {
                const color = '#' + fullColorHex(e.rgb)
                const details = ColorDiff.from({ red })(color);
                return { ...e, color, distance: roundBy(details.distance, 2), brightness: TinyColor(color).getBrightness(), original: TinyColor(red).getBrightness() }
            }), 'distance')
            return { ...x, colors: newColors }
        })
        return { ...d, details: newDets }
    })

    console.log(output)

    const findBestColor = (assets) => {
        if (assets.length) {
            let colors = assets.flatMap(e => e.colors)
            colors = sortBy(colors, 'distance')
            console.log(colors)
            return <div><div style={{ width: 20, height: 20, background: colors[0].color }}></div>{colorPercent(colors[0])}</div>
        }
        return <div style={{ width: 20, height: 20, background: '#fff' }}></div>
    }

    const colorPercent = (asset) => {
        try {
            const [c1, c2] = [asset.brightness, asset.original]
            if (c1 >= c2) {
                return roundBy(((c1 - c2) / c2) * 100, 2) + '% Lighter'
            }
            else {
                return roundBy(((c2 - c1) / c2) * 100, 2) + '% Darker'
            }
        }
        catch (ex) {
            console.log(ex);
            return 'NA'
        }
    }

    const possibleBlockage = (assets) => {
        if (Array.isArray(assets)) {
            let miles = assets.map(x => parseFloat(x.mile))
            let min = Math.min.apply(null, miles);
            let max = Math.max.apply(null, miles);
            let notBlocked = true;
            while (min <= max) {
                min += 0.01
                min = roundBy(min, 2)
                notBlocked = notBlocked && miles.includes(min)
            }
            return !notBlocked
        }
        return false;
    }

    const data = output.map((e, i) => {
        return [e.label, e.mile, e.frequency, e.label === 'stop' ? findBestColor(e.details) : '', possibleBlockage(e.details) ? 'Yes' : 'No',
        <Button onClick={() => dispatch(setMilePoint(parseFloat(e.mile)))}>View</Button>, <Button onClick={() => setAsset(i)}>Details</Button>]
    })

    const options = {
        responsive: 'scrollMaxHeight',
        print: false,
        selectableRows: 'none',
        filterType: 'textField'
    }

    const subOptions = {
        responsive: 'scrollMaxHeight',
        print: false,
        selectableRows: 'none',
        filterType: 'textField',
        onRowClick: (row) => {
            dispatch(setMilePoint(parseFloat(row[1])))
        }
    };

    const subColumns = [
        'Confidence', 'Mile Point', 'Dominant Colors'
    ]

    const subData = ((output.find((e, i) => i === asset) || {}).details || []).map(x => {
        return [x.score, x.mile, <ColorBox colors={x.colors} />]
    })

    return <div>
        <Dialog open={asset !== null} onClose={() => setAsset(null)}>
            <DialogContent>
                <MUIDataTable
                    title='No. Of Instances'
                    data={sortBy(subData, (o) => { return o[1] })}
                    columns={subColumns}
                    options={subOptions}
                />
            </DialogContent>
        </Dialog>
        <MUIDataTable
            title={"Total Detections"}
            data={data}
            columns={columns}
            options={options}
        />
    </div>
}

const rgbToHex = function (rgb) {
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex;
};

const fullColorHex = function ([r, g, b]) {
    var red = rgbToHex(r);
    var green = rgbToHex(g);
    var blue = rgbToHex(b);
    return red + green + blue;
};

//let data = [{'label': 'stop', 'mile': '0.17', 'frequency': 4, 'details': [{'direction': 'RIGHT', 'top': 38.18321197411003, 'bottom': 42.5793284789644, 'left': 59.52288834951457, 'right': 62.99548847087378, 'area': 12438.260236799979, 'label': 'stop', 'uid': '35b82a80-a050-44be-9f7b-f5c75049e46f', 'mile': '0.15', 'box': [1961.8744, 943.889, 2076.3313, 1052.561], 'colors': [{'rgb': [53, 31, 36], 'hsl': [245, 66, 42], 'proportion': 0.40158542755945353}, {'rgb': [48, 49, 56], 'hsl': [164, 19, 52], 'proportion': 0.27238994771462305}, {'rgb': [79, 82, 91], 'hsl': [159, 18, 85], 'proportion': 0.13282172373081463}, {'rgb': [49, 22, 20], 'hsl': [2, 107, 34], 'proportion': 0.08517456569404622}, {'rgb': [87, 75, 83], 'hsl': [226, 18, 81], 'proportion': 0.08180131556754934}, {'rgb': [141, 151, 168], 'hsl': [154, 34, 154], 'proportion': 0.02622701973351324}], 'score': 99.35576319694519}, {'direction': 'RIGHT', 'top': 35.652868122977345, 'bottom': 42.47615695792881, 'left': 69.10909283980583, 'right': 74.16181735436894, 'area': 28090.21384026003, 'label': 'stop', 'uid': 'e6fbedaa-cb86-4275-b0e1-3a8b70da7ddc', 'mile': '0.16', 'box': [2277.8357, 881.3389, 2444.3735, 1050.0106], 'colors': [{'rgb': [86, 92, 103], 'hsl': [155, 22, 94], 'proportion': 0.2580054056530304}, {'rgb': [76, 28, 34], 'hsl': [249, 117, 52], 'proportion': 0.2531952906683769}, {'rgb': [148, 158, 177], 'hsl': [155, 39, 162], 'proportion': 0.153511383938797}, {'rgb': [75, 24, 21], 'hsl': [2, 143, 48], 'proportion': 0.13569105318612854}, {'rgb': [98, 80, 89], 'hsl': [233, 25, 89], 'proportion': 0.11672545696092354}, {'rgb': [253, 252, 250], 'hsl': [28, 109, 251], 'proportion': 0.0828714095927436}], 'score': 99.39303398132324}, {'direction': 'RIGHT', 'top': 28.17887944983819, 'bottom': 41.06055703883495, 'left': 78.77674150485437, 'right': 88.0278276699029, 'area': 97095.88411710592, 'label': 'stop', 'uid': 'fa0cd540-6280-4126-9072-c32a52d7ba4b', 'mile': '0.17', 'box': [2596.4814, 696.5819, 2901.3972, 1015.01697], 'colors': [{'rgb': [45, 21, 25], 'hsl': [247, 92, 33], 'proportion': 0.3094516061444813}, {'rgb': [86, 91, 100], 'hsl': [154, 19, 93], 'proportion': 0.25988332984131535}, {'rgb': [45, 16, 14], 'hsl': [2, 133, 29], 'proportion': 0.19756734999944864}, {'rgb': [41, 43, 50], 'hsl': [160, 25, 45], 'proportion': 0.17679168091042421}, {'rgb': [84, 76, 82], 'hsl': [223, 12, 80], 'proportion': 0.03023719991619157}, {'rgb': [96, 87, 74], 'hsl': [25, 33, 85], 'proportion': 0.0260688331881389}], 'score': 99.54610466957092}, {'direction': 'RIGHT', 'top': 37.45053398058253, 'bottom': 40.84319579288026, 'left': 64.35785800970874, 'right': 66.85925970873787, 'area': 6914.482476919994, 'label': 'stop', 'uid': 'b4084dd8-782d-40fa-b040-2d733ac93d3c', 'mile': '0.14', 'box': [2121.235, 925.7772, 2203.6812, 1009.6438], 'colors': [{'rgb': [43, 29, 33], 'hsl': [242, 49, 36], 'proportion': 0.5427530954115076}, {'rgb': [37, 38, 45], 'hsl': [164, 24, 41], 'proportion': 0.34959941733430444}, {'rgb': [40, 23, 22], 'hsl': [2, 74, 31], 'proportion': 0.05040058266569556}, {'rgb': [77, 81, 90], 'hsl': [156, 19, 83], 'proportion': 0.03641660597232338}, {'rgb': [73, 64, 70], 'hsl': [226, 16, 68], 'proportion': 0.011507647487254188}, {'rgb': [70, 59, 65], 'hsl': [231, 21, 64], 'proportion': 0.009322651128914785}], 'score': 97.97320365905762}]}, {'label': 'speedLimit 25', 'mile': '0.22', 'frequency': 4, 'details': [{'direction': 'RIGHT', 'top': 37.803758090614885, 'bottom': 41.68786003236245, 'left': 67.82485740291263, 'right': 70.31018810679612, 'area': 7865.212747499972, 'label': 'speedLimit 25', 'uid': 'c116cb9f-45d1-4272-bd4f-e66b1af6553d', 'mile': '0.2', 'box': [2235.5073, 934.5089, 2317.4238, 1030.5239], 'colors': [{'rgb': [85, 93, 107], 'hsl': [154, 29, 96], 'proportion': 0.3774851536276788}, {'rgb': [34, 36, 42], 'hsl': [159, 26, 38], 'proportion': 0.35618383681900334}, {'rgb': [38, 34, 28], 'hsl': [25, 38, 33], 'proportion': 0.1155435063258456}, {'rgb': [28, 25, 28], 'hsl': [212, 14, 26], 'proportion': 0.11102504518461141}, {'rgb': [58, 61, 74], 'hsl': [162, 30, 66], 'proportion': 0.028789052414149238}, {'rgb': [30, 35, 33], 'hsl': [110, 19, 32], 'proportion': 0.010973405628711594}], 'score': 99.99266815185547}, {'direction': 'RIGHT', 'top': 32.48151011326861, 'bottom': 38.44366100323625, 'left': 68.83753033980584, 'right': 72.61299150485438, 'area': 18340.39309530397, 'label': 'speedLimit 25', 'uid': '6a0d7fec-bbf2-40f3-a00d-0350fe4fa777', 'mile': '0.21', 'box': [2268.885, 802.94293, 2393.3242, 950.3273], 'colors': [{'rgb': [87, 96, 110], 'hsl': [153, 29, 98], 'proportion': 0.42368156985171146}, {'rgb': [35, 38, 45], 'hsl': [157, 31, 40], 'proportion': 0.38722265581447207}, {'rgb': [30, 27, 30], 'hsl': [212, 13, 28], 'proportion': 0.09387891626714238}, {'rgb': [42, 36, 26], 'hsl': [26, 60, 34], 'proportion': 0.05898093432935667}, {'rgb': [57, 61, 74], 'hsl': [160, 33, 65], 'proportion': 0.024361690266473408}, {'rgb': [41, 45, 43], 'hsl': [106, 11, 43], 'proportion': 0.011874233470844018}], 'score': 99.9863052368164}, {'direction': 'RIGHT', 'top': 24.73224919093851, 'bottom': 36.24717233009709, 'left': 83.64894720873787, 'right': 90.51798240291261, 'area': 64445.47876625989, 'label': 'speedLimit 25', 'uid': '86ee4bee-b72c-43a3-9d47-cc0d72bec7d1', 'mile': '0.22', 'box': [2757.0693, 611.3812, 2983.4727, 896.0301], 'colors': [{'rgb': [93, 106, 122], 'hsl': [150, 34, 107], 'proportion': 0.3792834890965732}, {'rgb': [29, 33, 43], 'hsl': [157, 49, 36], 'proportion': 0.29117567384532034}, {'rgb': [112, 126, 147], 'hsl': [153, 35, 129], 'proportion': 0.13588649600433428}, {'rgb': [38, 35, 30], 'hsl': [26, 30, 34], 'proportion': 0.0718203982121089}, {'rgb': [126, 151, 189], 'hsl': [153, 82, 157], 'proportion': 0.06118786401191927}, {'rgb': [38, 33, 38], 'hsl': [212, 17, 35], 'proportion': 0.06064607882974401}], 'score': 99.98236083984375}, {'direction': 'RIGHT', 'top': 39.9610821197411, 'bottom': 42.636921521035596, 'left': 64.74229975728156, 'right': 66.40237560679611, 'area': 3619.292187675006, 'label': 'speedLimit 25', 'uid': '4c1fb1a8-ffb9-46e7-bd90-450075db8b38', 'mile': '0.19', 'box': [2133.9062, 987.83795, 2188.6223, 1053.9847], 'colors': [{'rgb': [83, 90, 103], 'hsl': [155, 27, 93], 'proportion': 0.49173553719008267}, {'rgb': [39, 42, 49], 'hsl': [157, 28, 44], 'proportion': 0.28429752066115704}, {'rgb': [30, 27, 30], 'hsl': [212, 13, 28], 'proportion': 0.12011019283746556}, {'rgb': [36, 32, 27], 'hsl': [23, 36, 31], 'proportion': 0.06942148760330578}, {'rgb': [58, 62, 73], 'hsl': [158, 29, 65], 'proportion': 0.023415977961432508}, {'rgb': [30, 34, 32], 'hsl': [106, 15, 32], 'proportion': 0.011019283746556474}], 'score': 99.97203063964844}]}, {'label': 'yield', 'mile': '0.77', 'frequency': 1, 'details': [{'direction': 'RIGHT', 'top': 5.638470873786408, 'bottom': 27.12507281553398, 'left': 91.67157160194175, 'right': 100.0, 'area': 145803.00134400005, 'label': 'yield', 'uid': 'ac155b4e-1450-4cdc-82c5-2124ec7de388', 'mile': '0.77', 'box': [3021.495, 139.383, 3296, 670.5318], 'colors': [{'rgb': [51, 35, 37], 'hsl': [249, 47, 43], 'proportion': 0.31373296079925495}, {'rgb': [167, 215, 252], 'hsl': [146, 238, 209], 'proportion': 0.27098467530268394}, {'rgb': [46, 34, 33], 'hsl': [3, 41, 39], 'proportion': 0.20451274235881806}, {'rgb': [31, 37, 42], 'hsl': [146, 38, 36], 'proportion': 0.08128016256032512}, {'rgb': [79, 96, 107], 'hsl': [144, 38, 93], 'proportion': 0.06499872999746}, {'rgb': [236, 252, 251], 'hsl': [124, 185, 244], 'proportion': 0.06449072898145797}], 'score': 89.0340268611908}]}]