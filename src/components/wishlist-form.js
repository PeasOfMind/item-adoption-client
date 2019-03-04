import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, change} from 'redux-form';

import {updateWishItem, toggleEditWishlist, postWishItem} from '../actions';
import {required, nonEmpty} from '../validators';

import './wishlist-form.css'

export class WishlistForm extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        if(this.props.id) {
            //if there is an index associated with this form, then fill the form with pre-existing values
            this.props.dispatch(change(`edit-wishlist-${this.props.id}`, "title", this.props.wishlist[this.props.index].title));
        }
    }

    onSubmit(values){
        if(this.props.id){
            const updatedValues = {id: this.props.id, title: values.title};
            return this.props.dispatch(updateWishItem(updatedValues));
        } else {
            return this.props.dispatch(postWishItem({title: values.title}));
        }
    }

    handleClick(){
        this.props.dispatch(toggleEditWishlist(this.props.id));
    }
    
    render() {
        const {invalid, submitting} = this.props;
        if(this.props.id){
            let errorText = '';
            const item = this.props.wishlist[this.props.index];
            //generate an edit wish item form
            if (item.fetchError) {
                errorText += <p className="error fetch-error">Problem fetching this wish item. Error code {item.fetchError.code}: {item.fetchError.message}</p>
            }
            if (item.updateError) {
                errorText += <p className="error update-error">Problem updating this wish item. Error code {item.updateError.code}: {item.updateError.message}. Try again later.</p> 
            }
            if (item.deleteError) {
                errorText += <p className="error delete-error">Problem deleting this wish item. Error code {item.deleteError.code}: {item.deleteError.message}. Try again later.</p> 
            }
            return (
                <form className="wishlist-form" onSubmit={this.props.handleSubmit(values => 
                this.onSubmit(values))}>
                    <Field 
                        name="title"
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
                    {errorText}
                </form>
            )
        } else {
            let postErrorText = '';
            if(this.props.postWishItemError){
                postErrorText = <p className="error post-wish-error">Unable to add this wish item. Error code {this.props.postWishItemError.code}: {this.props.postWishItemError.message}</p>
            }
            //generate an add wish item form
            return (
                <form className="wishlist-form" onSubmit={this.props.handleSubmit(values => 
                    this.onSubmit(values))}>
                    <Field 
                        name="title"
                        type="text"
                        component="input"
                        validate={[required, nonEmpty]}
                    />
                    <button 
                        type="submit"
                        disabled={invalid || submitting}
                        >Submit New Item</button>
                    {postErrorText}
                </form>
            )}
    }
}

WishlistForm = reduxForm()(WishlistForm);

const mapStateToProps = state => ({
    wishlist: state.app.wishlist,
    postWishItemError: state.app.postWishItemError
})

export default connect(mapStateToProps)(WishlistForm);