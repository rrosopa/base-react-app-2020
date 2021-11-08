
import React, { Component } from "react";
import { Table } from "react-bootstrap";

export interface IMetadataTableColumn{
    title: string;
    dataPropName: string;
    displayAs?: string; // default is text
    width?: number
}

export interface IMetadataTable {
    columns: IMetadataTableColumn[];
    data: any[];
    isDataLoading?: boolean;
}

class MetadataTable extends Component<IMetadataTable> {
    constructor(props: IMetadataTable){
        super(props);
    }
    
    renderTableHeader(){
        return this.props.columns.map((c,i) => 
            <th key={i}>{c.title}</th>
        );
    }

    renderTableContent(){
        return this.props.data.map((d,di) => 
            <tr key={di}>
                {
                    this.props.columns.map((c,ci) => <td key={ci}>{d[c.dataPropName]}</td>)
                }
            </tr>
        );
    }

    render() {
		return (
            <Table striped bordered hover responsive>
                <thead>
                    { this.renderTableHeader() }
                </thead>
                <tbody>
                    { this.renderTableContent() }
                </tbody>
            </Table>
		);
	}
}

export default MetadataTable;