import { defineComponent,h } from "vue";
const RenderV = defineComponent({
      props: {
         vNode:{
            type:[String,Object],
            required: true
         }
      },
      setup(props) {
        return ()=> props.vNode
      }
    

})

export default RenderV