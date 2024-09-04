import React, { Component } from 'react';

import styles from './index.module.less';

interface IState {
  error: Error | null;
  info: any;
}

class ErrorBoundary extends Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      info: null,
    }
  }

  public static getDerivedStateFromError(error: Error, info: any) {
    return {
      error,
      info
    }
  }

  render() {
    return this.state.error ? (
      <div className={styles.emptyContainer}>
        <div className={styles.text}>页面出错了，请稍后再试~</div>
      </div>
    ) : this.props.children
  }
}

export default ErrorBoundary;