import React, { FormEvent, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import netflixLogo from "../assets/Netflix_Logo_RGB.png";
import { useAuth } from "../common/auth";

export default function Login() {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const errorMessageContainer = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  async function authenticateUser(event: React.SyntheticEvent) {
    event.preventDefault();
    const { email, password } = event.target as typeof event.target & {
      email: HTMLInputElement;
      password: HTMLInputElement;
    };
    try {
      await signIn(email.value, password.value);
    } catch (error) {
      if (errorMessageContainer.current) {
        errorMessageContainer.current.classList.remove("hidden");
      }
    }
  }

  return (
    <>
      <header className="relative z-[1] w-52">
        <img className="h-full w-full" src={netflixLogo} alt="Netflix Logo" />
      </header>
      <main>
        <section
          className={`absolute top-0 -z-[1] min-h-screen w-full bg-[url("/netflix-cover.jpeg")] bg-cover`}
        ></section>
        <section className="absolute inset-0 bg-black/60"></section>
        <form
          onSubmit={authenticateUser}
          className="relative mx-auto min-h-[83vh] w-[450px] rounded-lg bg-black/70 p-16"
        >
          <article>
            <h1 className="mb-7 text-4xl font-semibold">Sign In</h1>
            <section className="flex flex-col gap-4">
              <p
                className="hidden rounded-md bg-orange-500 p-2 text-sm"
                ref={errorMessageContainer}
              >
                Sorry, invalid email address or password. Please try again
              </p>
              <input
                className=" h-[50px] rounded-md bg-gray-secondary p-4 outline-none"
                type="email"
                name="email"
                id="email"
                required
                placeholder="Email or phone number"
              />
              <input
                className=" h-[50px] rounded-md bg-gray-secondary p-4 outline-none"
                type="password"
                name="password"
                id="password"
                required
                placeholder="Password"
              />
              <button className="my-8 flex h-[50px] justify-center rounded-md bg-netflixRed p-4 font-semibold outline-none">
                Sign In
              </button>
            </section>
            <p className="text-neutral-500">
              New to Netflix?
              <Link to="/signup" className="ml-1 text-white hover:underline">
                Sign up now
              </Link>
              .
            </p>
          </article>
        </form>
      </main>
    </>
  );
}
