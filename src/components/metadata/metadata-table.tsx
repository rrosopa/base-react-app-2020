
import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { AppPagination } from "../pagination";

export interface IMetadataTableColumn{
    title: string;
    dataPropName: string;
    displayAs?: string; // default is text
    width?: number
}

interface ITablePagination {
    currentPage: number;
    totalPages: number;
    
    onChangePage: (nextPage: number) => {};

    pageSize?: number;
    totalItems?: number;
}

export interface IMetadataTable {
    columns: IMetadataTableColumn[];
    data: any[];
    isDataLoading?: boolean;

    pagination?: ITablePagination;
}

export const MetadataTable = (props: IMetadataTable): JSX.Element => {    
    function renderTableHeader(){
        return props.columns.map((c,i) => 
            <th key={i}>{c.title}</th>
        );
    }

    function renderTableContent(){
        return props.data.map((d,di) => 
            <tr key={di}>
                {
                    props.columns.map((c,ci) => <td key={ci}>{d[c.dataPropName]}</td>)
                }
            </tr>
        );
    }

    function renderPagination(){
        if(props.pagination){
            return (
                <div className="d-flex w-100 justify-content-between align-items-center">
                    <div>
                        {
                            props.pagination.pageSize && props.pagination.totalItems &&
                            <>
                                {((props.pagination.currentPage - 1) * props.pagination.pageSize) + 1} 
                                -
                                {props.pagination.currentPage * props.pagination.pageSize > props.pagination.totalItems ? props.pagination.totalItems : props.pagination.currentPage * props.pagination.pageSize}
                                 of 
                                {props.pagination.totalItems}

                            </>
                        }
                    </div>
                    <AppPagination
                        currentPage={props.pagination.currentPage}
                        totalPages={props.pagination.totalPages}
                        onChangePage={props.pagination.onChangePage}
                    />
                </div>
            );
        }
    }

    return (
        <>
            <Table striped bordered hover responsive className="h-100">
                <thead>
                    { renderTableHeader() }
                </thead>
                <tbody>
                    { renderTableContent() }
                </tbody>
            </Table>
            { renderPagination() }
        </>
    );
}

export default MetadataTable;