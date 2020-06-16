import React from 'react'
import CustomButton from '../custom-button/custom-button.component'
import CartItem from '../cart-item/cart-item.component'
import './cart-dropdown.styles.scss'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {selectCartItems} from '../../redux/cart/cart.selector'
import cartItem from '../cart-item/cart-item.component'
import {toggleCartHidden} from '../../redux/cart/cart.actions'
import {withRouter} from 'react-router-dom'

const CartDropdown = ({cartItems, history, dispatch}) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            {   cartItems.length ?
                cartItems.map(cartItem => 
                    (<CartItem key={cartItem.id} item={cartItem} />
            ))
        : <span className='empty-message'>Your Cart is Empty</span>
        }
        </div> 
        <CustomButton 
            onClick={
                () => {
                    history.push('/checkout')
                    dispatch(toggleCartHidden())
            }}
            inverted>CHECKOUT</CustomButton>
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})

export default withRouter(connect(mapStateToProps)(CartDropdown))