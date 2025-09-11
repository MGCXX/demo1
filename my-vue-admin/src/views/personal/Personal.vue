<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-card>
        <el-descriptions border direction="vertical">
          <el-descriptions-item :rowspan="3" :width="140" label="个人头像" align="center">
            <el-image style="width: 100px; height: 100px"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          </el-descriptions-item>
          <el-descriptions-item label="姓名">kooriookami</el-descriptions-item>
          <el-descriptions-item label="电话">18100000000</el-descriptions-item>
          <el-descriptions-item label="地址">中国</el-descriptions-item>
          <el-descriptions-item label="个人标签">
            <el-tag size="small">认真</el-tag>
            <el-tag size="small">学</el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
      <el-card class="mt">
        <el-calendar v-model="value" />
      </el-card>
      <el-card class="mt">
        <el-row :gutter="20">
          <el-col :span="16">
            <template #header>
              完善个人资料
            </template>
            <StepForm :title="titles" :formRef1="formRef1" :formRef2="formRef2" @handleSubmit="handleSubmit">
              <template #step-1>
                <el-form :model="form" ref="formRef1">
                  <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                  <el-form-item label="电话">
                    <el-input v-model="form.tel"></el-input>
                  </el-form-item>
                  <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                  </el-form-item>
                </el-form>
              </template>
              <template #step-2>
                <el-form :model="form"  ref="formRef2">
                  <el-select v-model="form.select" placeholder="请选择在职状态" style="width: 240px" class="mt mb">
                    <el-option label="工作中" value="工作中"></el-option>
                    <el-option label="请假中" value="请假中"></el-option>
                    <el-option label="出差中" value="出差中"></el-option>
                    <el-option label="年假中" value="年假中"></el-option>
                  </el-select>
                </el-form>
              </template>
            </StepForm>
          </el-col>
          <el-col :span="8" style="text-align: center;">
            <h1 class="mt mb">资料完善度</h1>
            <el-progress type="circle" :percentage="80" />
          </el-col>
        </el-row>


      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card>
        <el-badge :value="200" :max="99" class="item">
          <el-button>待办事项</el-button>
        </el-badge>
        <el-badge :value="100" :max="10" class="item">
          <el-button>指派给我</el-button>
        </el-badge>
        <el-badge :value="200" :max="99" class="item">
          <el-button>部门公告</el-button>
        </el-badge>
        <el-badge :value="100" :max="10" class="item">
          <el-button>站内信</el-button>
        </el-badge>
        <el-badge :value="100" :max="10" class="item">
          <el-button>我指派的</el-button>
        </el-badge>
      </el-card>
      <el-card class="mt">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="账号注销通知！" name="1">
            <div class="context">
              <h2>员工离职，账号需要注销，请及时处理！</h2>
              <el-button type="primary" size="small">去处理</el-button>
            </div>
          </el-collapse-item>
          <el-collapse-item title="权限变更通知！" name="2">
            <div class="context">
              <h2>王丽丽因部门调动账号权限需调整！</h2>
              <el-button type="primary" size="small">去处理</el-button>
            </div>
          </el-collapse-item>
          <el-collapse-item title="财务放款通知！" name="3">
            <div class="context">
              <h2>北京充电站充电桩维修放款！</h2>
              <el-button type="primary" size="small">去处理</el-button>
            </div>
          </el-collapse-item>
          <el-collapse-item title="人员调动通知！" name="4">
            <div class="context">
              <h2>李继维由行政部转为维修部，需要办理！</h2>
              <el-button type="primary" size="small">去处理</el-button>
            </div>
          </el-collapse-item>

          <el-collapse-item title="出差费用报销审批" name="5">
            <div class="context">
              <h2>运营部7人出差，报销费用8700元需审批</h2>
              <el-button type="primary" size="small">去处理</el-button>
            </div>
          </el-collapse-item>
          <el-collapse-item title="财务放款通知！" name="6">
            <div class="context">
              <h2>北京充电站充电桩维修放款！</h2>
              <el-button type="primary" size="small">去处理</el-button>
            </div>
          </el-collapse-item>
          <el-collapse-item title="人员调动通知！" name="7">
            <div class="context">
              <h2>李继维由行政部转为维修部，需要办理！</h2>
              <el-button type="primary" size="small">去处理</el-button>
            </div>
          </el-collapse-item>
          <el-collapse-item title="出差费用报销审批" name="8">
            <div class="context">
              <h2>运营部7人出差，报销费用8700元需审批</h2>
              <el-button type="primary" size="small">去处理</el-button>
            </div>
          </el-collapse-item>
          <el-collapse-item title="账号注销通知！" name="9">
            <div class="context">
              <h2>员工离职，账号需要注销，请及时处理</h2>
              <el-button type="primary" size="small">去处理</el-button>
            </div>
          </el-collapse-item>
          <el-collapse-item title="权限变更通知！" name="10">
            <div class="context">
              <h2>王丽丽因部门调动账号权限需调整！</h2>
              <el-button type="primary" size="small">去处理</el-button>
            </div>
          </el-collapse-item>

        </el-collapse>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import StepForm from "@/components/StepForm.vue"

const value = ref(new Date())
const titles = [{ title: "基本信息" }, { title: "在职人员" }]
const form = reactive({
  name: "",
  tel: "",
  address: "",
  select: ""
})
const formRef1=ref()
const formRef2=ref()
const activeNames = ref('0')
const handleSubmit = () => {
  console.log(form,"提交表单")
}

</script>

<style lang="less" scoped>
.el-tag {
  margin: 0 6px;
}

.item {
  margin-top: 10px;
  margin-right: 40px;
}

.context {
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>