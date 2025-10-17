import { setUser } from "@/store/features/auth/auth.slice";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

interface GoogleAuthButtonProps {
  onSuccess?: (token: string) => void;
  onError?: () => void;
  onOpenChange: (open: boolean) => void
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({
  onSuccess,
  onError,
  onOpenChange

}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async (credentialResponse: any) => {
    const idToken = credentialResponse?.credential;
    console.log(idToken);
    if (!idToken) {
      console.error(" No Google ID Token found");
      toast.error("Google login failed. No ID token found.");
      return;
    }

    try {
      const res = await axios.post(
        `https://indianssydney-backend.onrender.com/auth/google-login`,
        { idToken }
      );

      console.log("raw google login response:", res.data.data);

      const payload = res?.data;

      const token = payload?.data?.token;
      console.log("token", token);
      const user = payload?.data?.user;

      if (!token) {
        console.error("No token in backend response");
        toast.error("Login failed. No token received.");
        onOpenChange(false)
        return;
      }

      //  Update Redux auth slice
      dispatch(
        setUser({
          user,
          token: token,
        })
      );

      console.log("Token saved in Redux:", token);

      if (onSuccess) onSuccess(token);

      toast.success("Login successful! Redirecting...");
      onOpenChange(false)
      setTimeout(() => router.push("/"), 1000);
    } catch (err) {
      console.error(" Google login failed:", err);
      toast.error("Google login failed. Please try again.");
      if (onError) onError();
    }
  };

  return (
    <div className="mt-4">
      <GoogleLogin
        onSuccess={handleLogin}
        onError={() => {
          console.log(" Google Login Failed");
          toast.error("Google login failed. Please try again.");
          if (onError) onError();
        }}
        type="standard"
        theme="outline"
        text="continue_with"
        size="large"
      />
    </div>
  );
};

export default GoogleAuthButton;
