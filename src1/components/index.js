import Loader from './Loader'
import * as Layout from './Layout/index.js'
import moment from 'moment';
import {DatePicker,TimePicker,Calendar} from 'antd';
import layer from './layer'
import Page from './Page'

const {MonthPicker, RangePicker} = DatePicker

function toMoment(date,format){
    if(moment.isMoment(date)){
        return date;
    }
    return date?moment(date,format):null;
}

function wrapDate(Comp,props){
    var otherProps = _.omit(props, ['value','defaultValue']);
    if ('value' in props) {
        otherProps.value = toMoment(props.value,props.format);
    }else{
        otherProps.defaultValue = toMoment(props.defaultValue,props.format);
    }
    return <Comp ref="meta" {...otherProps} />
}

function formatter(value) {
    if (value !== undefined) {
        return value.format(this.refs.meta.props.format);
    }
    return ""
}


class datePicker extends  React.Component {
    constructor(props) {
        super(props);
        this.formatter = formatter.bind(this);
    }
    
    render() {
        return wrapDate(DatePicker,this.props);
    }
    
}


class timePicker extends  React.Component {
    constructor(props) {
        super(props);
        this.formatter = formatter.bind(this);
    }
    
    render() {
        return wrapDate(TimePicker,this.props);
    }
    
}


class monthPicker extends  React.Component {
    constructor(props) {
        super(props);
        this.formatter = formatter.bind(this);
    }
    
    render() {
        return wrapDate(MonthPicker,this.props);
    }
    
}


class calendar extends  React.Component {
    constructor(props) {
        super(props);
        this.formatter = formatter.bind(this);
    }
    
    render() {
        return wrapDate(Calendar,this.props);
    }
    
}

export {
  Layout,
  Loader,
  layer,
  Page,
  datePicker as DatePicker ,
  timePicker as TimePicker,
  calendar as Calendar,
  monthPicker as MonthPicker, 
  //rangePicker as RangePicker
}
