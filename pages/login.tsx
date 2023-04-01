import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import useAuth from "../hooks/useAuth";

interface Inputs {
  email: string;
  password: string;
}

const login = () => {
  const [login, setLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    useAuth({ login, email, password, setLoading, dispatch, router });
  };

  return (
    <div className="relative h-screen w-screen pt-24 px-4">
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Background image of the page */}
      <Image
        src="/netflix.jpg"
        fill
        alt="background"
        className="-z-10 opacity-50 object-cover"
      />

      {/*Netflix Logo */}
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        width={100}
        height={27}
        className="cursor-pointer absolute top-4 left-4"
        alt="netflix-logo"
        priority
      />

      {/* SignUp Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 sm:max-w-md sm:mx-auto bg-black/75 rounded-md p-6"
      >
        {/* Form Title */}
        <h1 className="sm:text-2xl font-semibold">Sign In</h1>

        {/* Form Inputs */}
        <div className="flex flex-col gap-3">
          <label>
            <input
              type="email"
              placeholder="Email"
              className={`input-custom ${
                errors.email ? "border-b-4 border-b-red-600" : ""
              }`}
              {...register("email", { required: true })}
            />
          </label>
          <label>
            <input
              type="password"
              placeholder="Password"
              className={`input-custom ${
                errors.password ? "border-b-4 border-b-red-600" : ""
              }`}
              {...register("password", { required: true })}
            />
          </label>
        </div>

        {/* Form Buttons */}
        <div>
          {/* Sign In button */}
          <button
            className={`relative w-full rounded ${
              loading && login ? "bg-gray-500" : "bg-[#e50914]"
            } py-3 font-semibold`}
            onClick={() => setLogin(true)}
          >
            {loading && login ? (
              <Spinner className="absolute inset-0 flex items-center justify-center" />
            ) : (
              ""
            )}
            <span className={`${loading && login ? "text-gray-400" : ""}`}>
              Sign In
            </span>
          </button>

          {/* Sign Up button */}
          <div>
            <span className="text-gray-400">New to netflix?</span>
            <button onClick={() => setLogin(false)} className="relative p-2">
              {loading && !login ? (
                <Spinner className="absolute inset-0 flex items-center justify-center" />
              ) : (
                ""
              )}
              <span className={`${loading && !login ? "text-gray-500" : ""}`}>
                Sign up
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default login;
