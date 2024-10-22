import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to the Payshiga
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Manage all your payments and transactions in one place.
        </p>
        <button
          onClick={goToDashboard}
          className="bg-primary text-white font-bold py-2 px-4 rounded"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Home;
