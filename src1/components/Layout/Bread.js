import React from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb, Icon } from 'antd'
import { Link } from 'react-router-dom'
import pathToRegexp from 'path-to-regexp'
import { queryArray } from 'utils'
import styles from './Bread.less'


function filterPath(menuMap, location){
    
    let currentNodeId = _.findKey(menuMap,function(menu){
        return menu.url && pathToRegexp(menu.url).exec(location.pathname)
    });
    
    var currentNode = menuMap[currentNodeId];
    var paths = [];
    while (currentNode) {
        paths.unshift(currentNode);
        currentNode = menuMap[currentNode.parentId];
    }
    return paths
}

const Bread = ({ menu, location }) => {
  // 匹配当前路由
  
  let pathArray = filterPath(menu,location)
  
  // 递归查找父级
  
  const breads = pathArray.map((item, key) => {
    const content = (
      <span>{item.iconName
        ? <Icon type={item.iconName} style={{ marginRight: 4 }} />
        : ''}{item.name}</span>
    )
    return (
      <Breadcrumb.Item key={key}>
        {((pathArray.length - 1) !== key)
          ? <Link to={item.route || '#'}>
            {content}
          </Link>
          : content}
      </Breadcrumb.Item>
    )
  })

  return (
    <div className={styles.bread}>
      <Breadcrumb>
        {breads}
      </Breadcrumb>
    </div>
  )
}

Bread.propTypes = {
  menu: PropTypes.object,
  location: PropTypes.object,
}

export default Bread
