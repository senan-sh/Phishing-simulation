import { Button, Table } from "antd";
import "./PhishingSimulation.scss";
import { columns } from "./const";
import CreateSimulationDialog from "./components/CreateSimulation";
import { useState } from "react";

export default function PhishingSimulation() {
  const [creationDialogOpened, setCreationDialogOpened] = useState(false);

  const openDialog = () => {
    setCreationDialogOpened(true);
  };
  const onClose = () => {
    setCreationDialogOpened(false);
  };
  const onSubmit = (data: unknown) => {
    alert("submitted");
  };

  return (
    <>
      <div className="phishing-simulation-page">
        <div className="page-heading">
          <h1>Phishing attempts</h1>
          <Button
            onClick={openDialog}
            type="primary"
            title="Create attempt"
            children="Create attempt"
          />
        </div>
        <Table columns={columns} dataSource={[]} />
      </div>
      <CreateSimulationDialog open={creationDialogOpened} onClose={onClose} onSubmit={onSubmit} />
    </>
  );
}
