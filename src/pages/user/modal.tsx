import { Button, Label, Modal, TextInput } from "flowbite-react";
import type { FormEvent, ReactElement } from "react";
import { cloneElement, useState } from "react";
import type { TFormDataType } from "../../types";

export const ModalAddEmployee = ({ children }: { children?: ReactElement }) => {
  const [open, setopen] = useState<boolean>(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const responseBody: TFormDataType = {};
    formData.forEach(
      (value, property: string) => (responseBody[property] = value)
    );

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
      {children && cloneElement(children, { onClick: () => setopen(true) })}
      <Modal show={open} onClose={() => setopen(false)}>
        <Modal.Header>Add Employee</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Label htmlFor="email">NIP</Label>
            <TextInput
              required
              id="nip"
              name="nip"
              placeholder="type nip here..."
              type="text"
              className="my-4"
            />
            <Label htmlFor="password">Password</Label>
            <TextInput
              id="password"
              required
              name="password"
              placeholder="type password here..."
              type="password"
              className="my-4"
            />
            <Label htmlFor="birth">Password</Label>
            {/* <Datepicker /> */}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setopen(false)}>Save</Button>
          <Button color="gray" onClick={() => setopen(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
