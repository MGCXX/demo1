<template>
    <div class="common-layout">
        <el-container >
            <el-aside>
                <nav-menu></nav-menu>
            </el-aside>
            <el-container>
                <el-header>
                    <TopHeader/>
                </el-header>
                <el-main>
                    <home-tag></home-tag>
                    
                </el-main>
                <el-footer>Footer</el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
import TopHeader from '@/components/TopHeader/TopHeader.vue';
import NavMenu from '@/components/NavMenu.vue';
import HomeTag from './HomeTag.vue';
</script>

<style lang="less" scoped>
.el-aside{
    width:200px ;
    height: 100vh;
    box-shadow: 10px 0 8px -2px rgba(0, 0, 0, 0.2);
    background-color: white;
}
.el-header{
    padding: 0 !important;
}
.el-main{
    height: 80vh;
    overflow: auto;
}
</style>