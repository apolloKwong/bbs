import React from 'react'
import { Carousel, Tabs, Card, Row, Col } from 'antd'
import styles from './index.less'
import { Link } from 'react-router-dom'
import { createDataForm } from 'utils'
import { connect } from 'dva'
import BetterImg from 'better-img';

const TabPane = Tabs.TabPane;
function callback(key) {
    console.log(key);
}
//调用该方法(主方法) 
function dateDiff(date1, date2) {
    var type1 = typeof date1, type2 = typeof date2;
    if (type1 == 'string')
        date1 = stringToTime(date1);
    else if (date1.getTime)
        date1 = date1.getTime();
    if (type2 == 'string')
        date2 = stringToTime(date2);
    else if (date2.getTime)
        date2 = date2.getTime();
    return (date1 - date2) / 1000;//结果是秒 
}

//字符串转成Time(dateDiff)所需方法 
function stringToTime(string) {
    var f = string.split(' ', 2);
    var d = (f[0] ? f[0] : '').split('-', 3);
    var t = (f[1] ? f[1] : '').split(':', 3);
    return (new Date(
        parseInt(d[0], 10) || null,
        (parseInt(d[1], 10) || 1) - 1,
        parseInt(d[2], 10) || null,
        parseInt(t[0], 10) || null,
        parseInt(t[1], 10) || null,
        parseInt(t[2], 10) || null
    )).getTime();

}

