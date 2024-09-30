<template>
  <div class="about">
    <h1>This is an about page</h1>
  <Form :model="model" :rules="rules">
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
  </Form>

  </div>
</template>
<script setup lang="ts">
import { reactive ,watch} from "vue";
import Form from "../components/Form/Form.vue";
import FormItem from "../components/Form/FormItem.vue";
import Input from "../components/Input/Input.vue";
const model = reactive({
  name: "",
  email: "",
  password: ""
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
      required: true,
      message: "email is required",
      trigger: "blur"
    }
  ],
  password: [
    {
      required: true,
      message: "password is required",
      trigger: "blur"
    }
  ]
}
</script>

