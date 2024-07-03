"use client";
import { useState } from "react";
import { CheckIcon, PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "@mui/material";
import DialogComponent from "../Dialog";

interface Props {
  onDelete: () => void;
  onEdit: () => void;
  editMode: boolean;
  isDirty: boolean;
  deleteMessage: string;
}

const EditDeleteControls = ({ onEdit, onDelete, editMode, isDirty, deleteMessage }: Props) => {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <div className="flex min-h-9 max-w-20 items-center justify-between gap-6">
      <Tooltip title="Delete">
        <button onClick={() => setOpenDialog(true)} className="flex w-6 h-6 hover:h-7 hover:w-7 transition-all">
          <TrashIcon />
        </button>
      </Tooltip>
      <Tooltip title="Edit">
        <button type="submit" onClick={onEdit} className="flex w-6 h-6 hover:h-7 hover:w-7 transition-all">
          {editMode ? isDirty ? <CheckIcon /> : <XMarkIcon /> : <PencilIcon />}
        </button>
      </Tooltip>
      <DialogComponent title="DELETE" description={deleteMessage} onConfirm={onDelete} variant="error" open={openDialog} setOpen={setOpenDialog} />
    </div>
  );
};
export default EditDeleteControls;
