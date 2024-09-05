import { ref ,computed} from 'vue'

const zIndex = ref(0)
const useZIndex = (initialValue: number = 2000) =>{
    const initialZIndex = ref(initialValue)//调整一开始的值
    const currentZIndex = computed(()=> {
      return zIndex.value + initialZIndex.value
    })
    console.log('currentZIndex:',currentZIndex.value)
    const nextZIndex = ()=>{
        zIndex.value++
        return currentZIndex.value
    }
return {currentZIndex,nextZIndex,initialZIndex}


}
export default useZIndex