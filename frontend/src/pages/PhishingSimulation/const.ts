import { ColumnsType } from "antd/es/table";

enum Columns {
  Index = "no",
  RecipientEmail = "recipientEmail",
  EmailContent = "emailContent",
  CreateDate = "createdDate",
  Status = "status",
}

export const columns: ColumnsType<unknown> = [
  {
    key: Columns.Index,
    title: "No",
    dataIndex: Columns.Index,
    width: 10,
    render: (_text: string, _record: unknown, index: number) => index + 1,
  },
  {
    key: Columns.RecipientEmail,
    title: "Recipient email",
    dataIndex: Columns.RecipientEmail,
    width: 80,
    align: "center",
  },
  {
    key: Columns.EmailContent,
    title: "Email content",
    dataIndex: Columns.EmailContent,
    width: 80,
    align: "center",
  },
  {
    key: Columns.CreateDate,
    title: "Created date",
    dataIndex: Columns.CreateDate,
    width: 80,
    align: "center",
  },
  {
    key: Columns.Status,
    title: "Status",
    dataIndex: Columns.Status,
    width: 80,
    align: "center",
  },
];
