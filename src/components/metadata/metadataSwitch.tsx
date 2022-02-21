
import React, { ChangeEvent, Component } from "react";
import { Form } from "react-bootstrap";
import IMetadataControl from "./metadataControl";


export interface IMetadataSwitch extends IMetadataControl {
    checked: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>, isSelected: boolean) => void;
}

class MetadataSwitch extends Component<IMetadataSwitch> {
    constructor(props: IMetadataSwitch){
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e: ChangeEvent<HTMLInputElement>){
        if(this.props.onChange){
            this.props.onChange(e, e.target.checked);
        }
    }

    render() {
		return (
            <>
                <Form.Check 
                    checked={this.props.checked}
                    type="switch"  
                    onChange={this.handleChange}
                    label={this.props.label}

                    disabled={this.props.disabled}
                    name={this.props.name}
                    required={this.props.required}
                    
                    style={{display: this.props.hidden === true ? 'none' : 'inherit'}}
                    placeholder={this.props.label}
                    tabIndex={this.props.tabIndex}     
                    className="metadata-checkbox form-check"
                />
            </>
		);
	}
}

export default MetadataSwitch;