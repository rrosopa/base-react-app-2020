import React, { Component } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { IMetadataFormControl, MetadataControlType } from "./metadataControl";
import MetadataInput, { IMetadataInput } from "./metadataInput";
import MetadataSelect, { IMetadataSelect } from "./metadataSelect";
import MetadataTextArea, { IMetadataTextArea } from "./metadataTextArea";


export interface IMetadataForm {
    id: string;
    header?: string;

    metadata: Array<IMetadataFormControl>;

    btnSubmitText?: string;
    onSubmit?: () => void;

    btnCancelText?: string;
    onCancel?: () => void;
}

interface IState {
    validatedformClass: string;
}

class MetadataForm extends Component<IMetadataForm, IState> {
    _formRef = React.createRef<HTMLFormElement>();

    constructor(props: IMetadataForm){
        super(props);

        this.state = {
            validatedformClass: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    renderControls(){
        if(this.props.metadata?.length > 0){
            if(this.props.metadata.find(m => m.control.tabIndex != undefined)) { }
            else{
                this.props.metadata.forEach((m, i, arr) => {
                    arr[i].control.tabIndex = i + 1
                });
            }

            return this.props.metadata.map((m, i) => 
                <Col className="mb-3"
                    xs={m.control.widths?.xs ?? 12}
                    sm={m.control.widths?.sm}
                    md={m.control.widths?.md}
                    lg={m.control.widths?.lg}
                    xl={m.control.widths?.xl}
                    xxl={m.control.widths?.xxl}
                    key={i}
                >
                    <Form.Group>
                        { this.renderControlAs(m) }                        
                    </Form.Group>
                </Col>
            );
        }            
    }

    renderControlAs(metadataFormControl: IMetadataFormControl){
        if(metadataFormControl.controlType === MetadataControlType.Input)
            return <MetadataInput {...(metadataFormControl.control as IMetadataInput)} />
        else if(metadataFormControl.controlType === MetadataControlType.Select)
            return <MetadataSelect {...(metadataFormControl.control as IMetadataSelect)} />
        else if(metadataFormControl.controlType === MetadataControlType.Textarea)
            return <MetadataTextArea {...(metadataFormControl.control as IMetadataTextArea)} />
    }

    handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) { 
        e.preventDefault();
        
        if(this._formRef.current){
            if(!this._formRef.current.checkValidity()){                
                this.setState({ validatedformClass: 'was-validated'});
                return;
            }            

            if(this.props.onSubmit)
                this.props.onSubmit();
        }        
    }

    renderBtnSubmit(){
        if(this.props.onSubmit){
            return  (
                <Button variant="outline-primary" type="submit" onClick={this.handleSubmit}>
                    {this.props.btnSubmitText ?? "Submit"}
                </Button>
            );            
        }
    }

    handleCancel(){
        // do other stuff here if needed eg: hide button?, load button?
        
        if(this.props.onCancel)
            this.props.onCancel();
    }

    renderBtnCancel(){
        if(this.props.onCancel){
            return  (
                <Button variant="outline-danger" onClick={this.handleCancel}>
                    {this.props.btnSubmitText ?? "Cancel"}
                </Button>
            );            
        }
    }
    
    renderHeader(){
        if(this.props.header)
            return (
                <Row>
                    <Col className="pb-3"><h3>{this.props.header}</h3></Col>
                </Row>
            )
    }

    render() {
		return (
            <Form id={this.props.id} className={"p2 w-100 " + this.state.validatedformClass} ref={this._formRef} >
                {this.renderHeader()}
                <Row>
                    { this.renderControls() }
                </Row>
                <Row className="pt-2">
                    <Col className="d-flex justify-content-end align-items-center">
                        { this.renderBtnCancel() }
                        { this.renderBtnSubmit() }
                    </Col>
                </Row>
            </Form>
		);
	}
}

export default MetadataForm;