import React, { useState } from "react";
import {
  Card,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { login } from "@/store/user";
import { showNotification } from "@/utils/showNotification";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
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
      </CardBody>
    </Card>
  );
};

export default LoginCard;
