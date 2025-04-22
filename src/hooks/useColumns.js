import { useMediaQuery } from "@mantine/hooks";

export const useColumns = (maxColumns) => {
  const isMd = useMediaQuery("(min-width: 768px)");
  const isLg = useMediaQuery("(min-width: 992px)");
  const isXl = useMediaQuery("(min-width: 1200px)");

  let columns = 1;
  if (isMd) columns = 2;
  if (isLg) columns = Math.min(maxColumns, 3);
  if (isXl) columns = Math.min(maxColumns, 4);

  return columns;
};
