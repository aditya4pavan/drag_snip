import React, { useState, useEffect, useReducer } from 'react';
import MUIDataTable from "mui-datatables";
import { withRouter } from 'react-router-dom';
import { GetRoads } from '../REST/road'
import Button from '@material-ui/core/Button';
import { CircularProgress, Typography } from '@material-ui/core';

const reducer = (state, action) => {
    const { completeData, limit, page, type } = action

    const skip = page * limit
    switch (type) {
        case 'page':
            return { ...state, data: completeData.slice(skip, skip + limit) }
        case 'initial':
            return { ...state, data: completeData.slice(skip, skip + limit), count: completeData.length, completeData: completeData }
        default:
            return state
    }
}

function Roads(props) {

    const changeRoute = (rowData) => {
        //console.log(rowData)
        props.history.push(`/${rowData[1]}`)
    }

    const columns = [
        {
            name: "road_no",
            label: "Road No",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "rdway_id",
            label: "RdWay Id",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "mile_length",
            label: "Mile Length",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "beg_mp",
            label: "Begin MP",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "end_mp",
            label: "End MP",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: 'view',
            label: "View",
            options: {
                filter: false,
                empty: true,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <Button variant='contained' color='primary' onClick={() => changeRoute(tableMeta.rowData)}>
                        View
                    </Button>
                )
            }
        }
    ];


    const [completeData, setCompleteData] = useState([])
    const [page, setPage] = useState(0)
    const limit = 10
    const [isLoading, setIsLoading] = useState(true)
    const [result, dispatch] = useReducer(
        reducer,
        { completeData: completeData, data: [], count: completeData.length }
    )


    useEffect(() => {
        GetRoads().then(res => {
            const { data } = res
            setCompleteData(data);
            dispatch({
                type: 'initial',
                page: page,
                limit: limit,
                completeData: data
            })
            setIsLoading(false)
        })
    }, [])


    const changePage = (page) => {
        dispatch({
            type: 'page',
            page: page,
            limit: limit,
            completeData:completeData

        })
        setPage(page)
        setIsLoading(false)
    };

    const { data, count } = result

    return (
        <MUIDataTable
            title={<Typography variant="title">
                List of Roads
             {isLoading && <CircularProgress size={24} style={{ marginLeft: 15, position: 'relative', top: 4 }} />}
            </Typography>
            }
            data={data}
            columns={columns}
            options={{
                selectableRows: 'none',
                count: count,
                page: page,
                rowsPerPage: limit,
                serverSide:true,
                responsive: 'scrollFullHeight',
                onTableChange: (action, tableState) => {
                    console.log(action, tableState);
                    switch (action) {
                        case 'changePage':
                            changePage(tableState.page);
                            break;
                        default:
                            console.log(tableState)
                            break;
                    }
                }
            }}
        />
    )
}

export default withRouter(Roads)