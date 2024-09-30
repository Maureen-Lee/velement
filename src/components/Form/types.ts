import type { InjectionKey } from 'vue'   
import type { RuleItem, ValidateError ,ValidateFieldsError  } from 'async-validator'
export interface FormProps {
    model: Record<string, any>;
    rules: Record<string, any>; 
}

export interface FormItemProps {
    prop?: string,
    label: string,
}

export interface FormContext extends FormProps {
    valitate:()=>boolean;
    resetFields:()=>void;
    
}


export const formContextKey: InjectionKey<FormContext> = Symbol('formContextKey')