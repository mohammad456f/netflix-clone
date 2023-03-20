import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface Inputs {
  email: string;
  password: string;
}

const login = () => {
  const [login, setLogin] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      // await signIn(email, password);
    } else {
      // await signUp(email, password);
    }
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
        <button
          className="w-full rounded bg-[#e50914] py-3 font-semibold"
          onClick={() => setLogin(true)}
        >
          Sign In
        </button>
        <div>
          <span className="text-gray-400">New to netflix? </span>
          <button className="hover:underline" onClick={() => setLogin(false)}>
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default login;
