<template>
    <div style="max-width: 500px" class="step">
        <el-steps :active="active" finish-status="success" align-center>
            <el-step v-for="item in title" :key="item.title" :title="item.title" />
        </el-steps>
        <div v-if="active === 0">
            <slot name="step-1"></slot>
        </div>
        <div v-if="active === 1">
            <slot name="step-2"></slot>
        </div>
        <div v-if="active === 2">
            <slot name="step-3"></slot>
        </div>

    </div>
    <div style="margin-top: 12px">
        <el-button @click="last" v-if="active > 0">上一步</el-button>
        <el-button @click="next" type="primary">{{ active == title.length - 1 ? "提交" : "下一步" }}</el-button>
    </div>

</template>

<script setup lang="ts">
import { ref } from "vue"
const props = defineProps(["title", "formRef1","formRef2","formRef3"])
const emit=defineEmits(["handleSubmit"])
console.log(props.title)
const active = ref(0)

const last = () => {
    active.value--
}

const next = () => {
    const forms = [props.formRef1,props.formRef2,props.formRef3]
    const currentForm = forms[active.value]
    currentForm.validate((valid: boolean) => {
        if (valid) {
            if (active.value<props.title.length-1) {
                console.log("验证成功")
                active.value++
            }else{
                emit("handleSubmit")
            }
        }
    })
}



</script>