// components/CustomImage.js
import Image from 'next/image';

const customLoader = ({ src }:{src:string}) => {
  return src;
};

const CustomImage = (props:any) => {
  return <Image {...props} loader={customLoader} unoptimized />;
};

export default CustomImage;
