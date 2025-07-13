import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col justify-center">
      <main className="flex flex-col items-center text-center px-4 py-20 max-w-4xl mx-auto">
        <div className="flex items-center text-2xl font-extrabold">
          <span className="text-primary">_</span>
          <span>flowbiz</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 leading-tight">
          Orchestrate workflows like never before
        </h1>

        <p className="text-lg text-gray-600 mt-6">
          Design, deploy, and scale AI workflows—faster and easier than ever.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Button
            variant="primary"
            onClick={() => navigate("/project/1")}
            className="text-lg px-6 h-12"
          >
            Get Started
          </Button>
        </div>
      </main>
    </div>
  );
}
