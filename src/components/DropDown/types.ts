import type {VNode} from 'vue'
import type {TooltipProps} from '../Tooltip/type'

export interface DropdownProps extends TooltipProps{
     menuOptions: [];
     hideAfterClick?:boolean;//点击下拉内容选项后是否关闭
}

export interface MenuOptions {
    label: string| VNode;
    key: string | number;
    disabled?: boolean;
    divided?: boolean;
}

export interface DropdownEmits {
    (e:'visible-change',value: boolean):void;
    (e:'select',value: MenuOptions):void;
}

export interface DropdownInstance {
    show:()=> void;
    hide:()=> void;
  }