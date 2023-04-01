import React from "react";
import MuiModal from "@mui/material/Modal";

interface Props {
  open: boolean;
}

const Modal = ({ open }: Props) => {
  return (
    <MuiModal open={true}>
      <>Modal</>
    </MuiModal>
  );
};

export default Modal;
