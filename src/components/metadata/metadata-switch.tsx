import React, { ChangeEvent } from "react";
import { Form } from "react-bootstrap";
import IMetadataControl from "./metadata-control";


export interface IMetadataSwitch extends IMetadataControl {
    checked: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>, isSelected: boolean) => void;
}

export const MetadataSwitch = (props: IMetadataSwitch): JSX.Element => {    
    
    function handleChange(e: ChangeEvent<HTMLInputElement>){
        if(props.onChange){
            props.onChange(e, e.target.checked);
        }
    }

    return (
        <>
            <Form.Check 
                checked={props.checked}
                type="switch"  
                onChange={handleChange}
                label={props.label}

                disabled={props.disabled}
                name={props.name}
                required={props.required}
                
                style={{display: props.hidden === true ? 'none' : 'inherit'}}
                placeholder={props.label}
                tabIndex={props.tabIndex}     
                className="metadata-checkbox form-check"
            />
        </>
    );
}