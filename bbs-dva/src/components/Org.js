import React from 'react'
import LazyCascader from './LazyCascader'
import { rpc } from 'utils'

const org = rpc("security/org/cascader")

function formatter(value){

    return _.isArray( value ) ? _.join( value, "," ) : value;
}

class Org extends React.Component {
    
    constructor(props) {
        super(props);
        this.formatter = formatter
    }
    
    render(){
      
        return <LazyCascader {...this.props} rpc={org} />
    }
}

export default Org