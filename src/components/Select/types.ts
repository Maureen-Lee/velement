export interface SelectOption {
    label: string;
    value: string;
    disabled?: boolean;
}

export interface SelectProps {
    // v-model
    modelValue: string;
    //选项 
    options: SelectOption[];
    //一些基本属性
    placeholder?: string;
    disabled?: boolean;
    clearable?: boolean;
}

export interface SelectStates {
    inputValue: string;
    selectedOption: null | SelectOption;
    mouseHover: boolean;
    loading: boolean;
    highlightIndex: number
  }

export interface SelectEmits{
    (e:'update:modelValue',value: string): void,
    (e: 'visible-change',value: boolean): void,
    (e:'change',value: string): void,
    (e:'blur',value: string): void,
    (e:'focus',value: string): void,
}