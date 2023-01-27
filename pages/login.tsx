import Head from "next/head";
import Loader from "@components/Loader";
import { FormEventHandler, useState } from "react";
export { unauthed as getServerSideProps } from "@lib/auth";

const Login: UnauthedPage = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!loading && username !== "" && password !== "") {
      setError("");
      setLoading(true);
      fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })
        .then((res) =>
          [200, 401].includes(res.status)
            ? res.json()
            : Promise.reject(new Error("Gagal melakukan login"))
        )
        .then((res) => {
          if (res.message && res.message === "OK") {
            window.location.assign("/dashboard");
          } else return Promise.reject(new Error(res.message));
        })
        .catch((err: Error) => {
          setError(err.message || "Gagal melakukan login");
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <>
      <Head>
        <title>Login | Nduoseh</title>
        <meta name="description" content="Nduoseh Login Page" />
      </Head>
      <main>
        <div className="bg-main-100 h-screen overflow-hidden flex items-center justify-center">
          <div className="bg-white lg:w-5/12 md:6/12 w-10/12 shadow-2xl rounded-lg">
            <form className="p-8 md:p-16" onSubmit={submit}>
              {!!error && (
                <p className="text-red-400 text-lg mb-2 md:mb-4 text-center">
                  {error}
                </p>
              )}
              <div className="flex items-center text-lg mb-4 md:mb-6">
                <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
                  <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z" />
                </svg>
                <input
                  type="text"
                  id="username"
                  className="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full rounded"
                  placeholder="Username"
                  autoComplete="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center text-lg mb-4 md:mb-6">
                <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
                  <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" />
                </svg>
                <input
                  type="password"
                  id="password"
                  className="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full rounded"
                  placeholder="Password"
                  autoComplete="current-password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full rounded"
              >
                {loading ? (
                  <Loader className="w-6 h-6 text-white mx-auto" />
                ) : (
                  "Login"
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
