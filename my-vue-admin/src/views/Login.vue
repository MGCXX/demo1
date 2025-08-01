<template>
    <div class="bg">
        <div class="login">
            <div class="logo">
                <img :src="logo" alt="" width="70px" height="70px">
                <h1 class="ml">后台管理系统</h1>
            </div>
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" @keyup.enter="handleLogin">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="请输入用户名" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="ruleForm.password" placeholder="请输入密码" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width: 100%;" @click="handleLogin">
                        登录
                    </el-button>
                </el-form-item>
            </el-form>
        </div>


    </div>
</template>

<script setup lang="ts">
import logo from "@/assets/logo.png";
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/auth.ts";
interface RuleForm {
    username: string,
    password: string
}
const ruleForm = reactive<RuleForm>({
    username: "",
    password: ""
})
const rules = reactive({
    username: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        { min: 4, max: 6, message: "请输入4-6位数字字母组合", trigger: "blur" }
    ],
    password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { pattern: /^[a-zA-Z0-9]{6,12}$/, message: "请输入6-12位字母或数字", trigger: "blur" }
    ]
})

const ruleFormRef = ref<FormInstance>()
const router = useRouter()
const useStore = useUserStore()
const handleLogin = () => {
    ruleFormRef.value?.validate(async (valid: Boolean) => {
        if (valid) {
            console.log("校验通过")
            await useStore.login(ruleForm, router)
        }
    })
}


</script>

<style lang="less" scoped>
.bg {
    background-image: url("../src/assets/bg.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;

    .login {
        width: 500px;
        height: 300px;
        padding: 50px;
        box-shadow: 0 0 10px 10px #f4f4f4;
        position: absolute;
        top: 50%;
        margin-top: -200px;
        left: 10%;

        .logo {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 40px;

            h1 {
                color: rgb(14, 53, 148);
            }

        }


    }
}
</style>