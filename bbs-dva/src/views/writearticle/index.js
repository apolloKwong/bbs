import React from 'react'
import { Input, Select, Button } from 'antd'
import Lookup from '../../components/Lookup'
import styles from './index.less'
import Wangeditor from '../../components/Wangeditor'

const Writearticle = ({ }) => {

    return (
      <div className={styles.writearticle}>
        <br />
        <div className={styles.title}>
          <Input size='large' placeholder="请输入文章标题" style={{ width: 450, }} />
        </div>
        <br />
        <br />
        <div className={styles.plate}>
          <Button size="large" >请选择所属板块</Button>
          <Lookup groupCode="category" placeholder="所属板块" style={{ width: 220, zIndex: 10 }} />

        </div>
        <br />
        <br />

       <Wangeditor/>

      
        <br />
        <br />
        <div className={styles.operate}>
          <Button type="primary">存草稿</Button> <span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  </span> <Button type="primary">发 布</Button>

        </div>

      </div>
       
        
    ) 
}

export default Writearticle