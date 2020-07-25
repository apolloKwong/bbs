import React from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import { arrayToTree, queryArray } from 'utils'
import pathToRegexp from 'path-to-regexp'

import styles from './Menu.less'

function filterPathId(menuMap, location){
    
    let currentNodeId = _.findKey(menuMap,function(menu){
        return menu.url && pathToRegexp(menu.url).exec(location.pathname)
    });
    
    var currentNode = menuMap[currentNodeId];
    var paths = [];
    while (currentNode) {
        paths.unshift(currentNode.id);
        currentNode = menuMap[currentNode.parentId];
    }
    return paths
}

const Menus = ({ siderFold, darkTheme, handleClickNavMenu, navOpenKeys, changeOpenKeys, menu, menuMap, location }) => {
  // 生成树状
  const levelMap = {}
  // 递归生成菜单
  const getMenus = (menuTreeN, siderFoldN) => {
    return menuTreeN.map((item) => {
      if (item.children) {
        if (item.parentId) {
          levelMap[item.id] = item.parentId
        }
        return (
          <Menu.SubMenu
            key={item.id}
            title={<span>
              {item.iconName && <FontAwesome name={item.iconName} className={styles.navIcon} />}
              {(!siderFoldN || !menu.includes(item)) && item.name}
            </span>}
          >
            {getMenus(item.children, siderFoldN)}
          </Menu.SubMenu>
        )
      }
      return (
        <Menu.Item key={item.id}>
          <Link to={item.url || '#'}>
            {item.iconName && <FontAwesome name={item.iconName} className={styles.navIcon} />}
            {(!siderFoldN || !menu.includes(item)) && item.name}
          </Link>
        </Menu.Item>
      )
    })
  }
  const menuItems = getMenus(menu, siderFold)

  // 保持选中
  const getAncestorKeys = (key) => {
    let map = {}
    const getParent = (index) => {
      const result = [String(levelMap[index])]
      if (levelMap[result[0]]) {
        result.unshift(getParent(result[0])[0])
      }
      return result
    }
    for (let index in levelMap) {
      if ({}.hasOwnProperty.call(levelMap, index)) {
        map[index] = getParent(index)
      }
    }
    return map[key] || []
  }

  const onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => !navOpenKeys.includes(key))
    const latestCloseKey = navOpenKeys.find(key => !openKeys.includes(key))
    let nextOpenKeys = []
    if (latestOpenKey) {
      nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey)
    }
    if (latestCloseKey) {
      nextOpenKeys = getAncestorKeys(latestCloseKey)
    }
    changeOpenKeys(nextOpenKeys)
  }

  let menuProps = !siderFold ? {
    onOpenChange,
    openKeys: navOpenKeys,
  } : {}


  // 寻找选中路由
  
  let defaultSelectedKeys = filterPathId(menuMap,location)

  return (
    <Menu
      {...menuProps}
      inlineIndent={10}
      mode={siderFold ? 'vertical' : 'inline'}
      theme={darkTheme ? 'dark' : 'light'}
      onClick={handleClickNavMenu}
      selectedKeys={defaultSelectedKeys}
    >
      {menuItems}
    </Menu>
  )
}

Menus.propTypes = {
  menu: PropTypes.array,
  siderFold: PropTypes.bool,
  darkTheme: PropTypes.bool,
  handleClickNavMenu: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
  location: PropTypes.object,
}

export default Menus
