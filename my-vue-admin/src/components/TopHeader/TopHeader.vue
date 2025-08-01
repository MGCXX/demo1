<template>
    <div class="topheader">
        <div class="personal">
            <el-badge :is-dot="info > 0">
                <el-button icon="Bell" />
            </el-badge>
            <div class="ml">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
            </div>

            <el-dropdown trigger="click" class="ml" @command="handleCommand">
                <span class="el-dropdown-link">
                    欢迎您<el-icon class="el-icon--right"><arrow-down /></el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item icon="User" command="user">个人中心</el-dropdown-item>
                        <el-dropdown-item icon="SwitchButton" command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>

    </div>
    
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/auth';



const info = ref(0)
const router = useRouter()
const userStore = useUserStore()
const handleCommand = (command: string) => {
    if (command == "user") {
        router.push("/personal")
    } else {
        userStore.logout()
        router.push("/login")
    }
}


</script>

<style lang="less">
.topheader {
    height: 50px;
    background-color: white ;
    padding: 10px;
}

.personal {
    display: flex;
    justify-content: right;
    align-items: center;
}
</style>