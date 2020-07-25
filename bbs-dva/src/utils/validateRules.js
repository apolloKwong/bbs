const ValidateRules = {
		SEC:{
			USER:{
				ACOUNT_MAX:30,  //账户最大长度
				ACOUNT_MIN:5,  //账户最小长度
				PWD_MAX: 30, //密码最大长度
				PWD_MIN: 3, // 密码最小长度
				ACOUNT_REGEX:/^[A-Za-z0-9_]+$/,  //账户正则表达式
				NAME_MAX:60,  //姓名最大长度
				NAME_REGEX:/^[\u4e00-\u9fa5A-Za-z0-9-_]*$/,  //姓名正则表达式
				MAIL_MAX:80,  //邮箱最大长度
				MAIL_MIN:6,  //邮箱最小长度
				MAIL_REGEX:/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,  //邮箱正则表达式
				PHONE_MAX:18,  //联系电话最大长度
			},
	        ROLE:{
	        	NAME_MAX:60,  //角色名称最大长度
	        	NAME_MIN:5,  //角色名称最小长度
	        	NAME_REGEX:/^[A-Za-z0-9_]+$/,  //角色名称正则表达式
	        	DESP_MAX:60,  //角色描述最大长度
	        },
	        GROUP:{
	        	CODE_MAX:80,  //组编码最大长度
	        	CODE_REGEX:/^\w+$/,  //组编码正则表达式
	        	NAME_MAX:80,  //组名称最大长度
	        	NAME_MIN:2,  //组名称最小长度
	        	DESP_MAX:500,  //描述最大长度
	        },
	        LOOKUP:{
	        	CODE_MAX:100,  //编码最大长度
	        	CODE_REGEX:/^[A-Za-z0-9-]+$/,  //编码正则表达式
	        	DESP_MAX:80,  //类型名称最大长度
	        	DESP_MIN:2,  //类型名称最小长度
	        },
	        EXPORT:{
	        	TYPE_MAX:64,  //导出类型最大长度
	        	TYPE_MIN:3,  //导出类型最小长度
	        	DESC_MAX:256,  //描述最大长度
	        	DESC_MIN:3,  //描述最小长度
	        	EXECLASS_MAX:128,  //导出类全路径最大长度
	        },
	        IMPORT:{
	        	TYPE_MAX:64,  //导出类型最大长度
	        	TYPE_MIN:3,  //导出类型最小长度
	        	DESC_MAX:256,  //描述最大长度
	        	DESC_MIN:3,  //描述最小长度
	        	EXECLASS_MAX:128,  //导出类全路径最大长度
	        },
	        JOB:{
	        	NAME_MIN:2,  //任务名称最小长度
	        	NAME_MAX:64,  //任务名称最大长度
	        	DESP_MIN:3,  //任务描述最小长度
	        	DESP_MAX:256,  ////任务描述最大长度
	        	CLASSNAME_MIN:3,  //完整类路径最小长度
	        	CLASSNAME_MAX:200,  //完整类路径最大长度
	        	METHODNAME_MIN:1,  //方法名最小长度
	        	METHODNAME_MAX:128,  //方法名最大长度
	        },
	        ORG:{
	        	ORGNAME_MAX:255,  //组织机构名称最大长度
	        	FILED1_MAX:255,  //机构简称最大长度
	        	ORGCODE_MAX:255,  //机构编码最大长度
	        	ORGCODE_REGEX:/^[A-Za-z0-9-]+$/,  //机构编码正则表达式
	        },
	        MENU:{
	        	NAME_MAX:25,  //菜单名称最大长度
	        },
	        REGISTRY:{
	        	CODE_MAX:25,  //注册表名称最大长度
	        }
		},
	}
export default ValidateRules