import React from 'react';
import Link from 'components/common/Link';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import NoData from 'components/common/NoData';
import styles from './Table.module.css';

function Table({
  columns,
  rows,
  empty,
  className,
  bodyClassName,
  rowKey,
  showHeader = true,
  children,
}) {
  if (empty && rows.length === 0) {
    return empty;
  }

  return (
    <div className={classNames(styles.table, className)}>
      {showHeader && (
        <div className={classNames(styles.header, 'row')}>
          {columns.map(({ key, label, className, style, header }) => (
            <div
              key={key}
              className={classNames(styles.head, className, header?.className)}
              style={{ ...style, ...header?.style }}
            >
              {label}
            </div>
          ))}
        </div>
      )}
      <div className={classNames(styles.body, bodyClassName)}>
        {rows.length === 0 && <NoData />}
        {!children &&
          rows.map((row, index) => {
            const id = rowKey ? rowKey(row) : index;
            return <TableRow key={id} columns={columns} row={row} />;
          })}
        {children}
      </div>
    </div>
  );
}

const styledObject = PropTypes.shape({
  className: PropTypes.string,
  style: PropTypes.object,
});

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      cell: styledObject,
      className: PropTypes.string,
      header: styledObject,
      key: PropTypes.string,
      label: PropTypes.node,
      render: PropTypes.func,
      style: PropTypes.object,
    }),
  ),
  rows: PropTypes.arrayOf(PropTypes.object),
  empty: PropTypes.node,
  className: PropTypes.string,
  bodyClassName: PropTypes.string,
  rowKey: PropTypes.func,
  showHeader: PropTypes.bool,
  children: PropTypes.node,
};

export default Table;

export const TableRow = ({ columns, row }) => (
  <div className={classNames(styles.row, 'row')}>
    {columns.map(({ key, render, className, style, cell }, index) => (
      <div
        key={`${key}-${index}`}
        className={classNames(styles.cell, className, cell?.className)}
        style={{ ...style, ...cell?.style }}
      >
        {console.log(row.unread)}
        <Link href={`/chat/${row.username}`}>
          <div style={row.unread ? { backgroundColor: 'rgb(211 149 41)', color: 'white' } : {}}>{render ? render(row) : row[key]}</div>
        </Link>
      </div>
    ))}
  </div>
);
