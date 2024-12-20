import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  initialPaginationParams,
} from "@/constants/pagination";
import { useCallback, useMemo, useState } from "react";

const initalPaginationStatData = {
  totalPages: 0,
  totalElements: 0,
};

export const usePagination = (initialParams = initialPaginationParams) => {
  const [paginationParams, setPaginationParams] = useState<TPaginationParams>(initialParams);
  const [paginationStatData, setPaginationStatData] = useState(initalPaginationStatData);

  const onChangePagination = useCallback(
    ({ current = DEFAULT_PAGE_NUMBER, pageSize = DEFAULT_PAGE_SIZE }: TPageChangeParams) => {
      setPaginationParams({
        page: current,
        size: pageSize,
      });
    },
    []
  );

  const resetPagination = useCallback(() => {
    setPaginationParams(initialParams);
    setPaginationStatData(initalPaginationStatData);
  }, [initialParams]);

  const updatePaginationData = (statData: typeof paginationStatData) => {
    setPaginationStatData((d) => {
      return {
        ...d,
        ...statData,
      };
    });
  };

  const startNumber = useMemo(
    () => (paginationParams.page - 1) * paginationParams.size + 1,
    [paginationParams]
  );

  const endNumber = useMemo(
    () => Math.min(startNumber + paginationParams.size - 1, paginationStatData.totalElements),
    [startNumber, paginationParams.size, paginationStatData.totalElements]
  );

  return {
    paginationParams,
    paginationStatData,
    startNumber,
    endNumber,
    onChangePagination,
    resetPagination,
    updatePaginationData,
  };
};

export type TPaginationParams = {
  page: number;
  size: number;
};

export type TPageChangeParams = {
  current?: number;
  pageSize?: number;
};

export type TUpdatePaginationDataParams = {
  totalPages?: number;
  totalItems?: number;
};
