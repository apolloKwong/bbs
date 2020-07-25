import React from 'react'
import { } from 'antd'
import { Header, Module, Footer } from '../../components/HomeLayout'
import styles from './index.less'

const Forum = ({ }) => {

    return (
        <div className={styles.forum}>
            <div className={styles.content}>
                <div className={styles.content_list}>
                    <div className={styles.post}>
                        1<br />
                        1<br />
                        1<br />
                        1<br />
                        1<br />
                        1<br />
                        1<br />
                        1<br />

                    </div>
                </div>
                <div className={styles.content_list}>
                    <div className={styles.post}>
                        21<br />
                        1<br />
                        1<br />
                        1<br />
                        1<br />
                        1<br />
                        1<br />
                        1<br />1<br />
                        1<br />
                        1<br />
                        1<br />
                        1<br />
                        1<br />
                        1<br />
                        1<br />
                    </div>
                </div>
                <div className={styles.content_list}>
                    <div className={styles.post}>
                        3
                    </div>
                </div>
            </div>

            <div className={styles.side}>
                <div className={styles.posting}>
                    <br />
                    <p>我要发帖</p>

                </div>
                <div className={styles.plate}>
                    <div className={styles.title}>
                        <br /><p>板块分类</p>
                    </div>
                    <div className={styles.side_list}>
                        <br /><p>运营管理</p>
                    </div>
                    <div className={styles.side_list}>
                        <br /><p>售前市场</p>
                    </div>
                    <div className={styles.side_list}>
                        <br /><p>产品设计</p>
                    </div>
                    <div className={styles.side_list}>
                        <br /><p>万物互联</p>
                    </div>
                    <div className={styles.side_list}>
                        <br />  <p>技术之家</p>
                    </div>
                    <div className={styles.side_list}>
                        <br /> <p>研发管理</p>
                    </div>
                    <div className={styles.side_list}>
                        <br /> <p>质量保证</p>
                    </div>
                    <div className={styles.side_list}>
                        <br /> <p>职场人生</p>
                    </div>
                </div>

                <div className={styles.focus}>
关注的话题
关注的话题
关注的话题
关注的话题
关注的话题
                </div>

            </div>
        </div>
    )
}

export default Forum