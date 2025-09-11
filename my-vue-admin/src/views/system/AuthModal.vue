<template>
    <el-dialog :model-value="props.visible" title="权限设置" width="800" @open="handleOpen" @close="handleClose">
        <el-card class="mt">
            <template #header>页面设置</template>
            <el-tree style="max-width: 600px" ref="treeRef" :data="treeData" show-checkbox node-key="url" />
        </el-card>

        <el-card class="mt">
            <template #header>
                按钮权限
            </template>
            <el-checkbox-group v-model="checkList">
                <el-checkbox label="全部" value="all" />
                <el-checkbox label="添加" value="add" />
                <el-checkbox label="编辑" value="edit" />
                <el-checkbox label="删除" value="delete" />
            </el-checkbox-group>
            <div class="fr" style="height: 50px;">
                <el-button @close="$emit('close')">取消</el-button>
                <el-button type="primary" @click="handleConfirm">确认</el-button>
            </div>
        </el-card>
    </el-dialog>
</template>

<script setup lang="ts">

import { ref } from "vue"
import { useUserStore } from "@/store/auth"
import { translate } from "@/utils/translate"
import { setAuth } from "@/api/system"
import { ElMessage } from "element-plus"


const props = defineProps(["visible", "getUrl", "checkBtn","account"])
const treeData = ref([])
const useStore = useUserStore()
const { menu } = useStore
treeData.value = translate(menu)
const treeRef = ref()
const checkList = ref < string[] > ([])
const emit = defineEmits(["close"])
function handleOpen() {
    treeRef.value.setCheckedKeys(props.getUrl)
    checkList.value = props.checkBtn

}

function handleClose() {
    emit("close")
}

function handleConfirm(){
    setAuth(checkList.value,treeRef.value.getCheckedKeys(true),props.account).then(res=>{
        if(res.code==200){
            ElMessage.success('设置成功')
            emit("close")
        }
    })
}
</script>