import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import qs from 'query-string';
import { Card } from 'antd';

import NavHeader from '@/components/NavHeader';
import { Product } from '@/store/reducers/home';

import styles from './detail.module.less';

const Detail = () => {
  const location = useLocation();
  const { id } = qs.parse(location.search);
  
  useEffect(() => {
    // if (!product) {

    // }
  }, []);

  return (
    <>
      <NavHeader>商品详情</NavHeader>
      {/* <Card
        hoverable
        style={{width: '100%'}}
        cover={<img src={product?.poster} />}
      >
        <Card.Meta
          title={product?.title}
          description={
            <p>{`价格¥${product?.price}元`}</p>
          }
        />
      </Card> */}
    </>
  )
}

export default Detail;