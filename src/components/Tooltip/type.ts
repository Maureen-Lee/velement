
type place = "top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end"
export interface TooltipProps {
    effect?: "dark" | "light";
    content?: string;
    trigger?: 'hover' | 'click';
    placement?: place;
}

export interface TooltipEmits{
    (e:'visible-change',value: boolean): void,
}