import { onMounted , onBeforeUnmount,isRef,unref,watch} from 'vue'
import type{ Ref } from 'vue'
export default function useEventKeyDown(
    target: Ref<EventTarget | null> | EventTarget,
    eventName: string,
    handler:(e: Event)=>void
    ){
    if(isRef(target)){
        //如果是响应式对象
      watch(target,(value,oldValue) =>{
        oldValue?.removeEventListener(eventName,handler)
        value?.addEventListener(eventName,handler)
      })

    }else{
        //不是响应式对象
        onMounted(()=>{
            target.addEventListener(eventName,handler)
         })
      
    }
     
     onBeforeUnmount(()=>{
        unref(target)?.removeEventListener(eventName,handler)
     })




}