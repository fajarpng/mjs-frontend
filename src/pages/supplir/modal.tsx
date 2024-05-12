import { Label, Modal, TextInput } from "flowbite-react";
import type { ReactElement } from "react";
import { cloneElement, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/button";

export const ModalAddProduct = ({ children }: { children?: ReactElement }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    reset();
    setOpen(false);
  };
  const onSubmit = (data: object) => {
    console.log(data);

    // mutateLogin.mutate(responseBody, {
    //   onSuccess: (data) => {
    //     if (
    //       data.employee.role === "admin" ||
    //       data.employee.role === "superAdmin"
    //     ) {
    //       navigate("/", { replace: true });
    //       setUser(data);
    //     } else {
    //       Swal.fire({
    //         title: "Access Denied!",
    //         text: "You can not access this page.",
    //         icon: "error",
    //       });
    //     }
    //   },
    // });
  };

  return (
    <div>
      {children && cloneElement(children, { onClick: handleOpen })}
      <Modal show={open} onClose={handleClose}>
        <Modal.Header>Add Employee</Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <div className="mb-2">
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

            <div className="mb-2">
              <Label htmlFor="password" value="Password" />
              <TextInput
                {...register("password", { required: true })}
                placeholder="type password here..."
                type="password"
                className="my-2"
              />
              {errors["password"] && (
                <i className=" text-sm text-red-500">please input nip!</i>
              )}
            </div>

            <div className="mb-2">
              <Label htmlFor="date" value="Birth Date" />
              <TextInput
                {...register("birth", { required: true })}
                type="date"
                className="my-2 max-w-[250px]"
              />
              {errors["birth"] && (
                <i className=" text-sm text-red-500">
                  please input birth date!
                </i>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              className=" bg-blue-500 text-white hover:bg-blue-600"
            >
              Save
            </Button>
            <Button
              onClick={handleClose}
              className=" bg-red-500 text-white hover:bg-red-600"
            >
              Cancel
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};
