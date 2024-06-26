import Loader from "@blogshow/components/Loader";
import { CircularProgress } from "@mui/material";

const LoadingPage = () => {
  return (
    <section className="min-h-[calc(100vh-375px)] flex items-center justify-center">
      <Loader />
    </section>
  );
};

export default LoadingPage;
