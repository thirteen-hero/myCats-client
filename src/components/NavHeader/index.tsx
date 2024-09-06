import React, { PropsWithChildren } from 'react';
import { useNavigate  } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';

import styles from './index.module.less';

type Props = PropsWithChildren<{}>

const NavHeader = (props: Props) => {
  const navigate = useNavigate();

  return (
    <nav className={styles.navHeader}>
      <LeftOutlined onClick={() => navigate(-1)} />
      {props.children}
      <div className={styles.empty} />
    </nav>
  )
}

export default NavHeader;