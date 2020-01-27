import React from 'react';
import { GridColumn, Grid } from '@progress/kendo-react-grid';
import { withState } from '../controls/gridview';
import '@progress/kendo-theme-material';
import { withRouter } from 'react-router-dom';

const StatefullGrid = withState(Grid);

class RoadsView extends React.Component {

    handleRowClick = ({ dataItem }) => {
        const { rdwayId } = dataItem
        this.props.history.push('/' + rdwayId)
    }

    render() {
        return (
            <div style={{ height: 'calc(100% - 70px' }}>
                <StatefullGrid onRowClick={this.handleRowClick}>
                    <GridColumn field="rdwayId" title="Road Id" filter="numeric" />
                    <GridColumn field="roadNo" title="Road No." />
                    <GridColumn field="name" title="Road Name" />
                    <GridColumn field="rmileLength" title="Road Length" filter="numeric" />
                </StatefullGrid>
            </div>
        );
    }
}

export default withRouter(RoadsView);
