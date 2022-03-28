import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { IMetadataCheckbox, MetadataCheckbox } from "./metadata-checkbox";
import { IMetadataFormControl, MetadataControlType } from "./metadata-control";
import { IMetadataDatePicker, MetadataDatePicker } from "./metadata-date-picker";
import { IMetadataInput, MetadataInput } from "./metadata-input";
import { IMetadataSelect, MetadataSelect } from "./metadata-select";
import { IMetadataSwitch, MetadataSwitch } from "./metadata-switch";
import { IMetadataTextArea, MetadataTextArea } from "./metadata-textarea";


export interface IMetadataForm {
    id: string;
    header?: string;

    metadata: Array<IMetadataFormControl>;

    btnSubmitText?: string;
    onSubmit?: () => void;

    btnCancelText?: string;
    onCancel?: () => void;
}

export const MetadataForm = (props: IMetadataForm): JSX.Element => {
    let _formRef = React.createRef<HTMLFormElement>();
    const [validatedformClass, setvalidatedformClass] = useState('');

    function renderControls() {
        if(props.metadata?.length > 0){
            if(props.metadata.find(m => m.control.tabIndex != undefined)) { }
            else{
                props.metadata.forEach((m, i, arr) => {
                    arr[i].control.tabIndex = i + 1
                });
            }

            return props.metadata.map((m, i) => 
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
                        { renderControlAs(m) }                        
                    </Form.Group>
                </Col>
            );
        }            
    }

    function renderControlAs(metadataFormControl: IMetadataFormControl){
        if(metadataFormControl.controlType === MetadataControlType.Input)
            return <MetadataInput {...(metadataFormControl.control as IMetadataInput)} />
        else if(metadataFormControl.controlType === MetadataControlType.Select)
            return <MetadataSelect {...(metadataFormControl.control as IMetadataSelect)} />
        else if(metadataFormControl.controlType === MetadataControlType.Textarea)
            return <MetadataTextArea {...(metadataFormControl.control as IMetadataTextArea)} />
        else if(metadataFormControl.controlType === MetadataControlType.DatePicker)
            return <MetadataDatePicker {...(metadataFormControl.control as IMetadataDatePicker)} />
        else if(metadataFormControl.controlType === MetadataControlType.Checkbox)
            return <MetadataCheckbox {...(metadataFormControl.control as IMetadataCheckbox)} />
            else if(metadataFormControl.controlType === MetadataControlType.Switch)
                return <MetadataSwitch {...(metadataFormControl.control as IMetadataSwitch)} />
            
    }

    function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) { 
        e.preventDefault();
        
        if(_formRef.current){
            if(!_formRef.current.checkValidity()){                
                setvalidatedformClass('was-validated');
                return;
            }            

            if(props.onSubmit)
                props.onSubmit();
        }        
    }

    function renderBtnSubmit(){
        if(props.onSubmit){
            return  (
                <Button variant="outline-primary" type="submit" onClick={handleSubmit}>
                    {props.btnSubmitText ?? "Submit"}
                </Button>
            );            
        }
    }

    function handleCancel(){
        // do other stuff here if needed eg: hide button?, load button?
        
        if(props.onCancel)
            props.onCancel();
    }

    function renderBtnCancel(){
        if(props.onCancel){
            return  (
                <Button variant="outline-danger me-3" onClick={handleCancel}>
                    {props.btnCancelText ?? "Cancel"}
                </Button>
            );            
        }
    }
    
    function renderHeader(){
        if(props.header)
            return (
                <Row>
                    <Col className="pb-3"><h3>{props.header}</h3></Col>
                </Row>
            )
    }

    return (
        <Form id={props.id} className={"p2 w-100 " + validatedformClass} ref={_formRef} >
            {renderHeader()}
            <Row>
                { renderControls() }
            </Row>
            <Row className="pt-2">
                <Col className="d-flex justify-content-end align-items-center">
                    { renderBtnCancel() }
                    { renderBtnSubmit() }
                </Col>
            </Row>
        </Form>
    );
}