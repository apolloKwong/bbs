import { Upload, Icon, message,Avatar } from 'antd';
function beforeUpload(file) {

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isLt2M;
}

class Avatars extends React.Component {
    state = {
        loading: false,
    };
    
    handleChange = (info) => {


        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {

            this.setState({
                entity:info.file.response.entity 
            }) 
  this.props.getImgUrl(`http://10.110.200.183:8080/services/bbs/uploadImg/getimg/${this.state.entity}`) 
         
        }

    }
 


    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">上传头像</div>
            </div>
        );
       const entity=this.state.entity
       const url= `http://10.110.200.183:8080/services/bbs/uploadImg/getimg/${entity}`
        return (
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="/services/bbs/uploadImg/upload"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
            >

                {this.state.entity ? <Avatar src={url} size="large" /> : <Avatar src={this.props.extendData.userImage} size="large"/>}
            </Upload>
        );
    }
}

export default Avatars