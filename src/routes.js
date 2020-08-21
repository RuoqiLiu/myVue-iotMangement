import Login from './views/Login.vue'
import Home from './views/Home.vue'
import Homepage from './views/list/homepage.vue' 

import monitorNow from './views/list/1/monitorNow.vue'
import monitorHis from './views/list/1/monitorHis.vue'

import deviceMan from './views/list/2/deviceMan.vue'
import projectMan from './views/list/2/projectMan.vue'

import alarm from './views/list/1/alarmMes.vue'
import Register from './views/Register.vue'


let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true,

    },
    
    {
        path: '/register',
        component: Register,
        name: '',
        hidden: true,
    },
    {
        path: '/',
        component: Home,
        name: '',
        leaf: true,//只有一个节点
        iconCls: 'el-icon-menu', //图标样式class
        children: [
            { path: '/homepage', component: Homepage, name: '首页' },
        ]
    },
  
    {
        path: '/',
        component: Home,
        name: '管理',
        // leaf: true,//只有一个节点
        iconCls: 'el-icon-message', //图标样式class
        children: [
            { path: '/projectManage', component: projectMan, name: '项目管理' },
            { path: '/deviceManage', component: deviceMan, name: '设备管理' },
        ]
    },

    {
        path: '/',
        component: Home,
        name: '监控',
        // leaf: true,//只有一个节点
        iconCls: 'el-icon-message', //图标样式class
        children: [
            { path: '/monitorNow', component: monitorNow, name: '实时监控' },
            { path: '/monitorHis', component: monitorHis, name: '历史数据' },
            { path: '/alarm', component: alarm, name: '报警信息' }
        ]
    }


];

export default routes;