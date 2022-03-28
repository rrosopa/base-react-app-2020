
import React, { ChangeEvent } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import IMetadataControl from "./metadata-control";


export interface IMetadataInput extends IMetadataControl {    
    type?: string;
    
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const MetadataInput = (props: IMetadataInput): JSX.Element => {
    return (
        <FloatingLabel label={props.label} controlId={props.id}>
            <Form.Control
                value={props.onChange ? props.value : undefined}                    

                disabled={props.disabled}
                name={props.name}
                required={props.required}
                type={props.type}    

                onChange={props.onChange}
                style={{display: props.hidden === true ? 'none' : 'inherit'}}
                placeholder={props.label}
                tabIndex={props.tabIndex}

                className="metadata-input"
            />
            <Form.Control.Feedback type="invalid">{props.errorMessage}</Form.Control.Feedback>
        </FloatingLabel>
    );
}