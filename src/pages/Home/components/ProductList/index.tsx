import React, { useEffect } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { Card, Button, Alert } from 'antd';

import { getProductData, HomeState, Product } from '@/store/reducers/home';
import { useCommonDispatch, useCommonSelector } from '@/store/hooks';
import styles from './index.module.less';

const ProductList = () => {
  const dispatch = useCommonDispatch();
  const { product, currentCategory }: HomeState = useCommonSelector(store => store.home);
  const { list, offset, limit, hasMore, loading } = product;
  useEffect(() => {
    getProductList(offset);
  }, []);

  useEffect(() => {
    const loader = document.getElementById('loader');
    if (!loader) return;
    const observer = new IntersectionObserver((entries) => {
      const { isIntersecting } = entries[0];
      if (isIntersecting && hasMore) {
        getProductList(offset + 1);
      }
    })
    observer.observe(loader)
    return () => {
      observer.disconnect();
    }
  }, [hasMore, offset]);

  // 获取商品列表+触底加载
  const getProductList = (offset: number) => {
    dispatch(getProductData({
      category: currentCategory,
      offset, 
      limit,
    }));
  }

  return (
    <section className={styles.productList}>
      <div className={styles.header}>
        <MenuOutlined className={styles.menu} />
        全部
      </div>
      {list.map((item: Product) => (
        <Card 
          key={item.id}
          hoverable={true}
          style={{ width: '100%' }}
          cover={<img src={item.poster} />}
        >
          <Card.Meta 
            title={item.title} 
            description={`价格: ¥${item.price}`}
          />
        </Card>
      ))}
      <div id='loader' />
      {hasMore ? (
        <Button 
          loading={loading}
          type='primary' 
          block
        >
          {loading ? '' : '加载更多'}
        </Button>
      ) : !!list.length ? (
        <Alert 
          style={{ textAlign: 'center' }} 
          message='没有更多商品了' 
          type='warning' 
        />
      ) : null}
    </section>
  )
}

export default ProductList;