import React from 'react';

import './header-component.styles.scss';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/divasity.svg';
import { auth } from '../../firebase/firebase.utils';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

const Header = ({ currentUser, hidden }) => (
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo'/>
        </Link>

        <div className='options'>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/contact'>
                CONTACT
            </Link>
            {
                //how tenary op works here if currentUser is set as an object(TRUE), if set as NULL then false
                currentUser ? 
                <div className='option' onClick={() => auth.signOut() }>SIGN OUT</div>
                :
                <Link className='option' to='/signin'>SIGN IN</Link>
            }

            <CartIcon/>

        </div>
        {
            hidden ? null : <CartDropdown/>
        }
    </div>
)

// const mapStateToProps = (state) => ({
//     currentUser: state.user.currentUser //key must be the same as the expected prop/argument for component 
// });
//an advance destructuring method ->
const mapStateToProps = ({ user: {currentUser}, cart: {hidden} }) => ({
    currentUser, hidden
})

export default connect(mapStateToProps)(Header);