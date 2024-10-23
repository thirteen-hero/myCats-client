// 下拉刷新
export const downRefresh = (element: HTMLDivElement, callback: Function) => {
  let startY: number; // 存储按下时候的纵坐标
  let distance: number; // 本次下拉的距离
  const originalTop = element.offsetTop; // 最初此元素距离顶部的距离
  element.addEventListener('touchstart', (event: TouchEvent) => {
    const touchMove = throttle(_touchMove, 60);
    // 只有此元素处于原始位置时才可以下拉，若处于回弹过程中则不可下拉了，且此元素向上卷曲的高度为0
    if (element.offsetTop === originalTop && element.scrollTop === 0) {
      startY = event.touches[0].pageY; // 记录当前点击的纵坐标
      element.addEventListener('touchmove', touchMove);
      element.addEventListener('touchend', touchEnd);
    }

     // 下拉
    function _touchMove(event: TouchEvent) {
      const pageY = event.touches[0].pageY; // 获取最新的纵坐标
      if (pageY > startY) {
        distance = pageY - startY;
        element.style.top = `${originalTop + distance}px`;
      } else {
        element.removeEventListener('touchmove', touchMove);
        element.removeEventListener('touchend', touchEnd);
      }
    }

    // 回弹
    function touchEnd() {
      element.removeEventListener('touchmove', touchMove);
      element.removeEventListener('touchend', touchEnd);
      const timer = setInterval(() => {
        if (distance > 30) {
          console.log(111);
          // callback();
        }
        if (distance < 1) {
          element.style.top = `${originalTop}px`;
          clearInterval(timer);
        }
        element.style.top = `${originalTop+(--distance)}px`;
      }, 13);
    }
  })
}

// 节流
function throttle(fn: Function, delay: number) {
  let prev = Date.now();
  return function() {
    // @ts-ignore
    const context = this;
    const args = arguments;
    const now = Date.now();
    if (now - prev >= delay) {
      fn.apply(context, args);
      prev = now;
    }
  }
}