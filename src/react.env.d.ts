
declare module "*.module.less" {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}