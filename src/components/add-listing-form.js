import React from 'react';
import {reduxForm, Field} from 'redux-form';

import Input from './input';
import { postListing, changeAddListingStatus } from '../actions';
import {required, nonEmpty} from '../validators';

import './add-listing-form.css'

export function AddListingForm(props){

    const onSubmit = values => {
        let {title, description, price, zipcode} = values;
        price = parseInt(price, 10);
        zipcode = parseInt(zipcode, 10);
        props.dispatch(postListing({title, description, price, zipcode}));
    }

    const handleClick = () => {
        props.dispatch(changeAddListingStatus());
    }

    const {handleSubmit, pristine, submitting} = props;


    const allFields = ['Title', 'Description', 'Price', 'Zipcode'].map((field, key) => {
        let fieldType = "text";
        let validators = [required, nonEmpty];
        if (field === 'Price' || field === 'Zipcode'){
            fieldType = "number";
        }
        return(
            <Field
            name={field.toLowerCase()}
            type={fieldType}
            component={Input}
            key={key}
            label={field}
            validate={validators}
            />
        )
    })

    return(
        <section className="form-container">
            <form className="new-listing" onSubmit={handleSubmit(values => onSubmit(values))}>
                {allFields}
                <p>If item is free, enter a price of 0 (zero)</p>
                <button 
                    type="submit"
                    disabled={pristine || submitting}
                    >Submit A New Listing</button>
                <button 
                    type="reset"
                    onClick={handleClick}
                    >Cancel</button>
            </form>
        </section>
    )
}

export default reduxForm({form: 'add-listing'})(AddListingForm);