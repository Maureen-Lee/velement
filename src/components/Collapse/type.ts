import type { InjectionKey,Ref } from 'vue'

export interface CollapseItemProp {
    title?:string;
    name?: string | number;
}

export interface CollapseProp {
    modelValue: Array<string | number>,
    accordion?: boolean
}

export interface CollapseContext {
    activeNames: Ref<Array<string | number>>;
    handleClick: (type: number|string) => void
}



export const collapseKey: InjectionKey<CollapseContext> = Symbol()