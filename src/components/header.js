import React from 'react';

import mobileHeaderLight from '../images/bg-mobile-light.jpg';
import desktopHeaderLight from '../images/bg-desktop-light.jpg';

import mobileHeaderDark from '../images/bg-mobile-dark.jpg';
import desktopHeaderDark from '../images/bg-desktop-dark.jpg';

function Header(props) {
    return (
        <header className='header'>
            <picture className='header__picture'>
                <source media='(max-width: 34rem)' srcSet={props.lightTheme ? mobileHeaderLight : mobileHeaderDark} />
                <source media='(min-width: 35rem)' srcSet={props.lightTheme ? desktopHeaderLight : desktopHeaderDark} />
                <img className='header__picture__img' src={props.lightTheme ? desktopHeaderLight : desktopHeaderDark} />
            </picture>
        </header>
    )
}

export default Header;