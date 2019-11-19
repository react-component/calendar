import React from 'react';
import classnames from 'classnames';

export interface OkButtonProps {
  prefixCls?: string;
  locale?: { [key: string]: any };
  okDisabled?: boolean;
  onOk?: React.MouseEventHandler<HTMLAnchorElement>;
}
const OkButton: React.FC<OkButtonProps> = ({ prefixCls, locale, okDisabled, onOk }) => {
  const className = classnames(`${prefixCls}-ok-btn`, {
    [`${prefixCls}-ok-btn-disabled`]: okDisabled,
  });

  return (
    <a className={className} role="button" onClick={okDisabled ? null : onOk}>
      {locale.ok}
    </a>
  );
};
export default OkButton;
