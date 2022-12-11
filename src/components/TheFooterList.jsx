import React from 'react';
import FooterListItem from "./FooterListItem";

const TheFooterList = () => {
    return (
        <ul>
            {['Cookies', 'Privacy'].map(label =>
                <FooterListItem
                    key={label}
                >
                    {label}
                </FooterListItem>
            )}
        </ul>
    );
};

export default TheFooterList;