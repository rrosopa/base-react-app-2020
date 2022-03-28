
import React, { ChangeEvent, Component, createRef } from "react";
import { Button, Col, Container, FloatingLabel, Form, InputGroup, Overlay, OverlayTrigger, Popover, Row } from "react-bootstrap";
import { StringLiteralLike } from "typescript";
import { DateHelper } from "../../helpers/date-helper";
import IMetadataControl from "./metadata-control";


export interface IMetadataDatePicker extends IMetadataControl {     
    date?: Date;
    onChange?: (dateSelected: Date | undefined) => void;
}

interface IState {
    show: boolean;    
    viewDate: Date;
    viewYear: number;
    viewMonth: number;    
    selectedDate?: Date;
    selectedDateText?: string;
}

export class MetadataDatePicker extends Component<IMetadataDatePicker, IState> {
    _inputGroupRef = createRef<HTMLDivElement>();
    _inputRef = createRef<HTMLInputElement>();

    _months = [
        { name: "January", shortenedName: "Jan", number: 1 },
        { name: "February", shortenedName: "Feb", number: 2 },
        { name: "March", shortenedName: "Mar", number: 3 },
        { name: "April", shortenedName: "Apr", number: 4 },
        { name: "May", shortenedName: "May", number: 5 },
        { name: "June", shortenedName: "Jun", number: 6 },
        { name: "July", shortenedName: "Jul", number: 7 },
        { name: "August", shortenedName: "Aug", number: 8 },
        { name: "September", shortenedName: "Sep", number: 9 },
        { name: "October", shortenedName: "Oct", number: 10 },
        { name: "November", shortenedName: "Nov", number: 11 },
        { name: "December", shortenedName: "Dec", number: 12 }
    ]

    constructor(props:IMetadataDatePicker){
        super(props);

        var viewDate = new Date();
        var selectedDate: Date | undefined;
        var selectedDateText: string = '';
        if(this.props.date){
            viewDate = this.props.date;
            selectedDate = new Date(this.props.date);
            selectedDateText = DateHelper.ToStringYearMonthDate(selectedDate);
        }
        
        this.state = {
            show: false,
            viewDate: viewDate,            
            viewYear: viewDate.getFullYear(),
            viewMonth: viewDate.getMonth() + 1,
            selectedDate: selectedDate,
            selectedDateText: selectedDateText
        }

        this.handleCalendarClick = this.handleCalendarClick.bind(this);    
        this.handleCalendarSelectChange = this.handleCalendarSelectChange.bind(this);
        this.handleCalendarPrevMonth = this.handleCalendarPrevMonth.bind(this);
        this.handleCalendarNextMonth = this.handleCalendarNextMonth.bind(this);
        this.handleDateSelect = this.handleDateSelect.bind(this);
    }

    handleCalendarClick() {        
        if(!this.state.show){
            var viewDate: Date = this.state.selectedDate 
                ? new Date(this.state.selectedDate.getTime())
                : new Date();
                
            this.setState({
                show: true,
                viewDate: viewDate,            
                viewYear: viewDate.getFullYear(),
                viewMonth: viewDate.getMonth() + 1            
            });

            this._inputRef.current?.focus();
        }
        else {
            this.setState({
                show: false
            });
        }        
    }

    handleCalendarSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
        var value = parseInt(e.target.value);
        var viewDate = e.target.name === "viewYear" ? new Date(value, this.state.viewMonth - 1, 1) : new Date(this.state.viewYear, value - 1, 1);        
        this.setState({ 
            viewDate: viewDate,            
            viewYear: viewDate.getFullYear(),
            viewMonth: viewDate.getMonth() + 1
        });
    }

    handleCalendarPrevMonth() {
        var viewDate = new Date(this.state.viewDate.getTime());
        viewDate.setMonth(viewDate.getMonth() - 1);
        this.setState({ 
            viewDate: viewDate,            
            viewYear: viewDate.getFullYear(),
            viewMonth: viewDate.getMonth() + 1
        });
    }

    handleCalendarNextMonth() {
        var viewDate = new Date(this.state.viewDate.getTime());
        viewDate.setMonth(viewDate.getMonth() + 1);
        this.setState({ 
            viewDate: viewDate,            
            viewYear: viewDate.getFullYear(),
            viewMonth: viewDate.getMonth() + 1
        });
    }

    handleDateSelect(e: React.MouseEvent<HTMLDivElement>) {
        if(e.currentTarget.dataset['date']){
            var dateArr = e.currentTarget.dataset['date'].split('-');
            var selectedDate = new Date(parseInt(dateArr[0]), parseInt(dateArr[1]) - 1, parseInt(dateArr[2]));
            this.setState({
                selectedDate: selectedDate,
                show: false,
                selectedDateText: DateHelper.ToStringYearMonthDate(selectedDate)
            }, () => {
                if(this.props.onChange){
                    this.props.onChange(selectedDate);
                }
            });
        }
    }

    renderDatesView() {
        var date = new Date(this.state.viewDate.getTime());
        date.setDate(1);

        if(date.getDay() != 0){
            date.setDate(date.getDate() - date.getDay());
        }

        var rows = [];
        for(var r = 0; r < 6; r++){
            var cols = [];
            for(var c = 0; c < 7; c++){
                var isSelectedDate = this.state.selectedDate ? DateHelper.isDateOnlyEqual(date, this.state.selectedDate) : false;
                var isSameMonth = this.state.viewMonth === date.getMonth() + 1;
                cols.push(
                    <Col key={c} 
                         data-date={DateHelper.ToStringYearMonthDate(date)} 
                         onClick={this.handleDateSelect}
                         className={"calendar-day" + (isSelectedDate ? " calendar-day-selected" : "") + (isSameMonth ? "" : " calendar-day-other-month")}>
                        
                        {date.getDate()}
                    </Col>
                );
                date.setDate(date.getDate() + 1);
            }
            rows.push(<Row key={r}>{cols}</Row>);
        }

        return rows; 
    }

    renderMonthOptions() {
        return this._months.map((m, i) => <option key={i} value={m.number}>{m.shortenedName}</option>);
    }

    renderYearOptions() {
        var year = this.state.viewDate.getFullYear();
        var view = [];
        for(var y = year - 100; y < year + 80; y++){
            view.push(<option key={y} value={y}>{y}</option>);
        }

        return view;
    }

    render() {            
		return (
            <InputGroup className="mb-3" ref={this._inputGroupRef}>
                <FloatingLabel label={this.props.label} controlId={this.props.id} className="flex-grow-1">
                    <Form.Control
                        value={this.state.selectedDateText}

                        disabled={this.props.disabled}
                        name={this.props.name}
                        required={this.props.required}

                        style={{display: this.props.hidden === true ? 'none' : 'inherit'}}
                        placeholder={this.props.label}
                        tabIndex={this.props.tabIndex}

                        readOnly
                        onClick={this.handleCalendarClick}                        
                        className={"metadata-input calendar-input" + (this.state.show ? " calendar-focus" : "")}
                        ref={this._inputRef}
                    />
                </FloatingLabel>                            
                <i className="bi bi-calendar3 calendar-button" onClick={this.handleCalendarClick}></i>                
                <Overlay
                    show={this.state.show}
                    target={this._inputGroupRef}
                    container={this._inputGroupRef}
                    placement="bottom"
                    containerPadding={20}
                    rootClose={true}
                    rootCloseEvent="click"
                    onHide={() => {this.setState({ show: false })}}
                >
                    <Popover className="calendar-popover" >
                        <Popover.Header className="d-flex justify-content-between align-items-center">
                            <i className="bi bi-caret-left-fill clickable" onClick={this.handleCalendarPrevMonth}></i>
                            <div className="flex-grow-1 ps-3 pe-3 d-flex align-items-center justify-content-between">
                                <Form.Select size="sm" 
                                    value={this.state.viewMonth} 
                                    name="viewMonth"
                                    onChange={this.handleCalendarSelectChange}
                                >
                                    { this.renderMonthOptions() }
                                </Form.Select>
                                <Form.Select size="sm" 
                                    value={this.state.viewYear} 
                                    name="viewYear"
                                    onChange={this.handleCalendarSelectChange}
                                >
                                    { this.renderYearOptions() }
                                </Form.Select>
                            </div>
                            <i className="bi bi-caret-right-fill clickable" onClick={this.handleCalendarNextMonth}></i>
                        </Popover.Header>
                        <Popover.Body>
                            <Row>
                                <Col></Col>
                            </Row>
                            <Row className="calendar-date-header">
                                <Col>Su</Col>
                                <Col>Mo</Col>
                                <Col>Tu</Col>
                                <Col>We</Col>
                                <Col>Th</Col>
                                <Col>Fr</Col>
                                <Col>Sa</Col>
                            </Row>
                            { this.renderDatesView() }
                        </Popover.Body>
                    </Popover>
                </Overlay>
            </InputGroup>
		);
	}
}