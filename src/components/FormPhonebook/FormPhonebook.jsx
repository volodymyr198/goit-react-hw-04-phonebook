import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import css from './FormPhonebook.module.css';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

class FormPhonebook extends Component {
    handleSubmit = (values, { resetForm }) => {
        console.log(values);

        this.props.onSubmit(values);
        resetForm();
    };

    validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(16, 'Too Long!')
            .required('Name is required field'),
        number: Yup.number()
            .typeError('That does not look like a phone number')
            .positive("A phone number can't start with a minus")
            .integer("A phone number can't include a decimal point")
            .min(8)
            .required('A phone number is required'),
    });

    initialValues = {
        name: '',
        number: '',
    };

    render() {
        return (
            <Formik
                initialValues={this.initialValues}
                validationSchema={this.validationSchema}
                onSubmit={this.handleSubmit}
            >
                <Form className={css.formPhone}>
                    <label className={css.formLabel}>
                        Name
                        <Field
                            className={css.formInput}
                            type="text"
                            name="name"
                        />
                        <ErrorMessage name="name" component="div" />
                    </label>
                    <label className={css.formLabel}>
                        Number
                        <Field
                            className={css.formInput}
                            type="tel"
                            name="number"
                        />
                        <ErrorMessage name="number" component="div" />
                    </label>
                    <button className={css.formBtn} type="submit">
                        Add contact
                    </button>
                </Form>
            </Formik>
        );
    }
}

FormPhonebook.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default FormPhonebook;
