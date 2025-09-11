<template>
  <el-card>
    <el-radio-group v-model="act" size="large" @change="handleClick">
      <el-radio-button label="全部" :value="0" />
      <el-radio-button label="严重告警" :value="1" />
      <el-radio-button label="紧急告警" :value="2" />
      <el-radio-button label="一般告警" :value="3" />
    </el-radio-group>
  </el-card>

  <el-card class="mt" v-for="item in alarmList" :key="item.equNo">
    <el-alert :title="item.address" type="warning" show-icon />
    <el-descriptions class="mt" :column="4" border>
      <el-descriptions-item>
        <template #label>
          故障描述
        </template>
        {{ item.description }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          设备地址
        </template>
        {{ item.address }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          设备号
        </template>
        {{ item.equNo }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          告警级别
        </template>
        <el-tag size="small" :type="item.level == 1 ? 'danger' : (item.level == 2 ? 'warning' : 'info')">{{
          item.level == 1 ? '严重' : (item.level == 2 ? '紧急' : '一般') }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          故障时间
        </template>
        {{ item.time }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          故障代码
        </template>
        {{ item.code }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          当前状态
        </template>
        <el-text type="danger">{{ item.status == 1 ? '待指派' : (item.status == 2 ? '处理中' : '处理异常') }}</el-text>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          操作
        </template>
        <el-button type="primary" @click="drawer = true">指派</el-button>
      </el-descriptions-item>
    </el-descriptions>

  </el-card>
  <el-drawer v-model="drawer" :with-header="false">
    <h1 class="tit">报警任务指派</h1>
    <StepForm :title="titles" :formRef1="formRef1" :formRef2="formRef2" :formRef3="formRef3" @handleSubmit="handleSubmit">
      <template #step-1>
        <el-form :rules="rule" ref="formRef1" :model="form1">
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="form1.name"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：" prop="email">
            <el-input v-model="form1.email"></el-input>
          </el-form-item>
          <el-form-item label="电话：" prop="tel">
            <el-input v-model="form1.tel"></el-input>
          </el-form-item>
          <el-form-item label="工号：" prop="jobnum">
            <el-input v-model="form1.jobnum"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #step-2>
        <el-form :model="form2" ref="formRef2" :rules="rule2">
          <el-form-item label="审批部门" prop="select1">
            <el-select placeholder="请选择审批部门" v-model="form2.select1">
              <el-option label="总裁办" :value="0"></el-option>
              <el-option label="运营部" :value="1"></el-option>
              <el-option label="维修部" :value="2"></el-option>
              <el-option label="市场部" :value="3"></el-option>
              <el-option label="财务部" :value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="抄送部门" prop="select1">
            <el-select placeholder="请选择抄送部门" v-model="form2.select2">
              <el-option label="总裁办" :value="0"></el-option>
              <el-option label="运营部" :value="1"></el-option>
              <el-option label="维修部" :value="2"></el-option>
              <el-option label="市场部" :value="3"></el-option>
              <el-option label="财务部" :value="4"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <template #step-3>
        <el-form  :model="form3" :rules="rule3" ref="formRef3">
          <el-form-item label="负责人姓名" prop="name" >
            <el-input v-model="form3.name"></el-input>
          </el-form-item>
          <el-form-item label="负责人电话" prop="tel">
            <el-input v-model="form3.tel"></el-input>
          </el-form-item>
        </el-form>
      </template>
    </StepForm>
    <el-result
        icon="warning"
        title="设备编号：CD1001"
        sub-title="该任务已催促2次，请抓紧处理"
      >
        <template #extra>
          <el-button type="primary" @click="drawer=false">Back</el-button>
        </template>
      </el-result>
  </el-drawer>

</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { getList } from "@/api/alarm"
import StepForm from "@/components/StepForm.vue"
import type { FormInstance } from "element-plus";

onMounted(() => {
  loadData()
})
const act = ref(0)
const alarmList = ref<any[]>([])
const alarmListCopy = ref<any[]>([])
const loadData = async () => {
  const { data } = await getList()
  alarmList.value = data
  alarmListCopy.value = data
}

function handleClick(e: number) {
  console.log(e)
  if (e > 0) {
    alarmList.value = alarmListCopy.value.filter((item: any) => item.level == e)
  } else {
    alarmList.value = alarmListCopy.value
  }
}

const drawer = ref(false)
const titles = [
  { title: "基本信息" },
  { title: "审批信息" },
  { title: "负责人信息" }
]
const form1 = ref({
  name: "",
  email: "",
  tel: "",
  jobnum: ""
})
const form2 = ref({
  select1: "",
  select2: ""
})
const form3 = ref({
  name: "",
  tel: ""
})
const rule = {
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
  tel: [{ required: true, message: "请输入电话", trigger: "blur" }],
  jobnum: [{ required: true, message: "请输入工号", trigger: "blur" }],
}

const rule2 = {
  approve: [{ required: true, message: "不能为空", trigger: "blur" }],
  carbon: [{ required: true, message: "不能为空", trigger: "blur" }],
}

const rule3 = {
  name: [{ required: true, message: "不能为空", trigger: "blur" }],
  tel: [{ required: true, message: "不能为空", trigger: "blur" }],
}

const formRef1 = ref<FormInstance>()
const formRef2 = ref<FormInstance>()
const formRef3 = ref<FormInstance>()
const handleSubmit = () => {
  console.log("提交",form1.value)
  drawer.value=false
}
</script>

<style scope>
.tit {
  color: #666;
  margin-bottom: 50px;
}
</style>