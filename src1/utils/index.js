/* global window */
import classnames from 'classnames'
import lodash from 'lodash'
import config from './config'
import request from './request'
import ValidateRules from './validateRules'
import PERMS from './permissionConstant'
import rpc from './service'
import { color } from './theme'
import { WaitGroup } from './waitgroup'
import { l2t } from './l2t'
import { Form } from 'antd'

const apiPrefix = config.SERVICES

//格式化字符串
String.prototype.format = function() {
    var args = arguments, length = args.length;
    return this.replace(new RegExp("{([0-9]+)}", "g"),
            function(str, index) {
                var value = args[index];
                return value !== undefined ? value : "";
            });
}
//格式化字符串
String.prototype.format2 = function(args) {
    return this.replace(new RegExp("{(\\w+)}", "g"),
            function(str, index) {
                var value = args[index];
                return value !== undefined ? value : "";
            });
}

// 连字符转驼峰
String.prototype.hyphenToHump = function () {
  return this.replace(/-(\w)/g, (...args) => {
    return args[1].toUpperCase()
  })
}

// 驼峰转连字符
String.prototype.humpToHyphen = function () {
  return this.replace(/([A-Z])/g, '-$1').toLowerCase()
}

// 日期格式化
Date.prototype.format = function (format) {
  const o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds(),
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr(`${o[k]}`.length))
    }
  }
  return format
}


/**
 * @param   {String}
 * @return  {String}
 */

const queryURL = (name) => {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}

/**
 * 数组内查询
 * @param   {array}      array
 * @param   {String}    id
 * @param   {String}    keyAlias
 * @return  {Array}
 */
const queryArray = (array, key, keyAlias = 'id') => {
  if (!(array instanceof Array)) {
    return null
  }
  const newArr = array.filter(function(item){
      return item.id == key
  })
  if (newArr.length) {
    return newArr [0]
  }
  return null
}

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
const arrayToTree = (array, id = 'id', pid = 'pid', children = 'children') => {
  let data = lodash.cloneDeep(array)
  let result = []
  let hash = {}
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index]
  })

  data.forEach((item) => {
    let hashVP = hash[item[pid]]
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = [])
      hashVP[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

function goBack(i) {
    //window.history.go(i || -1);
    History.back()
}


function getFormatFieldsValue(names) {
    let fields = this.fieldsStore.getFieldsValue(names)
    return _.mapValues(fields,(value,key)=>{
      let instance =  this.getFieldInstance(key)
      if(instance && instance.formatter){
          return instance.formatter(value)
      }
      return value
    })
}

function createDataForm(Node,field = 'data'){
    return Form.create({
        mapProps:function(obj){
            obj.form.getFormatFieldsValue=getFormatFieldsValue.bind(this)
            return obj
        },
        mapPropsToFields:(props)=>{
            return _.mapValues(props[field],function(value){
                return {value}
            });
        },
    })(Node);
}

var user = {}
var i18ns = {}

function InitUser(u){
    user = u
}

function getUser(){
    return user
}

function InitI18N(u){
    _.each(u,(v)=>{i18ns[v.key]= v.value})
}

/**
	 * 公共国际化前端接口
	 * 参数为 {abc} 这样的形式，可重复
	 * eg. UI.I18N('test.abc',{a:'Hello Test',b:'234'})
	 * key: test.abc
	 * param:格式化参数，可以忽略
	 * def:默认值，不提供则返回 key
	 * value: This is a #a# and #b#.
	 * result: This is a Hello Test and 234.
*/
function i18n(key, param, def){
    
    if(_.isString(param)){
        def = param;
        param == null;
    }
    
    var value = i18ns[key];
    
    if(value === undefined){
        return def || key;
    }
    
    if(value && param){
        return value.format2(param);
    }
    return value;
}

module.exports = {
  config,
  request,
  rpc,
  color,
  classnames,
  queryURL,
  queryArray,
  arrayToTree,
  WaitGroup,
  l2t,
  apiPrefix,
  goBack,
  createDataForm,
  ValidateRules,
  PERMS,
  InitUser,
  getUser,
  InitI18N,
  showUserLabel: (field) => {return field + 'LastName'},
  hasPerm: (perm) => {return user.root || _.includes(user.permissions,perm)},
  i18n,
}
