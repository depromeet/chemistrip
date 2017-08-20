import React from 'react';
import {FlatButton} from 'material-ui';

const CustomFlatButton = ({isSelected, handleClick, text}) => {
    return (<FlatButton
        onClick={handleClick}
        style={{
            width: '49%',
            height: '56px',
            border: 'solid 1px #ced4da',
            backgroundColor: (isSelected) ? "#2be3c7" : "#f8f9fa",
            color: (isSelected) ? "#ffffff" : "#000000"
        }}
    >{text}</FlatButton>)
}

export default CustomFlatButton;
