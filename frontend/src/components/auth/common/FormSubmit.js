import React from "react";
import PropTypes from 'prop-types';
import { FormGroup, HelpBlock } from "react-bootstrap";
import {FlatButton} from 'material-ui';

// Form submit component
export default class FormSubmit extends React.Component {
  // render
  render() {
    const {error, invalid, submitting, buttonSaveLoading, buttonSave, onTouchTap} = this.props;
    const btStyle = {
        width:'100%',
	    height: '56px',
	    borderRadius: '4px',
	    border: 'solid 1px rgba(255, 255, 255, 0.6)',
        color: '#ffffff'
    }
    return (
      <div>
        {error &&
        <FormGroup validationState="error">
          <HelpBlock>{error}</HelpBlock>
        </FormGroup>}

        <FormGroup className="submit">
          <FlatButton
              onTouchTap={onTouchTap}
              hoverColor="#2be3c7" style={btStyle} color='blue' type="submit" bsStyle="primary" disabled={invalid || submitting}>
            {submitting ?
              (buttonSaveLoading ? buttonSaveLoading : 'Saving...') :
              (buttonSave ? buttonSave : 'Save')}
          </FlatButton>
        </FormGroup>
      </div>
    );
  }
}

// prop checks
FormSubmit.propTypes = {
  error: PropTypes.string,  // redux-form general `_error` message
  invalid: PropTypes.bool,  // redux-form invalid prop
  submitting: PropTypes.bool,   // redux-form invalid submitting
  buttonSaveLoading: PropTypes.string, // save button loading text, default is "Saving..."
  buttonSave: PropTypes.string,    // save button text, default is "Save"
};
