import { ReactElement } from "react";
import { Tooltip } from "@mui/material";

interface Props {
  message: string;
  children: ReactElement;
}

const ButtonMessage = ({ message, children }: Props) => {
  return (
    <>
      <Tooltip title="hello">{children}</Tooltip>
    </>
  );
};

export default ButtonMessage;
