// import { useDispatch } from "react-redux";
// import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    // dispatch(login({ name: "Demo User" }));
    navigate("/");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="p-8 bg-white dark:bg-gray-800 rounded shadow w-96">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white">
          Signup
        </h1>
        <button
          onClick={handleLogin}
          className="w-full bg-brand text-white py-2 rounded hover:bg-blue-500"
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default Signup;
