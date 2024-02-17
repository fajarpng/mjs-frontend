import { Button, Card, Label, TextInput } from "flowbite-react";
import { useEffect, type FC, type FormEvent } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import submitLogin from "../../api/auth";
import { useAuth } from "../../hooks/auth";

const SignInPage: FC = function () {
  const navigate = useNavigate();
  const { setUser, user } = useAuth();
  const mutateLogin = useMutation(submitLogin);

  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutateLogin.mutate(
      { email: "", password: "" },
      {
        onSuccess: (data) => {
          setUser(data);
          navigate("/", { replace: true });
        },
      }
    );
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
        imgSrc="/images/authentication/login.jpg"
        imgAlt=""
        className="w-full md:max-w-screen-sm [&>img]:hidden md:[&>img]:w-96 md:[&>img]:p-0 md:[&>*]:w-full md:[&>*]:p-16 lg:[&>img]:block"
      >
        <h1 className="mb-3 text-2xl font-bold dark:text-white md:text-3xl">
          Sign in
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col gap-y-3">
            <Label htmlFor="email">Your email</Label>
            <TextInput
              id="email"
              name="email"
              placeholder="name@company.com"
              type="email"
            />
          </div>
          <div className="mb-6 flex flex-col gap-y-3">
            <Label htmlFor="password">Your password</Label>
            <TextInput
              id="password"
              name="password"
              placeholder="••••••••"
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
            <Button type="submit" className="w-full lg:w-auto">
              Login to your account
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SignInPage;
