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
        const currentWishItem = this.props.wishlist.find(item => {
            return item.id === this.props.index;
        });
        if(this.props.index) {
            //if there is an index associated with this form, then fill the form with pre-existing values
            this.props.dispatch(change(`edit-wishlist-${this.props.index}`, "title", currentWishItem.title));
        }
    }

    onSubmit(values){
        if(this.props.index){
            const updatedValues = {id: this.props.index, title: values.title};
            this.props.dispatch(updateWishItem(updatedValues));
        } else {
            this.props.dispatch(postWishItem({title: values.title}));
        }
    }

    handleClick(){
        this.props.dispatch(toggleEditWishlist(this.props.index));
    }
    
    render() {
        const {invalid, submitting} = this.props;
        if(this.props.index){
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
                </form>
            )
        } else {
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
                    </form>
            )}
    }
}

WishlistForm = reduxForm()(WishlistForm);

const mapStateToProps = state => ({
    wishlist: state.app.wishlist
})

export default connect(mapStateToProps)(WishlistForm);