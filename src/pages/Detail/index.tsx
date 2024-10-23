import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import qs from 'query-string';
import { Card, message } from 'antd';

import NavHeader from '@/components/NavHeader';
import { Product } from '@/store/reducers/home';
import { getDetail } from '@/api/home';

import styles from './detail.module.less';

const Detail = () => {
  const location = useLocation();

  const [detail, setDetail] = useState<Product | null>(null);
  useEffect(() => {
    getProductDetail();
  }, []);

  const getProductDetail = async() => {
    try {
      const { id } = qs.parse(location.search);
      if (id && typeof id === 'string') {
        const res = await getDetail(id);
        setDetail(res.data);
      }
    } catch (error) {
      console.log(error);
      message.open({ content: '网络异常' });
    }
  }

  return (
    <>
      <NavHeader>商品详情</NavHeader>
      <Card
        hoverable
        style={{width: '100%'}}
        cover={<img src={detail?.poster} />}
      >
        <Card.Meta
          title={detail?.title}
          description={
            <p>{`价格¥${detail?.price}元`}</p>
          }
        />
      </Card>
    </>
  )
}

export default Detail;