function CurentTime() {
    var now = new Date();

    var year = now.getFullYear();       //年  
    var month = now.getMonth() + 1;     //月  
    var day = now.getDate();            //日  

    var hh = now.getHours();            //时  
    var mm = now.getMinutes();          //分  
    var ss = now.getSeconds();            //秒  

    var clock = year + "-";

    if (month < 10) clock += "0";
    clock += month + "-";

    if (day < 10) clock += "0";
    clock += day + " ";

    if (hh < 10) clock += "0";
    clock += hh + ":";

    if (mm < 10) clock += '0';
    clock += mm + ":";

    if (ss < 10) clock += '0';
    clock += ss;

    return (clock);
}
const Home = ({ sweetHome }) => {
    const { dataSource, dataTop24h, dataLatest24h, dataTraining, dataPoll } = sweetHome
    
    return (
        <div className={styles.home}>
            <div className={styles.content}>

                <Carousel autoplay className={styles.antCarousel}>

                    <div>
                        <BetterImg src="http://10.110.200.183:8080/services/bbs/uploadImg/getimg/2018-02-23/9a471ac1-847a-4ec2-9149-5c30012335bc.png"
                             height={260} resizeMode="contain"
                        />                     
                    </div>
                    <div>
                        <BetterImg src="http://10.110.200.183:8080/services/bbs/uploadImg/getimg/2018-02-23/fafee234-ef20-4571-b140-46b2ab595236.png"
                             height={260} resizeMode="contain"
                        />                    
                    </div>
                    <div>
                    <BetterImg src="http://10.110.200.183:8080/services/bbs/uploadImg/getimg/2018-02-23/437e5ba9-10a8-4a1e-a822-ec4d89999037.png"
                           height={260} resizeMode="contain"
                        />                       
                    </div>
                    <div>
                        <BetterImg src="http://10.110.200.183:8080/services/bbs/uploadImg/getimg/2018-02-23/e5bf3afa-62b2-4cd0-ace7-313b3ca02ef9.png"
                           height={260} resizeMode="contain"
                        />                      
                    </div>
                </Carousel>


                <div className={styles.side0}>
                    <Card bodyStyle={{ padding: '10px 5px 10px 20px' }}>
                        <Row >
                            <Col span={4} >
                                <div style={{  color: 'black', fontSize: '18px', fontWeight: "bold" }}>
                                    培训公告
                            </div>
                            </Col >
                            <Col span={2} offset={18}>
                                <Link to={`teamBuilding/training`}>
                                    <div style={{ fontSize: '14px', color: 'grey' }}>

                                        更多
                            </div>
                                </Link>
                            </Col >
                        </Row >
                    </Card>
                    {
                        _.map(dataTraining.data, function (item) {
                            return (
                                <Card key={item.id} bodyStyle={{ padding: '10px 5px 10px 20px' }}>
                                    <Row >
                                        <Col >
                                            <div>
                                                <Link to={`teamBuilding/training/trainingDetail/${item.id}`}>
                                                    <div style={{ margin: '4px', fontSize: '14px', color: 'black', display: 'inline' }}>

                                                        {item.title}

                                                    </div>

                                                </Link>



                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                            )
                        })
                    }
                </div>
                <div className={styles.side50}>
                    <Card bodyStyle={{ padding: '10px 5px 10px 20px' }}>
                        <Row >
                            <Col span={4} >
                                <div style={{ color: 'black', fontSize: '18px', fontWeight: "bold" }}>
                                    投票
                            </div>
                            </Col >
                            <Col span={2} offset={18}>
                                <Link to={`teamBuilding/poll`}>
                                    <div style={{ fontSize: '14px', color: 'grey' }}>

                                        更多
                            </div>
                                </Link>
                            </Col >
                        </Row >
                    </Card>

                    {
                        _.map(dataPoll.data, function (item) {
                            return (
                                <Card key={item.id} bodyStyle={{ padding: '10px 5px 10px 20px' }}>
                                    <Row >
                                        <Col >
                                            <div>
                                                <Link to={`teamBuilding/poll/pollDetail/${item.id}`}>
                                                    <div style={{ margin: '4px', fontSize: '14px', color: 'black', display: 'inline' }}>

                                                        {item.title}

                                                    </div>

                                                </Link>

                                                {item.status ? <div style={{ color: 'red', display: 'inline' }}>(进行中)</div> : <div style={{ display: 'inline' }}>(已结束)</div>}


                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                            )
                        })
                    }
                </div>
                <div className={styles.bottom}>
                    <div style={{ color: 'black', fontSize: '18px', fontWeight: "bold", padding: '10px 5px 10px 20px' }}>
                        专题
                    </div>
                </div>
                <Carousel autoplay className={styles.antCarousel2}>
                <Link target="_blank" to={`share/field/1`}>
                <div style={{ margin: '4px', fontSize: '28px', fontWeight: "bold", color: 'white' }}>运营管理专题讲座</div>
                </Link>
                <Link target="_blank" to={`share/field/2`}>
                <div style={{ margin: '4px', fontSize: '28px', fontWeight: "bold", color: 'white' }}>产品设计专题讲座</div>
                </Link>
                    </Carousel>
            </div>
            <div className={styles.side}>
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="24小时最热" key="1"  >
                        {
                            _.map(dataTop24h, function (item) {
                                return (<Card key={item.id} bodyStyle={{ padding: '10px 5px 10px 20px' }}>
                                    <Row >
                                        <Col span={21} >
                                            <Link target="_blank" to={`userPostings/resourceDetail/${item.id}`}>
                                                <div style={{ margin: '4px', fontSize: '14px', color: 'black' }}  >
                                                    {item.resourceName}
                                                </div>
                                            </Link>
                                        </Col>
                                        <Col span={1}  >
                                            <div style={{ margin: '4px', fontSize: '14px', color: 'black' }}  >
                                                {item.downloads}
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                                )
                            })

                        }
                    </TabPane>
                    <TabPane tab="24小时最新" key="2" >
                        {
                            _.map(dataLatest24h, function (item) {
                                return (<Card key={item.id} bodyStyle={{ padding: '10px 5px 10px 20px' }}>
                                    <Row >
                                        <Col span={18} >
                                            <Link target="_blank" to={`userPostings/resourceDetail/${item.id}`}>
                                                <div style={{ margin: '4px', fontSize: '14px', color: 'black' }}  >
                                                    {item.resourceName}
                                                </div>
                                            </Link>
                                        </Col>
                                        <Col span={4}  >
                                            <div style={{ margin: '4px', fontSize: '14px', color: 'black' }}  >
                                                {parseInt(dateDiff(CurentTime(), item.lastUpdateDate) / 3600) ?
                                                    <div>{parseInt(dateDiff(CurentTime(), item.lastUpdateDate) / 3600) + "小时前"}</div> : <div>刚刚更新</div>
                                                }
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                                )
                            })

                        }
                    </TabPane>
                </Tabs>
                <div style={{ color: 'black', fontSize: '18px', fontWeight: "bold", padding: '10px 5px 10px 20px', border: '1px solid #E9E9E9' }}>
                    活动日历
                  </div>
                {
                    _.map(dataSource.data, function (item) {
                        return (
                            <Card key={item.id} bodyStyle={{ padding: '10px 5px 10px 20px', color: 'black', fontSize: '16px' }}>
                                <Row >
                                    <Col >
                                        <Link to={`teamBuilding/activity/activityDetail/${item.id}`}>
                                            <div style={{ color: 'black', fontSize: '14px' }}>

                                                {item.title}

                                            </div>
                                        </Link>
                                    </Col>
                                </Row>
                            </Card>
                        )
                    })
                }



            </div>
        </div>
    )
}
export default connect(({ loading, sweetHome }) => ({ loading, sweetHome }))(createDataForm(Home))