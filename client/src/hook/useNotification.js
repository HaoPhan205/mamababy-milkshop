import { toast } from "react-toastify";

const useNotification = () => {
  const notifySuccess = (message) => {
    toast.success(message);
  };

  const notifyError = (message) => {
    toast.error(message);
  };

  return {
    notifySuccess,
    notifyError,
  };
};

export default useNotification;
