import { Alert } from "@material-tailwind/react";
import { useEffect } from "react";

const AlertComponent = ({
  showAlert,
  hideAlert,
  color,
  message,
}: {
  showAlert: boolean;
  hideAlert: () => void;
  color: "red" | "green" | "blue" | "orange" | "indigo" | "gray" | "yellow";
  message: string;
}) => {
  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        hideAlert();
      }, 3000);
    }
  }, [showAlert]);

  return (
    <div className="flex w-full flex-col gap-2 pt-8">
      <Alert
        color={color}
        variant="outlined"
        open={showAlert}
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
      >
        {message}
      </Alert>
    </div>
  );
};

export default AlertComponent;
