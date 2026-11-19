import Cart from '@/components/Cart';import {settings} from '@/lib/settings';import {defaults} from '@/lib/domain';
export const metadata={title:'Корзина',robots:{index:false,follow:false}};
export default async function Page(){return <Cart settings={await settings().catch(()=>defaults)}/>;}
