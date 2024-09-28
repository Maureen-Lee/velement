
import type { Placement ,Options} from '@popperjs/core'
export interface TooltipProps {
    effect?: "dark" | "light";
    content?: string;
    trigger?: 'hover' | 'click';
    placement?: Placement;
    manual?: boolean;
    popperOptions?:Options;
    transition?: string;
    openDelay?: number;
    closeDelay?: number;
}

export interface TooltipEmits{
    (e:'visible-change',value: boolean): void,
    (e:'click-outside',value:boolean): void
}

export interface TooltipInstance {
    show: ()=>void;
    hide: ()=>void;
}