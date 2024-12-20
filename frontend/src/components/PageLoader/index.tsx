import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./PageLoader.scss";

type PageLoaderProps = {
  title?: string;
  className?: string;
};
export default function PageLoader(props: PageLoaderProps) {
  const title = props.title ?? "Zəhmət olmasa gözləyin...";
  const antIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />;

  return (
    <>
      <div className={"page-loading-indicator " + props.className}>
        <Spin indicator={antIcon} />
        <h4>{title}</h4>
      </div>
    </>
  );
}
