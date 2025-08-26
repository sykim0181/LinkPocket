import { cn } from "@/lib/utils";
import { Spinner, SpinnerProps } from "../ui/shadcn-io/spinner";

interface LoadingProps {
  showOverlay?: boolean;
  spinnerProps?: SpinnerProps;
}

const Loading = ({ showOverlay, spinnerProps }: LoadingProps) => {
  return (
    <div
      className={cn(
        "absolute inset-0 w-full h-full flex justify-center items-center pointer-events-none",
        showOverlay && "bg-gray-200/50"
      )}
    >
      <Spinner {...spinnerProps} />
    </div>
  );
};

export default Loading;
