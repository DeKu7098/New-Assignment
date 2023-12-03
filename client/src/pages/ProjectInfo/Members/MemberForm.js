import React, { useRef } from 'react';
import { Form, Input, Modal, message } from "antd"
import { useDispatch } from 'react-redux';
import { SetLoading } from '../../../redux/loadersSlice';
import { AddMemberToProject } from '../../../apicalls/projects';
import { getAntdFormRules } from '../../../utils/helpers';

function MemberForm({showMemberForm, setShowMemberForm, reloadData, project}) {
    console.log(project.members);
    const formRef = useRef(null);
    const dispatch = useDispatch()
    const onFinish = async (values) => {
        try {
            //check if email already exists
            const emailExist = project.members.find(
                (member) => member.user.email === values.email
            );
            if(emailExist){
                throw new Error("Already a member");
            }else{
                dispatch(SetLoading(true));
                const response = await AddMemberToProject({
                    projectId: project._id,
                    email: values.email,
                    role: values.role
                });
               dispatch(SetLoading(false));
               if(response.success){
                message.success(response.message);
                reloadData();
                setShowMemberForm(false);
               }else{
                message.error(response.message);
               }
            }
        } catch (error) {
            dispatch(SetLoading(false));
            message.error(error.message);
        }
    }
  return (
    <Modal
      title ="ADD MEMBER"
      open={ showMemberForm }
      onCancel={() => setShowMemberForm(false)}
      centered
      okText="Add"
      onOk={() => {
        formRef.current.submit();
      }}
    >
     <Form layout='vertical' ref={formRef} onFinish={onFinish}>
        <Form.Item label="Email" name="email" rules={getAntdFormRules}>
          <Input placeholder='Email'/>
        </Form.Item>
        <Form.Item label="Role" name="role" rules={getAntdFormRules}>
          <select>
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </select>
        </Form.Item>
     </Form>
    </Modal>
  )
}

export default MemberForm