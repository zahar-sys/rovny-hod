import Cart from '@/components/Cart';import {defaults} from '@/lib/domain';
export const metadata={title:'Корзина',robots:{index:false,follow:false}};
export default function Page(){return <Cart settings={defaults}/>;}
