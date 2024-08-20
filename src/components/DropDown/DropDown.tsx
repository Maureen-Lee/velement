import { defineComponent,computed, Fragment } from 'vue'
import type { PropType } from 'vue'
import type { Placement, Options } from "@popperjs/core";
import type { MenuOptions  } from './types';
import Tooltip from '../Tooltip/Tooltip.vue'


export const Popover = defineComponent({
         name: 'VkDropdown',
         props:{
           placement:{
                type: String as PropType<Placement>,
                default: 'bottom'
            },
          trigger:{
            type: String as PropType<'hover' | 'click'>,
            default: 'hover'
          },
          menuOptions:{
            type: Array as PropType<MenuOptions[]>,
            required: true
          },
          transition:{
            type: String,
            default: 'fade'
          },
          openDelay:{
            type: Number,
            default: 0
          },
          closeDelay:{
            type: Number,
            default: 0
          },
        },
         setup(props,{ slots }){
            const options = computed(()=>{
                return (
                    props.menuOptions.map(
                        item =>{
                            return (
                       <Fragment key={item.key}>
                         { item.divided ? <li role="separator" class="divided-placeholder"/> : ''}
                         <li
                           class="vk-dropdown__menu-item"
                           id={`dropdown-item-${item.key}`}
                         >
                           {item.label}
                         </li>
                       </Fragment>
                            )
                        }
                    )
                )
            })
            return ()=>(
            <div
                class='vk-dropdown'
                >
                <Tooltip
                 trigger={props.trigger}
                 placement={props.placement}
                 transition={props.transition}
                 openDelay={props.openDelay}
                 closeDelay={props.closeDelay}
                >
                  {{
                    default: ()=> slots.default && slots.default(),
                    content: ()=> (
                        <ul  class="vk-dropdown__menu">
                            {options.value}
                        </ul>
                    )
                  }}
                </Tooltip>
                </div>
            )
                }
})