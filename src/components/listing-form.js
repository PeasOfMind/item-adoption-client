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
        ['title', 'description', 'price'].forEach(field => {
            this.props.dispatch(change(`edit-listing-${this.props.index}`, `${field}-${this.props.index}`, this.props.itemListings[this.props.index][field]));
        })
    }

    onSubmit(values){
        const index = this.props.index;
        const updatedValues = ['title', 'description', 'price'].map(field => {
            if (field === 'price') return parseInt(values[`${field}-${index}`], 10);
            return values[`${field}-${index}`];
        });
        this.props.dispatch(updateListing(...updatedValues, index));
    }

    handleClick(){
        this.props.dispatch(toggleEditListing(this.props.index));
    }

    render() {
        const {pristine, submitting, index} = this.props;
        const allFields = ['Title', 'Description', 'Price'].map((field, key) => {
            let fieldType = "text";
            let validators = [required, nonEmpty];
            const fieldName = `${field.toLowerCase()}-${index}`;
            if (field === 'Price'){
                fieldType = "number";
                //removes the nonEmpty validator
                validators.pop()
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
                <p>If item is free, enter a price of 0 (zero)</p>
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