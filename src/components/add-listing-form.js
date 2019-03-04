import React from 'react';
import {reduxForm, Field} from 'redux-form';
import { connect } from 'react-redux';

import Input from './input';
import { postListing, changeAddListingStatus, toggleZipEntry } from '../actions';
import {required, nonEmpty, validNum, validZip} from '../validators';

import './add-listing-form.css'

export function AddListingForm(props){

    const onSubmit = values => {
        let {title, description, price, zipcode} = values;
        price = parseInt(price, 10);
        zipcode = parseInt(zipcode, 10);
        props.dispatch(postListing({title, description, price, zipcode}));
    }

    const handleOnClick = clickType => {
        if (clickType === "reset"){
            props.dispatch(changeAddListingStatus());
            if (props.addingListingZip) props.dispatch(toggleZipEntry());
        } else if (clickType === "zip"){
            props.dispatch(toggleZipEntry());
        }
    }

    const {handleSubmit, pristine, submitting} = props;


    const allFields = ['Title', 'Description', 'Price'].map((field, key) => {
        let fieldType = "text";
        let validators = [required, nonEmpty];
        if (field === 'Price') {
            //specifies special label for price
            return (
                <Field
                    name={field.toLowerCase()}
                    type='number'
                    component={Input}
                    key={key}
                    label={`${field} (Leave empty if item is free)`}
                />
            )
        } else if (field === 'Description') validators = []; //description is optional
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

    let listingZipText;
    if (props.addingListingZip) {
        listingZipText = <Field 
        name="zipcode"
        type="text"
        component={Input}
        label="Alternate Location Zipcode"
        validate={[validNum, validZip]}
        />
    } else {
        listingZipText = <button 
        type="button"
        onClick={() => handleOnClick("zip")}
        >List at an alternate location?</button>
    }

    return(
        <section className="form-container">
            <form className="new-listing" onSubmit={handleSubmit(values => onSubmit(values))}>
                {allFields}
                {listingZipText}
                <button 
                    type="submit"
                    disabled={pristine || submitting}
                    >Submit A New Listing</button>
                <button 
                    type="reset"
                    onClick={() => handleOnClick("reset")}
                    >Cancel</button>
            </form>
        </section>
    )
}

const mapStateToProps = state => ({
    addingListingZip: state.app.addingListingZip
})

const connectedAddListingForm = connect(mapStateToProps)(AddListingForm);

export default reduxForm({form: 'add-listing'})(connectedAddListingForm);
