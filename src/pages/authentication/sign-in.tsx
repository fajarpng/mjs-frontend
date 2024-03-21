import { Card, Label, TextInput } from "flowbite-react";
import { useEffect, type FC } from "react";
import { useForm } from "react-hook-form";
import { FaSignInAlt } from "react-icons/fa";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { submitLogin } from "../../api/auth";
import Button from "../../components/button";
import { useAuth } from "../../hooks/auth";

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
        <img
          src="/images/logo-blue.png"
          alt="kizoku logo"
          className="w-[200px] object-contain dark:hidden"
        />
        <img
          src="/images/logo-white.png"
          alt="kizoku logo"
          className="hidden w-[200px] object-contain dark:block"
        />
      </div>
      <Card className="w-full p-8 md:max-w-screen-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div>
            <Label htmlFor="email" value="NIP" />
            <TextInput
              {...register("nip", { required: true })}
              placeholder="type nip here..."
              className="my-2"
            />
            {errors["nip"] && (
              <i className=" text-sm text-red-500">please input nip!</i>
            )}
          </div>

          <div>
            <Label htmlFor="password" value="Password" />
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

          <div>
            <Button
              type="submit"
              className="w-full bg-primary-500 p-3 text-white hover:bg-primary-600 lg:w-auto"
              leftIcon={<FaSignInAlt />}
              isLoading={mutateLogin.isLoading}
            >
              Login to your account
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SignInPage;
