import React from 'react';
import {reduxForm, Field, change} from 'redux-form'
import { connect } from 'react-redux';

import Input from './input';
import { toggleEditListing, updateListing } from '../actions';
import {required, nonEmpty} from '../validators';

export class ListingForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        ['title', 'description', 'price'].forEach(field => {
            this.props.dispatch(change('edit-listing', field, this.props.itemListings[this.props.index][field]));
        })
    }

    onSubmit(values){
        this.props.dispatch(updateListing(values.title, values.description, values.price, this.props.index));
    }

    handleClick(){
        console.log('Clicked');
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
                <form className="item-form" onSubmit={this.props.handleSubmit(values => 
                this.onSubmit(values)
                )}>
                {allFields}
                <button 
                    type="submit"
                    disabled={invalid || submitting}
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

ListingForm = reduxForm({form: 'edit-listing'})(ListingForm);

const mapStateToProps = state => ({
    itemListings: state.app.itemListings
})

export default connect(mapStateToProps)(ListingForm);