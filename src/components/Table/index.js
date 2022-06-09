import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './index.css'
import { Tooltip } from '@mui/material';
import { InputText } from 'primereact/inputtext';

import '../../index.css'
import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
export const Table = (props) => {
    const { data, columns, editHandler, deleteHandler, deleteAction, editable, sno } = props
    const [globalFilter, setGlobalFilter] = useState("")
    const serialNumber = (rowData, index) => {
        return (<p style={{ margin: "0", padding: "0px" }}>
            {Number(index) + 1}
        </p>)
    }
    const header = (
        <div className="table-header" style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
            </div>
            <div>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search" />
                </span>
            </div>
        </div>
    );
    const customAction = (e) => {
        return (
            <div style={{ display: "flex", justifyContent: "center", padding: "10px" }}>
                {editable && <Tooltip title="Edit">
                    <EditOutlined style={{ cursor: "pointer" }} onClick={() => {
                        editHandler(e?._id)
                    }} className="pi pi-pencil"></EditOutlined>
                </Tooltip>}
                {deleteAction && <Tooltip title="Delete">
                    <DeleteOutlined style={{ cursor: "pointer", marginLeft: "20px" }} onClick={() => {
                        deleteHandler(e?._id)
                    }} className="pi pi-trash"></DeleteOutlined>
                </Tooltip>}
            </div>
        )
    }

    return (
        <div className="datatable-responsive-demo">
            <DataTable value={data}
                editMode="row"
                header={header}
                // dataKey="_id"
                removableSort
                paginator
                rows={5}
                globalFilter={globalFilter}
                responsiveLayout="scroll"
                sortMode="single"
            //showGridlines
            >
                {sno && <Column
                    style={{
                        textAlign: "center"
                    }}
                    headerStyle={{ fontWeight: 600 }}
                    body={(rowData, tableProps) => serialNumber(rowData, tableProps.rowIndex)} header={"S NO"}  ></Column>}
                {columns && columns.map((column) => {
                    return (
                        <Column style={{
                            ...column.style,
                            textAlign: "center"
                        }
                        }
                            headerStyle={{ fontWeight: 600 }}
                            key={column.field}
                            alignHeader={'center'}
                            field={column?.field}
                            columnKey={column?._id}
                            header={column?.title}
                            body={column.render ? column.render : false}
                            sortable={column.sort ? column.sort : false}
                            filter={column.filter ? column.filter : false}
                            filterPlaceholder={column.filterPlaceholder ? column.filterPlaceholder : ""}
                            filterElement={column.filterElement}
                        />
                    )
                })}
                {(deleteAction || editable) && <Column headerStyle={{ textAlign: "center", fontWeight: 600 }} header="Actions" body={(e) => customAction(e)}
                    style={{ textAlign: "center", justifyContent: "center" }}
                ></Column>}
            </DataTable>
        </div>

    )
}
export default Table