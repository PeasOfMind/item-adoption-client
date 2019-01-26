import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, change} from 'redux-form';

import {updateWishlistItem, toggleEditWishlist, addWishlistItem} from '../actions';
import {required, nonEmpty} from '../validators';

export class WishlistForm extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        if(typeof this.props.index === "number") {
            this.props.dispatch(change(`edit-wishlist-${this.props.index}`, `wishlist-item-${this.props.index}`, this.props.wishListArray[this.props.index].name));
        }
    }

    onSubmit(values){
        if(typeof this.props.index === "number"){
            const index = this.props.index;
            this.props.dispatch(updateWishlistItem(values[`wishlist-item-${index}`], index));
        } else {
            this.props.dispatch(addWishlistItem(values.newItem))
        }
    }

    handleClick(){
        this.props.dispatch(toggleEditWishlist(this.props.index));
    }
    
    render() {
        const {invalid, submitting} = this.props;
        if(typeof this.props.index === "number"){
            const fieldName = `wishlist-item-${this.props.index}`;
            return (
                <form className="wishlist-form" onSubmit={this.props.handleSubmit(values => 
                this.onSubmit(values))}>
                    <Field 
                        name={fieldName}
                        type="text"
                        component="input"
                        validate={[required, nonEmpty]}
                    />
                    <button 
                        type="submit"
                        disabled={invalid || submitting}
                        >Submit Edits</button>
                    <button 
                        type="reset"
                        onClick={this.handleClick}
                        >Cancel</button>
                </form>
            )
        } else {
            return (
                <form className="wishlist-form" onSubmit={this.props.handleSubmit(values => 
                    this.onSubmit(values))}>
                        <Field 
                            name="newItem"
                            type="text"
                            component="input"
                            validate={[required, nonEmpty]}
                        />
                        <button 
                            type="submit"
                            disabled={invalid || submitting}
                            >Submit New Item</button>
                    </form>
            )}
    }
}

WishlistForm = reduxForm()(WishlistForm);

const mapStateToProps = state => ({
    wishListArray: state.app.wishListArray
})

export default connect(mapStateToProps)(WishlistForm);