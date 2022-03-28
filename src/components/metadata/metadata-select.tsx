
import React, { ChangeEvent } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { IKeyValuePair } from "../../models/common/key-value-pair";
import IMetadataControl from "./metadata-control";


export interface IMetadataSelect extends IMetadataControl {   
    options: IKeyValuePair<string|number, string|number>[];
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const MetadataSelect = (props: IMetadataSelect): JSX.Element => {

    function renderOptions(){
        if(props.options?.length > 0){
            var keys: any[] = [];
            return props.options.map((o, i) => {
                
                if(keys.indexOf(o.key) !== -1)
                    console.warn(`Key '${o.key}:${o.value}' is not unique...`);
                
                keys.push(o.key);
                return <option key={i} value={o.key}>{o.value}</option>
            });
        }
            
    }

    return (
        <FloatingLabel label={props.label} controlId={props.id}>
            <Form.Select                   
                value={props.onChange ? props.value : undefined}
                defaultValue={props.onChange ? undefined : props.value}

                disabled={props.disabled}
                name={props.name}
                required={props.required}

                onChange={props.onChange}
                style={{display: props.hidden === true ? 'none' : 'inherit'}}

                className="metadata-select"
            >
                {renderOptions()}
            </Form.Select> 
        </FloatingLabel>
    );
}