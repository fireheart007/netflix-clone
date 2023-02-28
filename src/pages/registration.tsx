import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import netflixLogo from "../assets/Netflix_Logo_RGB.png";
import { useAuth } from "../common/auth";

export default function Registration() {
  const { signUp, user } = useAuth();
  const navigate = useNavigate();
  const errorDisplayContainer=useRef<HTMLParagraphElement>(null);

  async function registerUser(event: React.SyntheticEvent) {
    event.preventDefault();
    const { email, password } = event.target as typeof event.target & {
      email: HTMLInputElement;
      password: HTMLInputElement;
    };
    try {
      await signUp(email.value, password.value);
      navigate("/login");
    } catch (error) {
      if (errorDisplayContainer.current) {
        errorDisplayContainer.current.classList.remove("hidden");
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
          onSubmit={registerUser}
          className="relative mx-auto min-h-[83vh] w-[450px] rounded-lg bg-black/70 p-16"
        >
          <article>
            <h1 className="mb-7 text-4xl font-semibold">Sign Up</h1>
            <section className="flex flex-col gap-4">
            <p
                className="hidden rounded-md bg-orange-500 p-2 text-sm"
                ref={errorDisplayContainer}
              >
                Password should be at least 6 characters
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
                Sign Up
              </button>
            </section>
            <p className="text-neutral-500">
              Already have an account
              <Link to="/login" className="ml-1 text-white hover:underline">
                Sign in now
              </Link>
              .
            </p>
          </article>
        </form>
      </main>
    </>
  );
}
