import type { InjectionKey } from 'vue'   
import type { RuleItem, ValidateError ,ValidateFieldsError  } from 'async-validator'
export interface FormProps {
    model: Record<string, any>;
    rules: Record<string, any>; 
}

export interface FormContext extends FormProps {
    addField: (field: FormItemContext) => void;
    removeField: (field: FormItemContext) => void;
}
export interface FormItemProps {
    prop?: string,
    label: string,
}

export interface FormItemRule extends RuleItem {
    trigger?:string ;
}
export type FormRules = Record<string, FormItemRule[]>


export interface FormItemContext {
    prop: string;
    validate:(tigger?: string)=> any;
    resetFields():void;
    clearValidate():void;
}

export interface FormValidateFailure{
    errors: ValidateError[] | null;
    fields: ValidateFieldsError;
}

export interface FormInstance {
    validate: () => Promise<any>;
}
export const formContextKey: InjectionKey<FormContext> = Symbol('formContextKey')
export const formItemContextKey: InjectionKey<FormItemContext> = Symbol('formItemContextKey')