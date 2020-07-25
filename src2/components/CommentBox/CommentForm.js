import React from 'react'
import styles from './CommentForm.less'
import { connect } from 'dva'
import { Input, Button, Form, } from 'antd'



const { TextArea } = Input
const FormItem = Form.Item


const CommentForm = ({ comment, articleId, userId, dispatch }) => {

    function handleSubmit(e) {
        e.preventDefault();
        dispatch({
            type: 'comment/createComment',
            payload: "1",
        })
        // this.props.form.validateFields((err, values) => {
        //   if (!err) {
        //     console.log('Received values of form: ', values);
        //   }
        // });
    }

    return (
        <div className={styles.commentForm}>
            <Form onSubmit={handleSubmit}>
                <FormItem>
                    <TextArea rows={4} />
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" >提交</Button>
                </FormItem>
            </Form>
        </div>
    )

}



export default connect(({ loading, comment }) => ({ loading, comment }))(CommentForm)
// export default CommentForm