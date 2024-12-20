import { Form, Input, Modal } from "antd";
import { Rule } from "antd/es/form";
import { useEffect } from "react";
import "./CreateSimulationDialog.scss";

interface CreateSimulationDialogProps {
  open: boolean;
  onSubmit: (values: { emailContent: string; email: string }) => void;
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
      okText="Create trigger"
      cancelText="Cancel"
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          name="email"
          label="Client email"
          rules={formItemRules.email}
          validateTrigger="onBlur"
        >
          <Input placeholder="user@example.com" />
        </Form.Item>
        <Form.Item
          name="emailContent"
          label="Email content"
          rules={formItemRules.emailContent}
          validateTrigger="onBlur"
        >
          <Input.TextArea
            maxLength={1024}
            placeholder="Phishing mail content, including link"
            autoSize={{ minRows: 5, maxRows: 15 }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

const formItemRules: Record<string, Rule[]> = {
  email: [{ required: true, type: "email", message: "Please enter a valid email address" }],
  emailContent: [{ required: true, type: "string", message: "Please enter a valid email content" }],
};
