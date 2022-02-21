import React, { ChangeEvent, Component } from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps } from 'react-router-dom';
import { PagePath } from '../../constants/pagePath';
import { ICurrentUserDetails } from '../../models/users/CurrentUserDetails';
import { IAppState } from '../../store/store';
import LayoutMain from '../../components/layout/main';
import UserProfilePage from '../user/profile';
import MetadataFilter from '../../components/metadata/metadataFilter';
import { MetadataControlType } from '../../components/metadata/metadataControl';
import { IMetadataInput } from '../../components/metadata/metadataInput';
import { IMetadataSelect } from '../../components/metadata/metadataSelect';
import MetadataDatePicker, { IMetadataDatePicker } from '../../components/metadata/metadataDatePicker';
import { DateHelper } from '../../helpers/dateHelper';

interface IRouteProps { }

interface IProps extends RouteComponentProps<IRouteProps> {
    currentUser: ICurrentUserDetails;
    dispatch: any;
}

interface IState { 
    userMenu: boolean;
    name: string;
    select: number | undefined;
    date: string;
}

class HomePage extends Component<IProps, IState> {
    constructor(props: IProps){
        super(props);

        this.state = {
            userMenu: false,
            name: '',
            select: undefined,
            date: ''
        };
        
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.onRemoveFilter = this.onRemoveFilter.bind(this);
        this.onUserNavOpenClick = this.onUserNavOpenClick.bind(this);
        this.onUserNavCloseClick = this.onUserNavCloseClick.bind(this);
    }

    private handleInputChange(e: ChangeEvent<HTMLInputElement>) { //e is element
        this.setState({ ...this.state, [e.target.name]: e.target.value });
    }

    private handleSelectChange(e: ChangeEvent<HTMLSelectElement>) { //e is element
        this.setState({ ...this.state, [e.target.name]: e.target.value });
    }

    private handleDateChange(date: Date) {
        this.setState({ date: DateHelper.ToStringYearMonthDate(date) });
    }

    private onRemoveFilter(propName:string, callback?:() => void) { //e is element
        this.setState({ ...this.state, [propName]: '' }, callback);
    }

    private onUserNavOpenClick() {        
        this.setState({userMenu: true});        
    }

    private onUserNavCloseClick() {
        this.setState({userMenu: false});
    }

    render() {
		return (
			<LayoutMain currentPath={this.props.location.pathname} addAction={() => {}}>
                {/* <MetadataDatePicker id='username' label='Date' name='Date' value={this.state.date} /> */}
                <MetadataFilter 
                    id="filter" 
                    onRemoveFilter={this.onRemoveFilter}                    
                    metadata={[
                        {
                            controlType: MetadataControlType.Input,
                            control:  {
                                    id: 'username',
                                    label: 'Name',
                                    value: this.state.name,
                                    name: 'name',
                                    onChange: this.handleInputChange
                            } as IMetadataInput,                     
                        },
                        {
                            controlType: MetadataControlType.Select,
                            control: {
                                id: 'select',
                                label: 'Select',
                                value: this.state.select,
                                name: 'select',
                                onChange: this.handleSelectChange,
                                options: [
                                    {key: 0, value:'none'},
                                    {key: 1, value:'one'},
                                    {key: 2, value:'two'},
                                    {key: 3, value:'three'}
                                ]                        
                            } as IMetadataSelect,
                        },
                        {
                            controlType: MetadataControlType.DatePicker,
                            control:  {
                                    id: 'date',
                                    label: 'Date',
                                    value: this.state.date,
                                    name: 'Date',
                                    onChange: this.handleDateChange
                            } as IMetadataDatePicker,                     
                        },
                    ]}
                />
            </LayoutMain>
		);
	}
}

const mapStateToProps = (store: IAppState) => {
	return {
		currentUser: store.currentUserState.currentUser
	};
}

const mapDispatchToProps = (dispatch: any) => {
    return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
