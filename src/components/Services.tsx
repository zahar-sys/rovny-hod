'use client';
import {useState} from 'react';
import {catalog,mergeItem,money,type Settings} from '@/lib/domain';
import {useDraft} from './draft';
import {SiteHeader,ArrowLeft,ArrowRight,Plus,Check} from './ui';
export default function Services({settings:s}:{settings:Settings}){
 const {draft,setDraft,ready,storageError}=useDraft();const [description,setDescription]=useState('');const [message,setMessage]=useState('');
 const count=draft.items.reduce((n,i)=>n+i.quantity,0);
 function add(category:string,variant:string){
  if(category==='other'&&description.trim().length<3){setMessage('Опишите, какая работа нужна');return;}
  if(draft.items.length>=30){setMessage('В корзине уже 30 работ. Проверьте состав корзины.');return;}
  setDraft(d=>({...d,items:mergeItem(d.items,{category,variant,quantity:1,complex:false,description:category==='other'?description.trim():''})}));
  setMessage('Услуга добавлена в корзину');
 }
 return <><SiteHeader name={s.company.name} cartCount={ready?count:0}/><main className="container services-page">
 <a className="back-link" href="/"><ArrowLeft size={16}/> На главную</a>
 <div className="catalog-intro"><div className="services-intro"><div className="section-label">{s.company.city} · {s.company.name}</div><h1>Услуги и цены</h1><p>Добавьте нужные работы в корзину. Стоимость ремонта и время визита подтвердит мастер.</p></div><a className="button" href="/cart/">Корзина{ready&&count>0?` · ${count}`:''} <ArrowRight size={18}/></a></div>
 <nav className="services-index" aria-label="Разделы услуг">{catalog.map(c=><a key={c.id} href={'#'+c.id}>{c.name}</a>)}</nav>
 <div className="catalog-feedback" role="status">{storageError||message}</div>
 <div className="service-card-grid">{catalog.map((c,index)=><section className="service-card" id={c.id} key={c.id}>
 <div className="service-card-image"><img src={'/images/services/'+c.id+'.webp'} alt={'Механик выполняет работу: '+c.name.toLowerCase()} width={840} height={840} loading={index<2?'eager':'lazy'} decoding="async"/></div><div className="service-card-body"><h2>{c.name}</h2><p className="service-card-description">{c.description}</p>
 <div className="service-detail-prices">{c.id==='other'&&<label className="field">Что случилось?<textarea value={description} onChange={e=>setDescription(e.target.value)} maxLength={1000} placeholder="Например, машина глохнет на холодном двигателе"/><small>Фото добавите при оформлении.</small></label>}
 <div className="catalog-variants">{c.variants.map(v=>{const quantity=draft.items.filter(i=>i.category===c.id&&i.variant===v.id).reduce((n,i)=>n+i.quantity,0);return <div className="catalog-variant" key={v.id}><div><h3>{v.name}</h3><p>{c.id==='other'?'По оценке мастера':money(s.pricing.prices[c.id+':'+v.id])}</p>{ready&&quantity>0&&<small className="in-cart"><Check size={13}/> В корзине: {quantity}</small>}</div><button type="button" className="button add-to-cart" onClick={()=>add(c.id,v.id)} disabled={!ready||quantity>=20||(c.id==='other'&&description.trim().length<3)} aria-label={'Добавить в корзину: '+c.name+' — '+v.name}><Plus size={18}/><span>В корзину</span></button></div>})}</div></div>
 </div></section>)}</div>
 <aside className="services-terms"><h2>Стоимость работ</h2><p>Запчасти и расходники согласуем отдельно. Минимальная стоимость работ — {money(s.pricing.minimum)}. Надбавку за сложность можно указать в корзине; мастер подтвердит её до ремонта.</p><a className="button" href="/cart/">Перейти в корзину <ArrowRight size={18}/></a></aside>
 </main></>;
}
