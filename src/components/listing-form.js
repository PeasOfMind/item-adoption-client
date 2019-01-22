import React from 'react';
import {reduxForm, Field, change} from 'redux-form'
import { connect } from 'react-redux';

import Input from './input';
import { toggleEditListing } from '../actions';
import {required, nonEmpty} from '../validators';

export class ListingForm extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        ['title', 'description', 'price'].forEach(field => {
            this.props.dispatch(change('edit-listing', field, this.props.itemListings[this.props.index][field]));
        })
    }

    handleOnClick(){
        this.props.dispatch(toggleEditListing());
    }

    render() {
        const allFields = ['Title', 'Description', 'Price'].map((field, key) => {
            return(
                <Field
                name={field.toLowerCase()}
                type="text"
                component={Input}
                key={key}
                label={field}
                validate={[required, nonEmpty]}
                />
            )
        })

        const {invalid, submitting} = this.props;

        return (
            <article className="form-container item-ad">
                <form className="item-form">
                {allFields}
                <button 
                    type="submit"
                    disabled={invalid || submitting}
                    >Submit Edits</button>
                <button onClick={this.handleOnClick}>Cancel</button>
                </form>
            </article>
    
        )
    }
}

ListingForm = reduxForm({form: 'edit-listing'})(ListingForm);

const mapStateToProps = state => ({
    itemListings: state.app.itemListings
})

export default connect(mapStateToProps)(ListingForm);