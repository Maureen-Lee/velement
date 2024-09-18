
export interface InputProps {
    type?: string;
    modelValue?: string;
    clearable?: boolean;
    showPassword?: boolean;
    placeholder?: string;
    disabled?: boolean;
    readonly?: boolean;
    autocomplete?: string;
    autofocus?: boolean;
    form?: string;

}

export interface InputEmits {
    (e: 'update:modelValue',value:string): void;
}