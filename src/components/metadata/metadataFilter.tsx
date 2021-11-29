
import React, { Component } from "react";
import { Badge, Button, Col, Container, Offcanvas, Row } from "react-bootstrap";
import { IKeyValuePair } from "../../models/common/iKeyValuePair";
import { IMetadataFormControl, MetadataControlType } from "./metadataControl";
import MetadataForm from "./metadataForm";
import { IMetadataSelect } from "./metadataSelect";


export interface IMetadataFilterProp {
    id: string;
    header?: string;

    metadata: Array<IMetadataFormControl>;

    btnSubmitText?: string;
    onSubmit?: () => void;
    onRemoveFilter?: (propName: string, callback?:() => void) => void;
}

export interface IMetadataFilterState{
    showOverlay: boolean;
    filters: IKeyValuePair<string, string>[];
}

class MetadataFilter extends Component<IMetadataFilterProp, IMetadataFilterState> {
    constructor(props: IMetadataFilterProp){
        super(props);

        this.state = {
            showOverlay: false,
            filters: []
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseOverlay = this.handleCloseOverlay.bind(this);
        this.handleShowOverlay = this.handleShowOverlay.bind(this);
        this.handleBadgeClick = this.handleBadgeClick.bind(this);
    }    

    handleSubmit() {                                     
        if(this.props.onSubmit)
            this.props.onSubmit();
            
        var filters:IKeyValuePair<string, string>[] = [];
        this.props.metadata.forEach(m => {
            if(m.control.value){
                if(m.controlType === MetadataControlType.Input)
                    filters.push({key: m.control.name, value: `${m.control.label ?? m.control.name}: ${m.control.value}`});
                else if(m.controlType === MetadataControlType.Select){
                    var option = (m.control as unknown as IMetadataSelect).options.find(x => x.key == m.control.value);
                    filters.push({key: m.control.name, value: `${m.control.label ?? m.control.name}: ${option?.value}`});
                }
            }     
        });

        this.setState({
            showOverlay: false,
            filters: filters
        });
    } 

    handleCloseOverlay(){
        this.setState({showOverlay: false});
    }

    handleShowOverlay(){
        this.setState({showOverlay: true});
    }

    handleBadgeClick(filter:IKeyValuePair<string, string>){
        if(this.props.onRemoveFilter && filter){
            this.props.onRemoveFilter(filter.key, this.handleSubmit);            
        }
    }
    
    renderFilterBadges(){
        var badgeClassName = "p-2 ms-1 me-1 d-flex justify-content-between align-items-center";

        if(this.props.onRemoveFilter)
            return this.state.filters?.map((f, i) =>
                <Badge pill bg="secondary" className={badgeClassName + " clickable"} key={i} onClick={() => this.handleBadgeClick(f)}>
                    <span>{f.value}</span>
                    <span className="ps-2"><i className="bi bi-x-circle clickable"></i></span>
                </Badge>
            );            

        return this.state.filters?.map((f, i) =>
            <Badge pill bg="secondary" className={badgeClassName} key={i}>{f.value}</Badge>
        );            
    }

    renderFilterCountBadge(){
        if(this.state.filters?.length > 0)
            return <Badge bg="secondary">{this.state.filters.length}</Badge>
    }

    render() {
		return (
            <>
                <Container>
                    <Row>
                        <Col xs={3} md={2}>
                            <Button type="button" onClick={this.handleShowOverlay}>
                                <i className="bi bi-funnel"></i> Filter { this.renderFilterCountBadge() }
                            </Button>
                        </Col>
                        <Col className="d-flex align-items-center">
                            {this.renderFilterBadges()}
                        </Col>
                    </Row>
                </Container>
                <Offcanvas show={this.state.showOverlay} onHide={this.handleCloseOverlay}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>{this.props.header ?? 'Filter'}</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <MetadataForm 
                            id={this.props.id} 
                            metadata={this.props.metadata}
                            btnSubmitText={this.props.btnSubmitText ?? 'Search'}
                            onSubmit={this.handleSubmit}
                        />
                    </Offcanvas.Body>
                </Offcanvas>
            </>
		);
	}
}

export default MetadataFilter;