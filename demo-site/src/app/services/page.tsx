import Services from '@/components/Services';
import {defaults} from '@/lib/domain';
export const metadata={title:'Услуги и цены'};
export default function Page(){return <Services settings={defaults}/>;}
