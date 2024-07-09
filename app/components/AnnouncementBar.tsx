import cx from 'classnames';
import React from 'react';
import type {HTMLProps} from 'react';

type AnnouncementBarProps = HTMLProps<HTMLDivElement> & {
  color?: string;
};

const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  color = 'green',
  children,
}) => {
  const baseCx = cx('AnnouncementBar text-white h-10 flex items-center justify-center font-volkhov tracking-[0.32px]', {
    'bg-greens-green-primary': color === 'green',
  });
  return <div className={baseCx}>{children}</div>;
};

export default AnnouncementBar;
