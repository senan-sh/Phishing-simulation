import { PhishingAttempt } from "@/services/phishing-attempts.service";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

enum Columns {
  Index = "no",
  RecipientEmail = "email",
  EmailContent = "emailContent",
  CreateDate = "createdAt",
  Status = "status",
}

export const columns: ColumnsType<PhishingAttempt> = [
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
    render: (val) => dayjs(val.createdAt).format("DD.MM.YYYY HH:mm"),
  },
  {
    key: Columns.Status,
    title: "Status",
    dataIndex: Columns.Status,
    width: 80,
    align: "center",
    render: (val) => {
      return <div className={val.toLowerCase() + " status-chip"}>{val}</div>;
    },
  },
];
