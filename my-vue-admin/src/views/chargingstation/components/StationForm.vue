<template>
    <el-dialog :model-value="props.visible" :before-close="handleClose" :title="title">

        <el-form :model="form" label-width="120" :rules="rule" ref="formRef">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="站点名称:" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="站点ID:" prop="id">
                        <el-input v-model="form.id" :disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item label="所属城市:" prop="city">
                        <el-input v-model="form.city"></el-input>
                    </el-form-item>
                    <el-form-item label="快充数:" prop="fast">
                        <el-input v-model="form.fast"></el-input>
                    </el-form-item>
                    <el-form-item label="慢充数:" prop="slow">
                        <el-input v-model="form.slow"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="充电站状态:" prop="status">
                        <el-select v-model="form.status" :disabled="disabled">
                            <el-option label="全部" :value="1"></el-option>
                            <el-option label="使用中" :value="2"></el-option>
                            <el-option label="空闲中" :value="3"></el-option>
                            <el-option label="维护中" :value="4"></el-option>
                            <el-option label="待维修" :value="5"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="正在充电:" prop="now">
                        <el-input v-model="form.now" :disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item label="充电故障:" prop="fault">
                        <el-input v-model="form.fault" :disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item label="站点负责人:" prop="person">
                        <el-input v-model="form.person"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人电话:" prop="tel">
                        <el-input v-model="form.tel"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="handleClose">取消</el-button>
                <el-button type="primary" @click="handleSave" :plain="true">
                    保存
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import type { RowType } from "@/type/RowType"
import type { FormRules, FormInstance } from "element-plus"
import { ElMessage } from "element-plus"
import { useStationStore } from '@/store/station'
import { storeToRefs } from 'pinia'
import { editStation } from "@/api/chargingstation/tabledata"

const props = defineProps({
    visible: {
        type: Boolean,
        require: true
    }
})

const form = ref<RowType>({
    name: "",
    id: "",
    city: "",
    fast: "",
    slow: "",
    status: 1,
    now: "",
    fault: "",
    person: "",
    tel: ""
})

const rule = reactive<FormRules<RowType>>({
    name: [{ required: true, message: "请输入站点名称", trigger: "blur" }],
    id: [{ required: true, message: "请输入站点ID", trigger: "blur" }],
    city: [{ required: true, message: "请输入所属城市", trigger: "blur" }],
    fast: [{ required: true, message: "请输入快充数", trigger: "blur" }],
    slow: [{ required: true, message: "请输入慢充数", trigger: "blur" }],
    now: [{ required: true, message: "请输入正在充电数", trigger: "blur" }],
    fault: [{ required: true, message: "请输入充电故障数", trigger: "blur" }],
    person: [{ required: true, message: "请输入站点负责人", trigger: "blur" }],
    tel: [{ required: true, message: "请输入负责人电话", trigger: "blur" }]

})

const formRef = ref<FormInstance>()
const stationStore = useStationStore()
const { rowData } = storeToRefs(stationStore)
const { resetRowData } = stationStore
const title = ref<string>("")
const disabled = ref<boolean>(false)
watch(() => props.visible, () => { //监听visible的变化 取store 赋值到表单
    form.value = rowData.value
    if (form.value.name) {
        title.value = "编辑充电站"
        disabled.value = true
    } else {
        title.value = "新增充电站"
        disabled.value = false
    }
})


const emit = defineEmits(["close"])
const handleClose = () => {
    resetRowData()
    formRef.value?.clearValidate()
    emit("close")
}

const handleSave = () => {
    formRef.value?.validate(async (valid: boolean) => {
        if (valid) {
            const res = await editStation(form.value)
            ElMessage({
                message: res.data,
                type: 'success',
            })
            resetRowData()
            emit("close")
            console.log(res)
        }
    })
}
</script>