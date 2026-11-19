import Services from '@/components/Services';
import {settings} from '@/lib/settings';
import {defaults} from '@/lib/domain';
export const metadata={title:'Услуги и цены'};
export default async function Page(){return <Services settings={await settings().catch(()=>defaults)}/>;}
