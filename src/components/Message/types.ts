import { offset } from '@popperjs/core';
import type{ VNode } from 'vue'
type optionType = 'success' | 'info' | 'warning' | 'error'
 export interface MessageProps {
    message?: string | VNode;
    type?: optionType;
    duration?: number;
    center?: boolean;
    offset?:20;
    onDistroy:()=>void;
    showClose?: boolean;
    onClose?: Function;
    dangerouslyUseHTMLString?: boolean;
    IconClass?: string;
}
export type  CreateMessageprops = Omit<MessageProps,'onDistroy'>