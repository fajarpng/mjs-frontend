import { Card, Label, TextInput } from "flowbite-react";
import { type FC } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { changePassword } from "../../api/auth";
import Button from "../../components/button";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { FaSave } from "react-icons/fa";

const ChangePasswordPage: FC = function () {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const mutateChange = useMutation(changePassword);

  const onSubmit = (body: object) => {
    mutateChange.mutate(body, {
      onSuccess: () => {
        navigate("/", { replace: true });
        Swal.fire({
          title: "Sucess!",
          text: "Your password changed successfuly.",
          icon: "success",
        });
      },
    });
  };

  return (
    <NavbarSidebarLayout isFooter={false}>
      <div className="flex h-[calc(100vh-100px)] flex-col items-center justify-center">
        <Card
          horizontal
          className="w-full md:max-w-screen-sm [&>img]:hidden md:[&>img]:w-96 md:[&>img]:p-0 md:[&>*]:w-full md:[&>*]:p-16 lg:[&>img]:block"
        >
          <h1 className="mb-3 text-lg font-bold dark:text-white md:text-3xl">
            Change Password
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2">
              <Label htmlFor="oldPassword" value="Old Password" />
              <TextInput
                {...register("oldPassword", { required: true })}
                placeholder="type old password here..."
                className="my-2"
              />
              {errors["oldPassword"] && (
                <i className=" text-sm text-red-500">
                  please input old password!
                </i>
              )}
            </div>

            <div className="mb-6">
              <Label htmlFor="newPassword" value="New Password" />
              <TextInput
                {...register("newPassword", { required: true })}
                placeholder="type new password here..."
                className="my-2"
              />
              {errors["newPassword"] && (
                <i className=" text-sm text-red-500">
                  please input new password!
                </i>
              )}
            </div>
            <div className="mb-6 mt-4">
              <Button
                type="submit"
                className="w-full bg-primary-500 p-3 text-white hover:bg-primary-600 lg:w-auto"
                leftIcon={<FaSave />}
                isLoading={mutateChange.isLoading}
              >
                Save Change
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </NavbarSidebarLayout>
  );
};

export default ChangePasswordPage;
