export interface SwitchProps {
      modelValue?: boolean | string;
      disabled?: boolean;
      width?: number;
      activeColor?: string;
      inactiveColor?: string;
      activeText?: string;
      inactiveText?: string;
      id?: string;
      name?: string;

}

export interface SwitchEmits {
    (e: 'change',value:boolean): void;
    (e: 'update:modelValue',value:boolean): void;
}