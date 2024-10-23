import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Card, message, Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import qs from 'query-string';

import NavHeader from '@/components/NavHeader';
import { Product } from '@/store/reducers/home';
import { getDetail } from '@/api/home';
import { useCommonDispatch } from '@/store/hooks';

import styles from './detail.module.less';

const Detail = () => {
  const location = useLocation();
  const dispatch = useCommonDispatch();

  const [detail, setDetail] = useState<Product | null>(null);
  useEffect(() => {
    getProductDetail();
  }, []);

  // 根据商品id获取商品详情
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

  // 新增商品到购物车
  const addCartItem = (detail: Product) => {
    dispatch({
      type: 'cart/addCartItem',
      payload: detail,
    })
  }

  return (
    <>
      <NavHeader>商品详情</NavHeader>
      {detail && (
        <Card
          hoverable
          style={{width: '100%'}}
          cover={<img src={detail?.poster} />}
        >
          <Card.Meta
            title={detail?.title}
            description={
              <>
                <p>{`价格¥${detail?.price}元`}</p>
                <p>
                  <Button 
                    className={styles.addCart} 
                    icon={<ShoppingCartOutlined />}
                    onClick={() => addCartItem(detail)}
                  >
                      加入购物车
                  </Button>
                </p>
                </>
            }
          />
        </Card>
      )}
    </>
  )
}

export default Detail;