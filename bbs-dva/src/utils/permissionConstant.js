//微服务编码
const ATC_SRC='10001'//attachment微服务权限码
const MENU_SRC='10002'//menu微服务权限码
const LOOKUP_SRC='10003'//lookup微服务权限码
const I18N_SRC='10005'//i18n微服务权限码
const DOWN_SRC='10006'//download微服务权限码
const EXCEL_SRC='10007'//excel微服务权限码
const SEC_SRC = '10008'//security微服务权限码
const UPLOAD_SRC = '10009'//upload微服务权限码
const JOB_SRC = '10011'//job微服务权限码
const WFLOW_SRC = '10012'//workflow微服务权限码
const DEV_SRC='10013'//devops微服务权限码

//资源码
const USER_RES ='10100'
const MENU_RES = '10101'
const ROLE_RES = '10102' //角色管理
const ROLE_PERM_RES = '10103' //角色权限管理
const ORG_RES = '10106'
const GROUP_RES = '10107'
const I18N_RES = '10120'
const REGISTRY_RES = '10201'
const LOOKUP_RES = '10301'
const AREA_RES = '10302' //区域
const JOB_RES = '10600' //定时任务

//操作码
const MENU = '000'
const CREATE = '001'
const UPDATE = '002'
const READ = '003'
const DELETE ='004'

const PermissionConstant = {
    ROLE:{
        CREATE:`${SEC_SRC}.10102.${CREATE}`,  //创建角色
        UPDATE:`${SEC_SRC}.10102.${UPDATE}`,  //角色更新
        DELETE:`${SEC_SRC}.10102.${DELETE}`,  //删除角色
        PERSET:`${SEC_SRC}.10102.${READ}`, //角色分配权限
        BUSER:`${SEC_SRC}.10102.091`,//绑定用户
        BULIST:`${SEC_SRC}.10102.093`,  //角色用户浏览
        DEUSER:`${SEC_SRC}.10102.094`,  //角色用户解绑
    },
    LOOKUP:{
        CREATE:`${LOOKUP_SRC}.10301.${CREATE}`,  //创建数据类型
        DELETE:`${LOOKUP_SRC}.10301.${DELETE}`,  //删除数据类型
        MENU:`${LOOKUP_SRC}.10301.${MENU}`,
    },
	GROUP:{
        MENU:`${SEC_SRC}.10107.${MENU}`,      //群组菜单显示
        CREATE:`${SEC_SRC}.10107.${CREATE}`,  //创建群组
        UPDATE:`${SEC_SRC}.10107.${UPDATE}`,  //群组更新
        DELETE:`${SEC_SRC}.10107.${DELETE}`,  //删除群组
        READ:`${SEC_SRC}.10107.${READ}`,  //群组查看
        AUSER:`${SEC_SRC}.10107.091`,  //用户授权
        AULIST:`${SEC_SRC}.10107.093`,  //组用户浏览
        DEUSER:`${SEC_SRC}.10107.094`,  //取消组用户授权
    },
    JOB:{
        MENU:`${JOB_SRC}.10600.${MENU}`,      //定时任务菜单显示
        CREATE:`${JOB_SRC}.10600.${CREATE}`,  //创建任务
        DELETE:`${JOB_SRC}.10600.${DELETE}`,  //删除任务
        READ:`${JOB_SRC}.10600.${READ}`, //查看任务
        UPDATE:`${JOB_SRC}.10600.${UPDATE}`,//更新任务
    },

    USER:{
        CREATE:`${SEC_SRC}.${USER_RES}.${CREATE}`,
        UPDATE:`${SEC_SRC}.${USER_RES}.${UPDATE}`,
        READ:`${SEC_SRC}.${USER_RES}.${READ}`,
        DELETE:`${SEC_SRC}.${USER_RES}.${DELETE}`,
    },

    ORG:{
        CREATE:`${SEC_SRC}.${ORG_RES}.${CREATE}`,
        UPDATE:`${SEC_SRC}.${ORG_RES}.${UPDATE}`,
        READ:`${SEC_SRC}.${ORG_RES}.${READ}`,
        DELETE:`${SEC_SRC}.${ORG_RES}.${DELETE}`,
    },

    MENU:{
        CREATE:`${SEC_SRC}.${MENU_RES}.${CREATE}`,
        UPDATE:`${SEC_SRC}.${MENU_RES}.${UPDATE}`,
        READ:`${SEC_SRC}.${MENU_RES}.${READ}`,
        DELETE:`${SEC_SRC}.${MENU_RES}.${DELETE}`,
    }
}

export default PermissionConstant