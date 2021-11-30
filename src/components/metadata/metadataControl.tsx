export enum MetadataControlType {
    Input,
    Select,
    Textarea,
    DatePicker
}

export interface IMetadataControlWidth {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
}

export interface IMetadataFormControl{
    controlType: MetadataControlType;
    control: IMetadataControl;
}

export default interface IMetadataControl {
    id: string;
    label: string;
    value: string | number;
    name: string;   

    tabIndex?: number;
    disabled?: boolean;
    errorMessage?: string;
    hidden?: boolean;
    index?: number;    
    placeholder?: string; 
    required?: boolean;

    widths?: IMetadataControlWidth;
}