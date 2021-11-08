
import React, { ChangeEvent, Component, createRef } from "react";
import { Button, Col, Container, FloatingLabel, Form, InputGroup, Overlay, OverlayTrigger, Popover, Row } from "react-bootstrap";
import IMetadataControl from "./metadataControl";


export interface IMetadataDatePicker extends IMetadataControl {     
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface IState {
    show: boolean;
    calendarArr: Array<Array<number>>;
}

class MetadataDatePicker extends Component<IMetadataDatePicker, IState> {
    _inputGroupRef = createRef<HTMLDivElement>();

    constructor(props:IMetadataDatePicker){
        super(props);

        this.state = {
            show: false,
            calendarArr: this.getCalendarArr(new Date('01/03/1992'))
        }

        this.handleCalendarClick = this.handleCalendarClick.bind(this);        
    }

    handleCalendarClick(){
        this.setState({
            show: !this.state.show
        });
    }
    
    getCalendarArr(startDate:Date):Array<Array<number>> {
        var date = this.props.value ? new Date(this.props.value) : startDate;
        date.setDate(1);

        if(date.getDay() != 0){
            date.setDate(date.getDate() - date.getDay());
        }

        var dates = [];
        for(var r = 0; r < 6; r++){
            var rowArr = [];
            for(var c = 0; c < 7; c++){
                rowArr.push(date.getDate());
                date.setDate(date.getDate() + 1);
            }
            dates.push(rowArr);
        }

        return dates;    
    }

    renderDates() {
        if(this.state.calendarArr){
            return this.state.calendarArr.map((r, ri) =>
                <Row key={ri}>
                    {
                        r.map((c, ci) => <Col key={ci}>{c}</Col>)
                    }
                </Row>
            );
        }
    }

    render() {            
		return (
            <InputGroup className="mb-3" ref={this._inputGroupRef}>
                <FloatingLabel label={this.props.label} controlId={this.props.id} className="flex-grow-1">
                    <Form.Control
                        value={this.props.onChange ? this.props.value : undefined}
                        defaultValue={this.props.onChange ? undefined : this.props.value}

                        disabled={this.props.disabled}
                        name={this.props.name}
                        required={this.props.required}

                        onChange={this.props.onChange}
                        style={{display: this.props.hidden === true ? 'none' : 'inherit'}}
                        placeholder={this.props.label}
                        tabIndex={this.props.tabIndex}

                        className="metadata-input"
                    />
                </FloatingLabel>                            
                <Button variant="outline-secondary" onClick={this.handleCalendarClick}>
                    <i className="bi bi-calendar3"></i>
                </Button>
                <Overlay
                    show={this.state.show}
                    target={this._inputGroupRef}
                    container={this._inputGroupRef}
                    placement="bottom"
                    containerPadding={20}
                >
                    <Popover className="date-popover">
                        <Popover.Header as="h3">Popover bottom</Popover.Header>
                        <Popover.Body>
                            <Row>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col>Su</Col>
                                <Col>Mo</Col>
                                <Col>Tu</Col>
                                <Col>We</Col>
                                <Col>Th</Col>
                                <Col>Fr</Col>
                                <Col>Sa</Col>
                            </Row>
                            { this.renderDates() }
                        </Popover.Body>
                    </Popover>
                </Overlay>
            </InputGroup>
		);
	}
}

export default MetadataDatePicker;