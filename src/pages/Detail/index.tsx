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
    const cover: HTMLDivElement | null = document.querySelector('img');
    const cart: HTMLAreaElement | null = document.querySelector('a .anticon.anticon-shopping-cart');
    if (!cover || !cart) return;
    const cloneCover: HTMLDivElement = cover.cloneNode(true) as HTMLDivElement;
    const coverLeft = cover.getBoundingClientRect().left; // 元素左边框距离屏幕左边距离
    const coverTop = cover.getBoundingClientRect().top; // 元素上边框距离屏幕顶部距离
    const coverWidth = cover.offsetWidth;
    const coverHeight = cover.offsetHeight;
    const cartRight = cart.getBoundingClientRect().right; // 元素右边框距离屏幕左边距离
    const cartBottom = cart.getBoundingClientRect().bottom; // 元素底边框距离屏幕顶部距离
    const cartWidth = cart.offsetWidth;
    const cartHeight = cart.offsetHeight;
    cloneCover.style.cssText = (
      `
        z-index: 1000;
        opacity: 0.8;
        position: fixed;
        width: ${coverWidth}px;
        height: ${coverHeight}px;
        top: ${coverTop}px;
        left: ${coverLeft}px;
        transition: all 2s ease-in-out;
      `
    );
    document.body.appendChild(cloneCover);
    setTimeout(() => {
      cloneCover.style.left = `${cartRight - cartWidth / 2}px`;
      cloneCover.style.top = `${cartBottom - cartHeight / 2}px`;
      cloneCover.style.width = '0px';
      cloneCover.style.height = '0px';
      cloneCover.style.opacity = '0.5';
    }, 0);
    setTimeout(() => {
      cloneCover.parentNode?.removeChild(cloneCover);
    }, 2000);
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