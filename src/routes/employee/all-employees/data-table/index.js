import React from 'react';
import MUIDataTable from "mui-datatables";
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import IntlMessages from 'Util/IntlMessages';

class DataTable extends React.Component {
    render() {
        const columns = ["Name", "Title", "Location", "Age", "Salary","Name", "Title", "Location", "Age", "Salary"];
        const data = [
            ["Gabby George", "Business Analyst", "Minneapolis", 30, "$100,000","Gabby George", "Business Analyst", "Minneapolis", 30, "$100,000"],
            ["Aiden Lloyd", "Business Consultant", "Dallas", 55, "$200,000","Aiden Lloyd", "Business Consultant", "Dallas", 55, "$200,000"]
		];
        const options = {
            filterType: 'dropdown',
            responsive: 'scroll'
        };
        return (
            <div className="data-table-wrapper">
                <RctCollapsibleCard fullBlock>
                    <MUIDataTable
                        title={(<IntlMessages id={'employee.table.header.employees_list'} />)}
                        data={data}
                        columns={columns}
                        options={options}
                    />
                </RctCollapsibleCard>
            </div>
        );
    }
}

export default DataTable;
