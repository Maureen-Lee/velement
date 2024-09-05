import { h,render ,shallowReactive,nextTick,computed} from "vue"
import MessageConStructor from "./Message.vue"
import { MessageProps ,MessageContext} from "./types"
import useZIndex from "../../hooks/useZIndex"
let instances:MessageContext[] = shallowReactive([])
let seed = 1;
export function createMessage(props:MessageProps){
    const {nextZIndex} = useZIndex()
    const container = document.createElement('div')
    const id =  `message_${seed++}`
    const distory = ()=> {
        //删除数组中的实例
        const idx = instances.findIndex(instance => instance.id === id)
        if(idx == -1) return 
        instances.splice(idx,1)    
        render(null,container)
        // if(container.parentNode) {
        //     container.parentNode.removeChild(container); // 从 DOM 中移除 container
        // }
    }
    const newProps = {
        ...props,
        type: props.type || 'primary',
        id,
        onDistory: distory,
        zIndex: nextZIndex()
    }
    const vnode = h(MessageConStructor,newProps)
    render(vnode,container) //将虚拟DOM 挂载到 容器中
    
    
    const manualDistory =  () => {
        let instance = instances.find(instance => instance.id == id)
        if(instance){
            instance.vnode.component!.exposed!.visible.value = false;
        }
        
    }
    const instance = {
        id,
        vnode,
        props: newProps,
        distory:manualDistory
    }
    instances.push(instance)
    document.body.appendChild(container)
    return instance
}

export function getLastInstance(){
        return instances[instances.length - 1];
}
export function getLastBottomOffset(id: String){
    const idx = instances.findIndex(instance=>instance.id == id)
    if(idx <= 0 ) return 0
    else{
        const prev = instances[idx-1]
        return prev.vnode.component!.exposed!.bottom.value
    }
}

