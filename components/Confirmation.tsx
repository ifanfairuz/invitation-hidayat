import { useEffect, useState } from "react";
import { FC } from "react";
import { confirmAlert } from "react-confirm-alert";
import Loader from "./Loader";

interface ConfirmationProps {
  title: string;
  message?: string;
  abort?: string;
  confirm?: string;
  onClose: () => void;
  onAbort?: () => void;
  onConfirm?: () => Promise<void>;
}
const Confirmation: FC<ConfirmationProps> = ({
  title,
  message,
  confirm,
  abort,
  onAbort,
  onClose,
  onConfirm,
}) => {
  const [loading, setLoading] = useState(false);

  const onAbortClick: ButtonProps["onClick"] = (e) => {
    e.preventDefault();
    onAbort && onAbort();
    onClose();
  };
  const onConfirmClick: ButtonProps["onClick"] = (e) => {
    e.preventDefault();
    onConfirm &&
      onConfirm()
        .then(() => {
          onClose();
        })
        .catch(() => {
          setLoading(false);
        });
  };

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <div className="fixed w-screen h-screen bg-black/20 top-0 left-0 overflow-y-auto px-2">
      <div className="p-4 bg-white max-w-xl mx-auto my-[10vh] rounded-lg">
        <h3 className="text-xl">{title}</h3>
        <p className="opacity-70 text-md">{message}</p>
        <div className="mt-8 flex items-center justify-between">
          <button
            type="submit"
            className="bg-gray-100 text-gray-700 hover:bg-gray-300 rounded-full px-6"
            onClick={onAbortClick}
          >
            {abort || "Batal"}
          </button>
          <button
            type="submit"
            className="bg-main-400 text-main-00 hover:bg-main-500 rounded-full px-6 inline-flex items-center"
            onClick={onConfirmClick}
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 -ml-2 mr-2" />
                loading
              </>
            ) : (
              confirm || "Ya"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export const confirmation = ({
  ...props
}: Omit<ConfirmationProps, "onClose">) => {
  confirmAlert({
    customUI: ({ onClose }) => <Confirmation {...props} onClose={onClose} />,
  });
};

export default Confirmation;
