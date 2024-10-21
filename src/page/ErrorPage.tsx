import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as { statusText?: string; message?: string };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">
          {error?.statusText}
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Oops! Something went wrong.
        </h2>
        <p className="text-gray-600 mb-6">
          Sorry, an unexpected error has occurred.
        </p>
        <p className="text-sm text-gray-500 italic mb-8">{error?.message}</p>
        <Link to="/">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">
            Back to Home
          </button>
        </Link>
      </div>
      <div className="mt-8 text-gray-500">
        <p>&copy; {new Date().getFullYear()} Payshiga</p>
      </div>
    </div>
  );
}
