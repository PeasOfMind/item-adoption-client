import React from 'react';
import {reduxForm, Field} from 'redux-form';

import Input from './input';
import { addListing, changeAddListingStatus } from '../actions';
import {required, nonEmpty} from '../validators';

export function AddListingForm(props){

    const onSubmit = values => {
        values.price = parseInt(values.price, 10);
        props.dispatch(addListing(values.title, values.description, values.price ));
    }

    const handleClick = () => {
        props.dispatch(changeAddListingStatus());
    }

    const {handleSubmit, pristine, submitting} = props;


    const allFields = ['Title', 'Description', 'Price'].map((field, key) => {
        let fieldType = "text";
        let validators = [required, nonEmpty];
        if (field === 'Price'){
            fieldType = "number";
            //removes the nonEmpty validator
            validators.pop();
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
                    >Submit New Listing</button>
                <button 
                    type="reset"
                    onClick={handleClick}
                    >Cancel</button>
            </form>
        </section>
    )
}

export default reduxForm({form: 'add-listing'})(AddListingForm);