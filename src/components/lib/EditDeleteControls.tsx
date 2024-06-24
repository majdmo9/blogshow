import { CheckIcon, PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "@mui/material";
import React from "react";

interface Props {
  onDelete: () => void;
  onEdit: () => void;
  editMode: boolean;
  isDirty: boolean;
}

const EditDeleteControls = ({ onEdit, onDelete, editMode, isDirty }: Props) => {
  return (
    <div className="flex min-h-9 max-w-20 items-center justify-between gap-6">
      <Tooltip title="Delete">
        <button onClick={onDelete} className="flex w-6 h-6 hover:h-7 hover:w-7 transition-all">
          <TrashIcon />
        </button>
      </Tooltip>
      <Tooltip title="Edit">
        <button type="submit" onClick={onEdit} className="flex w-6 h-6 hover:h-7 hover:w-7 transition-all">
          {editMode ? isDirty ? <CheckIcon /> : <XMarkIcon /> : <PencilIcon />}
        </button>
      </Tooltip>
    </div>
  );
};
export default EditDeleteControls;
