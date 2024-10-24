import React, { useEffect, useRef, forwardRef, useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { Card, Button, Alert, Skeleton } from 'antd';
import { useNavigate } from 'react-router-dom';

import { getProductData, HomeState, Product } from '@/store/reducers/home';
import { useCommonDispatch, useCommonSelector } from '@/store/hooks';

import styles from './index.module.less';

const ProductList = ({ containerRef }: any, ref: any) => {
  const navigate = useNavigate();
  const loaderRef = useRef<HTMLDivElement>(null);
  const dispatch = useCommonDispatch();
  // 强制刷新
  const [_, forceUpdate] = useState(0);
  const { product, currentCategory }: HomeState = useCommonSelector(store => store.home);
  const { list, offset, limit, hasMore, loading } = product;
  let start = 0; // 开始真正渲染的起始索引 从此开始向下渲染两条数据 剩下的使用空div占位
  let rootFontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize)/100;
  // homeContainer区域已经存在
  if (containerRef.current) {
    // 父容器向上卷曲的高度
    const parentScrollTop = containerRef.current.scrollTop/100;
    start = Math.floor((parentScrollTop - 8.55 * rootFontSize)/(9.05 * rootFontSize));
  } 

  useEffect(() => {
    if (list.length === 0) {
      getProductList(offset, false);
    }
    ref.current = () => forceUpdate(x => x + 1);
  }, []);

  useEffect(() => {
    if (!loaderRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      const { isIntersecting } = entries[0];
      if (isIntersecting && hasMore) {
        getProductList(offset + 1, true);
      }
    })
    observer.observe(loaderRef.current)
    return () => {
      observer.disconnect();
    }
  }, [hasMore, offset]);

  // 获取商品列表
  const getProductList = (offset: number, isRefresh: boolean) => {
    dispatch(getProductData({
      category: currentCategory,
      offset, 
      limit,
      isRefresh,
    }));
  }

  return (
    <section className={styles.productList}>
      <div className={styles.header}>
        <MenuOutlined className={styles.menu} />
        全部
      </div>
      <Skeleton 
        loading={product.loading && list.length ===0} 
        active 
        paragraph={{ rows: 8}}
      >
        {list.map((item: Product, index: number) => (
          index >= start-1 && index < start + 3 ? (
            <Card 
              key={index}
              hoverable={true}
              style={{ width: '100%' }}
              cover={<img src={item.poster} />}
              onClick={() => navigate(`/detail/?id=${item.id}`)}
            >
              <Card.Meta 
                title={item.title} 
                description={`价格: ¥${item.price}`}
              />
            </Card>
          ) : <div key={index} style={{height: `${9.05 * rootFontSize}rem`}} />
        ))}
      </Skeleton>
      <div ref={loaderRef} />
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

export default forwardRef(ProductList);