
import React, { ChangeEvent, Component } from "react";
import { Form } from "react-bootstrap";
import IMetadataControl from "./metadataControl";


export interface IMetadataCheckbox extends IMetadataControl {
    checked: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>, isSelected: boolean) => void;
}

class MetadataCheckbox extends Component<IMetadataCheckbox> {
    constructor(props: IMetadataCheckbox){
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
                <Form.Check className="metadata-checkbox form-check">
                    <Form.Check.Input 
                        checked={this.props.checked}
                        type="checkbox"  
                        onChange={this.handleChange}

                        disabled={this.props.disabled}
                        name={this.props.name}
                        required={this.props.required}
                        
                        style={{display: this.props.hidden === true ? 'none' : 'inherit'}}
                        placeholder={this.props.label}
                        tabIndex={this.props.tabIndex}                        
                    />
                    <Form.Check.Label>{this.props.label}</Form.Check.Label>
                    <Form.Control.Feedback type="invalid">{this.props.errorMessage}</Form.Control.Feedback>
                </Form.Check>
            </>
		);
	}
}

export default MetadataCheckbox;