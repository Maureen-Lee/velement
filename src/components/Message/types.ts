import { offset } from '@popperjs/core';
import type{ VNode } from 'vue'
 export interface MessageProps {
    message?: string | VNode;
    type?: 'primary' | 'info' | 'success' | 'warning' | 'danger' ;
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
    zIndex: number;
}
export type  CreateMessageprops = Omit<MessageProps,'onDistroy'>

export interface MessageContext{
    id: string;//辨别不同的组件实例
    vnode: VNode;
    distory: ()=>void;
  }

  export type CreateMessageProps = Omit<MessageProps, 'onDestory' | 'id' | 'zIndex'>