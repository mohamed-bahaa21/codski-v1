import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import Logo from 'assets/logo.svg';
import styles from './EmptyPlaceholder.module.css';

function EmptyPlaceholder({ msg, children }) {
  return (
    <div className={styles.placeholder}>
      <Icon className={styles.icon} icon={<img src="/logoIcon.png" width={`50px`} />} size="small" />
      <h2 className={styles.msg}>{msg}</h2>
      {children}
    </div>
  );
}

EmptyPlaceholder.propTypes = {
  msg: PropTypes.node,
  children: PropTypes.node,
};

export default EmptyPlaceholder;
