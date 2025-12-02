import {
  ArrowLeftOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { Input } from "antd";
import { useState } from "react";

export default function ChangeEmail({ onBack }) {
  const dataUser = JSON.parse(localStorage.getItem("USER_INFO")) || {};
  const currentEmail = dataUser.email;

  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="text-gray-700">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button onClick={onBack} className="p-1 rounded hover:bg-gray-200">
          <ArrowLeftOutlined />
        </button>
        <h2 className="text-xl font-semibold">Change email address</h2>
      </div>

      {/* Description */}
      <p className="text-sm mb-8">
        Update the email you use for your Todoist account. Your email is
        currently <span className="font-medium">{currentEmail}</span>.
      </p>

      {/* New email */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-1">New email</h3>

        <Input
          value={email1}
          onChange={(e) => setEmail1(e.target.value)}
          className="w-80"
        />
      </div>

      {/* Confirm new email */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-1">Confirm new email</h3>

        <Input
          value={email2}
          onChange={(e) => setEmail2(e.target.value)}
          className="w-80"
        />
      </div>

      {/* Password */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-1">Todoist password</h3>

        <Input.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-80"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />

        <button className="text-sm text-red-500 mt-2 hover:underline">
          Forgot password?
        </button>
      </div>

      {/* Footer buttons */}
      <div className="flex justify-end gap-3 pr-3 mt-10">
        <button
          onClick={onBack}
          className="px-4 py-1.5 rounded border text-sm hover:bg-gray-100"
        >
          Cancel
        </button>

        <button className="px-4 py-1.5 rounded bg-[#f8b4a0] text-white text-sm hover:bg-[#f7a58d]">
          Change email
        </button>
      </div>
    </div>
  );
}
