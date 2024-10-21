import React, { useState } from "react";
import {
  Card,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { login } from "@/store/user";

const LoginCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    login({ email, password }); // Call the login handler passed as prop
    setLoading(false);
  };

  return (
    <Card
      className="w-full max-w-sm mx-auto shadow-lg bg-white rounded-lg relative"
      placeholder={() => {}}
      onPointerEnterCapture={() => {}}
      onPointerLeaveCapture={() => {}}
    >
      <CardBody
        placeholder={() => {}}
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      >
        <Typography
          variant="h5"
          color="blue-gray"
          className="text-center mb-4"
          placeholder={() => {}}
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
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
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
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
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
              crossOrigin={"x"}
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            loading={loading}
            placeholder={() => {}}
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            Login
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default LoginCard;
