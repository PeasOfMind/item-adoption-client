import React from 'react';
import {reduxForm, Field, change} from 'redux-form'
import { connect } from 'react-redux';

import Input from './input';
import { toggleEditListing, updateListing } from '../actions';
import {required, nonEmpty} from '../validators';

import './listing-form.css';

export class ListingForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        const currentListing = this.props.itemListings.find(listing => {
            return listing.id === this.props.index;
        });
        ['title', 'description', 'price'].forEach(field => {
            this.props.dispatch(change(`edit-listing-${this.props.index}`, field, currentListing[field]));
        });
    }

    onSubmit(values){
        const updatedValues = {id: this.props.index};
        ['title', 'description', 'price'].forEach(field => {
            //convert price to a number to match data type in database
            if (field === 'price') updatedValues[field] = parseInt(values[field], 10);
            updatedValues[field] = values[field];
        });
        this.props.dispatch(updateListing(updatedValues));
    }

    handleClick(){
        this.props.dispatch(toggleEditListing(this.props.index));
    }

    render() {
        const {pristine, submitting} = this.props;
        const allFields = ['Title', 'Description', 'Price'].map((field, key) => {
            let fieldType = 'text';
            let validators = [required, nonEmpty];
            const fieldName = `${field.toLowerCase()}`;
            if (field === 'Price'){
                //no validators (this field is optional)
                return(
                    <Field
                        name={fieldName}
                        type='number'
                        component={Input}
                        key={key}
                        label={`${field} (Leave empty if item is free)`}
                    />
                )
            }
            return(
                <Field
                    name={fieldName}
                    type={fieldType}
                    component={Input}
                    key={key}
                    label={field}
                    validate={validators}
                />
            )
        })

        return (
            <article className="form-container item-ad">
                <form className="item-form" onSubmit={this.props.handleSubmit(values => 
                this.onSubmit(values)
                )}>
                {allFields}
                <button 
                    type="submit"
                    disabled={pristine || submitting}
                    >Submit Edits</button>
                <button 
                    type="reset"
                    onClick={this.handleClick}
                    >Cancel</button>
                </form>
            </article>
    
        )
    }
}

ListingForm = reduxForm()(ListingForm);

const mapStateToProps = state => ({
    itemListings: state.app.itemListings
})

export default connect(mapStateToProps)(ListingForm);