<template>
  <div class="about">
  <Form :model="model" :rules="rules" ref="formRef">
    <FormItem label="name" prop="name">
      <Input v-model="model.name" placeholder="name" />
    </FormItem>
    <FormItem label="email" prop="email">
      <Input v-model="model.email" placeholder="email" />
    </FormItem>
    <FormItem label="password" prop="password">
      <template #label="{label}">
        <button>{{ label }}</button>
      </template>
      <Input v-model="model.password" placeholder="password" />
    </FormItem>
    <FormItem label="test value" prop="test">
      <template #default="{validate}">
        <input v-model="model.test" />
        <button @click="submit">submit</button>
        <button @click="reset">reset</button>
      </template>

    </FormItem>
  </Form>

  </div>
</template>
<script setup lang="ts">
import { reactive ,watch,ref} from "vue";
import Form from "../components/Form/Form.vue";
import FormItem from "../components/Form/FormItem.vue";
import Input from "../components/Input/Input.vue";
const formRef = ref()
const model = reactive({
  name: "",
  email: "",
  password: "",
  test: ""
});
watch(()=>model.name,()=>console.log(model.name) )
const rules = {
  name: [
    {
      required: true,
      message: "name is required"
    }
  ],
  email: [
    {
      type: "email",
      required: true,
      trigger: "blur"
    },
    {
      type: "string",
      message: "email is not valid",
      trigger: "input"
    }
  ],
  password: [
    {
      required: true,
      message: "password is required",
      trigger: "blur"
    }
  ],
  test: [
    {
      required: true,
      message: "test is required",
      trigger: "blur"
    }
  ]
}

const submit = async ()=>{
  try{
    await formRef.value.validate()
    console.log("Passed!")
  }catch(e){
    console.log("submit出错",e)
  }
  }
 const reset = ()=>{
    formRef.value.resetFields()
  }
</script>

