
import React, { ChangeEvent } from "react";
import { Form } from "react-bootstrap";
import IMetadataControl from "./metadata-control";


export interface IMetadataCheckbox extends IMetadataControl {
    checked: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>, isSelected: boolean) => void;
}

export const MetadataCheckbox = (props : IMetadataCheckbox): JSX.Element => {
    
    function handleChange(e: ChangeEvent<HTMLInputElement>){
        if(props.onChange){
            props.onChange(e, e.target.checked);
        }
    }

    return (
        <>
            <Form.Check className="metadata-checkbox form-check">
                <Form.Check.Input 
                    checked={props.checked}
                    type="checkbox"  
                    onChange={handleChange}

                    disabled={props.disabled}
                    name={props.name}
                    required={props.required}
                    
                    style={{display: props.hidden === true ? 'none' : 'inherit'}}
                    placeholder={props.label}
                    tabIndex={props.tabIndex}                        
                />
                <Form.Check.Label>{props.label}</Form.Check.Label>
                <Form.Control.Feedback type="invalid">{props.errorMessage}</Form.Control.Feedback>
            </Form.Check>
        </>
    );
}