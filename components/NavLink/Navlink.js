import React from "react";
import Link from 'next/link';

import ActiveLink from '../ActiveLink';

const Navlink = ({link, name, className}) => {
    const dropdownClassName = className || '';

    return (
        <>
            <ActiveLink activeClassName='active' route={link}>
                <a className={`nav-link port-navbar-link ${dropdownClassName}`}>{name}</a>
            </ActiveLink>
        </>
    )
}

export default Navlink;