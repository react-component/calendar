import React from 'react';

export default function OkButton({ prefixCls, locale, okDisabled, onOk }) {
  let className = `${prefixCls}-ok-btn`;
  if (okDisabled) {
    className += ` ${prefixCls}-ok-btn-disabled`;
  }
  return (<a
    className={className}
    role="button"
    onClick={okDisabled ? null : onOk}
  >
    {locale.ok}
  </a>);
}
