import { ButtonProps, Form, Input, Modal } from "antd";
import "./CreateSimulationDialog.scss";
import { Rule } from "antd/es/form";
import { useEffect } from "react";

interface CreateSimulationDialogProps {
  open: boolean;
  onSubmit: (data: unknown) => void;
  onClose: () => void;
}
export default function CreateSimulationDialog(props: CreateSimulationDialogProps) {
  const { open, onClose, onSubmit } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [form, open]);

  const onOk = () => {
    form
      .validateFields()
      .then((values) => {
        onSubmit(values);
      })
      .catch(() => {});
  };

  return (
    <Modal
      centered
      title="Trigger a phishing attempt"
      className="attemt-creation-dialog"
      open={open}
      onOk={onOk}
      onCancel={onClose}
      okText="Create attempt"
      cancelText="Cancel"
    >
      <Form layout="vertical" form={form}>
        <Form.Item name="email" label="Client email" rules={formItemRules} validateTrigger="onBlur">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

const formItemRules: Rule[] = [
  { required: true, type: "email", message: "Please enter a valid email address" },
];
