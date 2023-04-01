import { NextRouter } from "next/router";
import { toast } from "react-toastify";
import { userLogin } from "../features/loginStatus/loginStatusSlice";

interface Props {
  login: boolean;
  email: string;
  password: string;
  setLoading: (loading: boolean) => void;
  dispatch: any;
  router: NextRouter;
}

const useAuth = async ({
  login,
  password,
  email,
  setLoading,
  dispatch,
  router,
}: Props) => {
  setLoading(true);
  if (login) {
    await fetch("/api/readDocument", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.user === null) {
          toast.error("Sorry! User not found");
        } else {
          toast.success("Successful Sign in");
          dispatch(userLogin(data.user._id));
          router.push("/");
        }
      });
  } else {
    await fetch("/api/insertDocument", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.user === null) {
          toast.error("User already exists!");
        } else {
          toast.success("Successful Sign up");
          dispatch(userLogin(data.user._id));
          router.push("/");
        }
      });
  }
};

export default useAuth;
