import React from "react";
import { Table, InputNumber, Popconfirm, Button, Row, Col, Badge } from 'antd';

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
    },
    {
      title: '操作',
      render: (item: number, row: CartItem) => {
        return (
          <Popconfirm
            title="是否要删除商品"
            onConfirm={() => dispatch({
              type: 'cart/removeCartItem',
              payload: {
                id: row.product.id,
              }
            })}
            okText="是"
            cancelText="否"
          >
            <Button size="small" type="primary">删除</Button>
          </Popconfirm>
        )
      }
    }
  ]
  const cartList: CartItem[] = useCommonSelector(state => state.cart);
  const rowSelection = {
    selectedRowKeys: cartList.filter((item: CartItem) => item.checked).map((item: CartItem) => item.id),
    onChange: (selectedRowKeys: string[]) => {
      dispatch({
        type: 'cart/changeCheckedCartItem',
        payload: {
          selectedRowKeys,
        }
      })
    }
  }
  const totalCount = cartList
    .filter((item: CartItem) => item.checked)
    .reduce((total: number, item: CartItem) => total + item.count, 0);
  const totalPrice = cartList
    .filter((item: CartItem) => item.checked)
    .reduce((total: number, item: CartItem) => total + item.count * item.product.price, 0);
  return (
    <>
      <NavHeader>购物车</NavHeader>
      <div className={styles.cart}>
        <Table
          columns={columns}
          dataSource={cartList}
          pagination={false}
          rowKey="id"
          // @ts-ignore
          rowSelection={{type: 'checkbox', ...rowSelection}}
        />
        <Row style={{padding: '5px'}}>
          <Col span={7}>
            <Button
              type="default"
              size="small"
              onClick={() => {
                dispatch({
                  type: 'cart/clearCart',
                })
              }}
            >
              清空购物车
            </Button>
          </Col>
          <Col span={9}>
            已选择了{totalCount > 0 ? <Badge count={totalCount} /> : 0}件商品
          </Col>
          <Col span={4}>
            总计{totalPrice}元
          </Col>
          <Col span={4}>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                dispatch({
                  type: 'cart/settle',
                })
              }}
            >
              结算
            </Button>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Cart;