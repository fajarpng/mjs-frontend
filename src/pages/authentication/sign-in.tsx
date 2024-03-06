import { Card, Label, Spinner, TextInput } from "flowbite-react";
import { useEffect, type FC } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import submitLogin from "../../api/auth";
import { useAuth } from "../../hooks/auth";
import Button from "../../components/button";

const SignInPage: FC = function () {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { setUser, user } = useAuth();
  const mutateLogin = useMutation(submitLogin);

  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);

  const onSubmit = (body: object) => {
    mutateLogin.mutate(body, {
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <Label htmlFor="email">NIP</Label>
            <TextInput
              {...register("nip", { required: true })}
              placeholder="type nip here..."
              className="my-2"
            />
            {errors["nip"] && (
              <i className=" text-sm text-red-500">please input nip!</i>
            )}
          </div>

          <div className="mb-6">
            <Label htmlFor="password">Password</Label>
            <TextInput
              {...register("password", { required: true })}
              placeholder="type password here..."
              type="password"
              className="my-2"
            />
            {errors["password"] && (
              <i className=" text-sm text-red-500">please input password!</i>
            )}
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
              className="w-full bg-primary-500 text-white hover:bg-primary-600 lg:w-auto"
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
