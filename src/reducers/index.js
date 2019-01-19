import {CHANGE_FORM_TYPE} from '../actions';

const dummyState = {
    navLinks: ['Login', 'Signup'],
    formType: 'Signup',
    itemListings: [
        {
            title: `TV - 32" with stand and mounting equipment`,
            description: `Sony branded smart tv. Comes with screws for mounting into the wall and free chromecast.`,
            price: `100`,
            expiresIn: `10 days`,
        },
        {
            title: `Blendtec Blender`,
            description: `Great blender only 2 years old. Still has 6 years left on warranty.`,
            price: `50`,
            expiresIn: `5 days`,
        },
    ],
    wishListArray: ['iPhone 8 or up', 'Macbook charger', 'Sandals in size 5 womens']
}

export default (state=dummyState, action) => {
    if (action.type === CHANGE_FORM_TYPE) {
        if (!action.formType){
            if (state.formType === 'Login'){
                action.formType = 'Signup';
            } else if (state.formType === 'Signup'){
                action.formType = 'Login';
            }
        }
        return Object.assign({}, state, {
            formType: action.formType
        })
    }

    return state;
}