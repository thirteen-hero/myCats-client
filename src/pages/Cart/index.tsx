import React from "react";
import { Table, InputNumber } from 'antd';

import { 
  useCommonDispatch, 
  useCommonSelector,
} from "@/store/hooks";
import { CartItem  } from '@/store/reducers/cart';
import { Product } from "@/store/reducers/home";
import NavHeader from "@/components/NavHeader";

import styles from './cart.module.less';

const Cart = () => {
  const dispatch = useCommonDispatch();
  const columns = [
    {
      title: '商品',
      dataIndex: 'product',
      render: (item: Product, row: CartItem) => {
        return (
          <>
            <p>{item.title}</p>
            <p>单价：¥{item.price}</p>
          </>
        )
      }
    }, 
    {
      title: '数量',
      dataIndex: 'count',
      render: (item: number, row: CartItem) => {
        return (
          <InputNumber
            size="small"
            min={1}
            value={item}
            onChange={(val) => dispatch({
              type: 'cart/changeCartItemCount',
              payload: {
                id: row.product.id,
                count: val,
              }
            })}
          />
        )
      }
    }
  ]
  const cartList: CartItem[] = useCommonSelector(state => state.cart);
  return (
    <>
      <NavHeader>购物车</NavHeader>
      <Table
        columns={columns}
        dataSource={cartList}
        pagination={false}
        rowKey="id"
      />
    </>
  )
}

export default Cart;