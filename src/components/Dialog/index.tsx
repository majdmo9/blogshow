"use client";
import { Dispatch, SetStateAction } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { ExclamationTriangleIcon, ExclamationCircleIcon, CheckCircleIcon, ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  description?: string;
  content?: React.ReactElement;
  confirmBtn?: string;
  cancelBtn?: string;
  variant?: "success" | "warning" | "error" | "info";
  onConfirm: () => void;
  onClose?: () => void;
}

const DialogComponent = ({
  open,
  setOpen,
  title,
  description,
  content,
  confirmBtn,
  cancelBtn,
  variant = "info",
  onConfirm,
  onClose = () => setOpen(false),
}: Props) => {
  const getIconBgColor = () => {
    if (variant === "error") {
      return "bg-red-100 dark:bg-red-300";
    } else if (variant === "success") {
      return "bg-green-100 dark:bg-green-300";
    } else if (variant === "warning") {
      return "bg-yellow-100 dark:bg-yellow-300";
    }
    return "bg-blue-100 dark:bg-blue-300";
  };

  const getIconFillColor = () => {
    if (variant === "error") {
      return "text-red-600";
    } else if (variant === "success") {
      return "text-green-600";
    } else if (variant === "warning") {
      return "text-yellow-600";
    }
    return "text-blue-600";
  };

  const getButtonBgColor = () => {
    if (variant === "error") {
      return "bg-red-600";
    } else if (variant === "success") {
      return "bg-green-600";
    } else if (variant === "warning") {
      return "bg-yellow-600";
    }
    return "bg-blue-600";
  };

  const getButtonHoverBgColor = () => {
    if (variant === "error") {
      return "bg-red-500";
    } else if (variant === "success") {
      return "bg-green-500";
    } else if (variant === "warning") {
      return "bg-yellow-500";
    }
    return "bg-blue500";
  };

  const getIcon = () => {
    if (variant === "error") {
      return <ExclamationCircleIcon className={`h-6 w-6 ${getIconFillColor()}`} aria-hidden="true" />;
    } else if (variant === "success") {
      return <CheckCircleIcon className={`h-6 w-6 ${getIconFillColor()}`} aria-hidden="true" />;
    } else if (variant === "warning") {
      return <ExclamationTriangleIcon className={`h-6 w-6 ${getIconFillColor()}`} aria-hidden="true" />;
    }
    return <ChatBubbleBottomCenterIcon className={`h-6 w-6 ${getIconFillColor()}`} aria-hidden="true" />;
  };

  return (
    <Transition show={open}>
      <Dialog className="relative z-10" onClose={setOpen}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg dark:bg-[#0f172a]  bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="dark:bg-[#0f172a]  bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div
                      className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${getIconBgColor()} sm:mx-0 sm:h-10 sm:w-10`}
                    >
                      {getIcon()}
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                      <DialogTitle as="h3" className="text-base font-semibold leading-6 dark:text-[#ddd] text-gray-900">
                        {title}
                      </DialogTitle>
                      <div className="mt-2">
                        <p className="text-sm dark:text-gray-400 text-gray-500">{description}</p>
                      </div>
                      {content}
                    </div>
                  </div>
                </div>
                <div className="dark:bg-[#0f172a] bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className={`inline-flex w-full justify-center rounded-md ${getButtonBgColor()} px-3 py-2 text-sm font-semibold text-white shadow-sm hover:${getButtonHoverBgColor()} sm:ml-3 sm:w-auto`}
                    onClick={onConfirm}
                  >
                    {confirmBtn ?? "Confirm"}
                  </button>
                  <button
                    type="button"
                    className="dark:bg-[#29303f] transition-all dark:text-white mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset dark:ring-[#29303f] ring-gray-300 hover:dark:bg-[#1f273a] hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => onClose()}
                    data-autofocus
                  >
                    {cancelBtn ?? "Cancel"}
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DialogComponent;
