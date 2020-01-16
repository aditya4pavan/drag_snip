import React from 'react';
import DownloadView from './Download';

export default function ({ match }) {

    const { id } = match.params;


    return (
        <div className='container-fluid'>
            <DownloadView road={id} />
        </div>
    )
}