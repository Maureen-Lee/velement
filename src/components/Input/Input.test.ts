import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Input from './Input.vue'

describe('Input', () => {

    it('基本展示',()=>{

        // 针对动态 class,查看 classes是否正确
        // 针对 v-if 是否渲染正确的标签以及内容
        // 针对 slots,是否渲染对应的 slots内容
        const wrapper = mount(Input,{
            props: {
                type: 'input'
            },
            slots: {
                prepend :"prepend",
                append :"append"
            }
        })
      console.log(wrapper.html())
    })
    it.only('支持点击清空字符串',async()=>{
        const wrapper = mount(Input,{
            props: {
                modelValue: '123',
                clearable: true,
                type: 'text'
            },
            global:{
                stubs: ['Icon']
            }
        })
        //不出现对应的 Icon 区域
        expect(wrapper.find('.ve-input__clear').exists()).toBeFalsy()
        const input = wrapper.get('input')
        await input.trigger('focus')
        //出现 Icon区域
        expect(wrapper.find('.ve-input__clear').exists()).toBeTruthy()
        //点击值变为空并且消失
        await wrapper.get('.ve-input__clear').trigger('click')
        expect(input.element.value).toBe('')
    })
})