import { Alert } from "@material-tailwind/react";

const AlertComponent = ({
  showAlert,
  closeAlert,
}: {
  showAlert: boolean;
  closeAlert: () => void;
}) => {
  return (
    <div className="flex w-full flex-col gap-2 pt-8">
      <Alert
        color="green"
        variant="outlined"
        open={showAlert}
        onClose={() => closeAlert}
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
      >
        Game saved successfully!
      </Alert>
    </div>
  );
};

export default AlertComponent;
