import { Upload, Button, Icon, message } from 'antd';
function beforeUpload(file) {

    const isLt15M = file.size / 1024 / 1024 < 15;
    if (!isLt15M) {
        message.error('文件必须小于15MB');
        message.error(`文件必须小于15MB ${info.file.name} file upload failed.`);
    }
    return isLt15M;
}
class MyUpload extends React.Component {
    state = {
        fileList: [{
            uid: -1,
            name: '',
            status: 'done',
            url: '',
        }],
    }
    handleChange = (info) => {
        let fileList = info.fileList;

        // 1. Limit the number of uploaded files
        //    Only to show two recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-1);
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            this.setState({
                entity: info.file.response.entity,
                fileSize: info.file.size,
            })
            this.props.getFileUrl(`http://10.110.200.183:8080/services/bbs/uploadFile/getfile/${this.state.entity}`)
            this.props.getFileSize(`${this.state.fileSize}`)

        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
        this.setState({ fileList });

    }
    render() {
        const props = {
            action: '/services/bbs/uploadFile/upload',
            onChange: this.handleChange,

        }
        const entity = this.state.entity
        const url = `http://10.110.200.183:8080/services/bbs/uploadFile/getfile/${entity}`
        return (
            <Upload {...props} beforeUpload={beforeUpload} fileList={this.state.fileList}>
                <Button>
                    <Icon type="upload" /> 选择文件
                </Button>
            </Upload>
        );
    }
}
export default MyUpload
