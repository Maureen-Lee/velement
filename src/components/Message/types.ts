import { offset } from '@popperjs/core';
import type{ VNode } from 'vue'
type optionType = 'success' | 'info' | 'warning' | 'error'
 export interface MessageProps {
    message?: string | VNode;
    type?: optionType;
    duration?: number;
    center?: boolean;
    offset?:20;
    id: String;
    onDistory:()=>void;
    showClose?: boolean;
    onClose?: ()=>void;
    dangerouslyUseHTMLString?: boolean;
    IconClass?: string;
    transitionName?: string;
}
export type  CreateMessageprops = Omit<MessageProps,'onDistroy'>

export interface MessageContext{
    id: string;//辨别不同的组件实例
    vnode: VNode;
    distory: ()=>void;
  }

  export type CreateMessageProps = Omit<MessageProps, 'onDestory' | 'id' | 'zIndex'>