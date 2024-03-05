import { Button, Card, Label, Spinner, TextInput } from "flowbite-react";
import { useEffect, type FC, type FormEvent } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import submitLogin from "../../api/auth";
import { useAuth } from "../../hooks/auth";
import type { TFormDataType } from "../../types";
import Swal from "sweetalert2";

const SignInPage: FC = function () {
  const navigate = useNavigate();
  const { setUser, user } = useAuth();
  const mutateLogin = useMutation(submitLogin);

  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const responseBody: TFormDataType = {};
    formData.forEach(
      (value, property: string) => (responseBody[property] = value)
    );

    mutateLogin.mutate(responseBody, {
      onSuccess: (data) => {
        if (
          data.employee.role === "admin" ||
          data.employee.role === "superAdmin"
        ) {
          navigate("/", { replace: true });
          setUser(data);
        } else {
          Swal.fire({
            title: "Access Denied!",
            text: "You can not access this page.",
            icon: "error",
          });
        }
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 lg:h-screen lg:gap-y-12">
      <div className="my-6 flex items-center gap-x-1 lg:my-0">
        {/* <img
          alt="Flowbite logo"
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-12"
        /> */}
        <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
          MJS
        </span>
      </div>
      <Card
        horizontal
        className="w-full md:max-w-screen-sm [&>img]:hidden md:[&>img]:w-96 md:[&>img]:p-0 md:[&>*]:w-full md:[&>*]:p-16 lg:[&>img]:block"
      >
        {/* <h1 className="mb-3 text-2xl font-bold dark:text-white md:text-3xl">
          Sign in
        </h1> */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col gap-y-3">
            <Label htmlFor="email">NIP</Label>
            <TextInput
              required
              id="nip"
              name="nip"
              placeholder="type nip here..."
              type="text"
            />
          </div>
          <div className="mb-6 flex flex-col gap-y-3">
            <Label htmlFor="password">Password</Label>
            <TextInput
              id="password"
              required
              name="password"
              placeholder="type password here..."
              type="password"
            />
          </div>
          {/* <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-x-3">
              <Checkbox id="rememberMe" name="rememberMe" />
              <Label htmlFor="rememberMe">Remember me</Label>
            </div>
            <a href="#" className="w-1/2 text-right text-sm text-primary-600 dark:text-primary-300" >
              Lost Password?
            </a>
          </div> */}
          <div className="mb-6">
            <Button
              type="submit"
              className="w-full lg:w-auto"
              disabled={mutateLogin.isLoading}
            >
              {mutateLogin.isLoading && <Spinner className="mr-2" />} Login to
              your account
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SignInPage;
