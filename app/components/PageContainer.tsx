import cx from 'classnames';
import React, {HTMLProps} from 'react';

type PageContainerProps = HTMLProps<HTMLDivElement> & {};

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className,
  ...rest
}) => {
  const containerCx = cx('bg-browns-tan-light p-7 lg:p-12', className);
  return (
    <div className={containerCx} {...rest}>
      {children}
      <div className="p-"></div>
    </div>
  );
};

export default PageContainer;
