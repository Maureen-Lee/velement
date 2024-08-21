import { h, VNode,render } from 'vue'
import type { CreateMessageprops} from './types'
import Message from './Message.vue'
export const createMessage = (props:CreateMessageprops)=>{
    const container = document.createElement('div')

    const distory = ()=>{
        render(null,container)
    }
    const newProps = {
        ...props,
        onDistroy:distory
    }
    const vnode = h(Message,newProps)
    render(vnode,container)
    //! 在ts中 使用非空断言操作符 告诉变量不会为null
    document.body.appendChild(container.firstElementChild!)   
}