import React from 'react';

const InfoMessage = props => {
    return <div {...props}>{props.children}</div>;
};

export default InfoMessage;