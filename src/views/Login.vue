<template>
    <div class="login">
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>账号登录</span>
                </div>
            </template>
            <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="60px"
                class="demo-ruleForm">
                <el-form-item label="账号" prop="userName">
                    <el-input v-model="ruleForm.userName" type="text" autocomplete="off" clearable
                        placeholder="请输入账号" />
                </el-form-item>
                <el-form-item label="密码" prop="checkPass">
                    <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" clearable
                        placeholder="请输入密码" />
                </el-form-item>
                <el-form-item></el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
                    <el-button @click="resetForm(ruleFormRef)">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
    import {
        reactive,
        ref
    } from 'vue'
    import type {
        FormInstance
    } from 'element-plus'

    import {
        useRouter,
    } from "vue-router";

    import {
        useStore
    } from "vuex";
    import useCurrentInstance from "@/hooks/useCurrentInstance";

    import * as resApi from "../serve/request";
    const ruleFormRef = ref < FormInstance > ()

    const store = useStore()
    const router = useRouter();

    const {
        proxy
    } = useCurrentInstance();

    const validatePass = (rule: any, value: any, callback: any) => {
        if (value === '') {
            callback(new Error('请输入账号'))
        } else {
            callback()
        }
    }
    const validatePass2 = (rule: any, value: any, callback: any) => {
        if (value === '') {
            callback(new Error('请输入账号'))
        } else {
            callback()
        }
    }
    const ruleForm = reactive({
        userName: 'admin',
        checkPass: 'admin',
    })

    const rules = reactive({
        userName: [{
            validator: validatePass,
            trigger: 'blur'
        }],
        checkPass: [{
            validator: validatePass2,
            trigger: 'blur'
        }],
    })

    const submitForm = async (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.validate(async (valid) => {
            if (valid) {

                let params = {
                    username: ruleForm.userName,
                    password: ruleForm.checkPass,
                }

                resApi.api.getToken(params).then(res => {
                    if (res && res.code === 0) {
                        store.dispatch('setToken_a', res.data.token)
                        sessionStorage.setItem('Admin-Token', res.data.token)
                        router.push('/')
                    }
                })

            } else {
                console.log('error submit!')
                return false
            }
        })
    }

    const resetForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.resetFields()
    }
</script>
<style lang="scss" scope>
    .login {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .text {
            font-size: 14px;
        }

        .item {
            margin-bottom: 18px;
        }

        .box-card {
            width: 480px;

            .el-card__body {
                padding: 40px 80px;
            }
        }
    }
</style>