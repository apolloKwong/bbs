import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Popover } from 'antd'
import styles from './Background.less'
class Background extends React.Component {
  constructor(props) {
    super(props);
    // this.onUnload = this.onUnload.bind(this); // if you need to bind callback to this
  }

  // onUnload() { // the method that will be used for both add and remove event
  //   console.log("meme")
  //   // location.hash
  //   debugger
  //   if (window.performance) {
  //     console.info("window.performance work's fine on this browser");
  //   }
  //   if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
  //     console.info("This page is reloaded");
  //   } else {
  //     console.info("This page is not reloaded");
  //   }
  // }

  componentDidMount() {
    // window.addEventListener("beforeunload", this.onUnload)
  }

  componentWillUnmount() {
    // window.removeEventListener("beforeunload", this.onUnload)
  }
  render() {

    return (
      <div className={styles.background}>

      </div>
    )
  }
}

Background.propTypes = {

}

export default Background

