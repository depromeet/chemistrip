import React from "react";
import PropTypes from 'prop-types';
import { FormGroup, HelpBlock } from "react-bootstrap";
import {Button } from 'semantic-ui-react';

// Form submit component
export default class FormSubmit extends React.Component {
  // render
  render() {
    const {error, invalid, submitting, buttonSaveLoading, buttonSave} = this.props;
    return (
      <div>
        {error &&
        <FormGroup validationState="error">
          <HelpBlock>{error}</HelpBlock>
        </FormGroup>}

        <FormGroup className="submit">
          <Button color='blue' fluid type="submit" bsStyle="primary" disabled={invalid || submitting}>
            {submitting ?
              (buttonSaveLoading ? buttonSaveLoading : 'Saving...') :
              (buttonSave ? buttonSave : 'Save')}
          </Button>
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
