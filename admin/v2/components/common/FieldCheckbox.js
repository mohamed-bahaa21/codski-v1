import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import Icon from 'components/common/Icon';
import Check from 'assets/check.svg';
import styles from './Checkbox.module.css';

function Checkbox({ name, label, value }) {
  const ref = useRef();
  const onClick = () => ref.current.click();

  console.log('value: ', value);

  return (
    <div className={styles.container}>
      <div className={styles.checkbox} onClick={onClick}>
        {value && <Icon icon={<Check />} size="small" />}
      </div>
      <label className={styles.label} htmlFor={name} onClick={onClick}>
        {label}
      </label>
      <input
        ref={ref}
        className={styles.input}
        type="checkbox"
        name={name}
        defaultChecked={value}
      />
    </div>
  );
}

Checkbox.propTypes = {
  name: PropTypes.string,
  value: PropTypes.any,
  label: PropTypes.node,
  onChange: PropTypes.func,
};

export default Checkbox;
