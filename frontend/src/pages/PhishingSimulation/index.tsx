import { usePagination } from "@/hooks/usePagination";
import { phingAttemptsService, PhishingAttempt } from "@/services/phishing-attempts.service";
import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import "./PhishingSimulation.scss";
import CreateSimulationDialog from "./components/CreateSimulation";
import { columns } from "./const";

export default function PhishingSimulation() {
  const [creationDialogOpened, setCreationDialogOpened] = useState(false);
  const { onChangePagination, paginationParams, updatePaginationData, paginationStatData } =
    usePagination();
  const [tableData, setTableData] = useState<PhishingAttempt[]>([]);

  const openDialog = () => {
    setCreationDialogOpened(true);
  };
  const onClose = () => {
    setCreationDialogOpened(false);
  };
  const onSubmit = (email: string) => {
    phingAttemptsService.create(email);
  };

  useEffect(() => {
    (async () => {
      const responseData = await phingAttemptsService.getList();
      setTableData(responseData.data);
      updatePaginationData({
        totalElements: responseData.totalElements,
        totalPages: responseData.totalPages,
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationParams.page, paginationParams.size]);

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
        <Table<PhishingAttempt>
          onChange={onChangePagination}
          pagination={{
            pageSize: paginationParams.size,
            total: paginationStatData.totalElements,
          }}
          rowKey={(row) => row._id}
          columns={columns}
          dataSource={tableData}
        />
      </div>
      <CreateSimulationDialog open={creationDialogOpened} onClose={onClose} onSubmit={onSubmit} />
    </>
  );
}
