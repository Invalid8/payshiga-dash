import React, { useState } from "react";
import {
  Card,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { login } from "@/store/features/user";
import { showNotification } from "@/utils/showNotification";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/utils/hooks";

const LoginCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      dispatch(login({ email, password }));
      showNotification("success", "top-right", undefined, {
        message: "Login Successful",
      });
      navigate(0);
    } catch (error) {
      if (error instanceof Error)
        showNotification("error", "top-right", undefined, {
          message: error?.message ?? "Something went wrong",
        });
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <Card className="w-full max-w-sm mx-auto shadow-lg bg-white rounded-lg relative">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="text-center mb-4">
          Login to Your Account
        </Typography>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              crossOrigin={"x"}
            />
          </div>
          <div className="mb-4">
            <Input
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              crossOrigin={"x"}
            />
          </div>
          <Button type="submit" className="w-full" loading={loading}>
            Login
          </Button>
        </form>
        <div className="ring-1 bg-blue-gray-500/10 rounded-lg p-4 mt-4">
          <ul>
            <li>
              <strong>Username:</strong> user1@payshiga.com
            </li>
            <li>
              <strong>Password:</strong> payshiga
            </li>
          </ul>
        </div>
      </CardBody>
    </Card>
  );
};

export default LoginCard;
