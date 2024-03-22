import dayjs from "dayjs";
import { Label, Modal, Select, TextInput, Textarea } from "flowbite-react";
import type { ReactElement } from "react";
import { cloneElement, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import {
  addEmployee,
  deleteEmployee,
  updateEmployee,
} from "../../api/employee";
import Button from "../../components/button";
import { useAuth } from "../../hooks/auth";
import { useDetailEmployee } from "../../hooks/employee";
import type { TEmployee } from "../../types";
import { CardDetailEmployee } from "./cardDetail";

interface TModalEmployee {
  children?: ReactElement;
  data?: TEmployee;
  refetch: () => void;
}

export const ModalAddEmployee = ({ children, refetch }: TModalEmployee) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const mutateAdd = useMutation(addEmployee);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit = (body: any) => {
    body.password = body.nip;
    body.birthDate = dayjs(body.birthDate).format();
    if (body.joinDate) {
      body.joinDate = dayjs(body.joinDate).format();
    }

    mutateAdd.mutate(body, {
      onSuccess: () => {
        handleClose();
        refetch();
      },
    });
  };

  return (
    <div>
      {children && cloneElement(children, { onClick: handleOpen })}
      <Modal show={open} onClose={handleClose}>
        <Modal.Header>Add Employee</Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <div className="mb-2">
              <Label htmlFor="nip" value="NIP" />
              <TextInput
                {...register("nip", { required: true })}
                placeholder="type nip here..."
                type="number"
                className="my-2"
              />
              {errors["nip"] && (
                <i className=" text-sm text-red-500">please input nip!</i>
              )}
            </div>

            <div className="mb-2">
              <Label htmlFor="nik" value="NIK" />
              <TextInput
                {...register("nik", { required: true })}
                placeholder="type nik here..."
                type="number"
                className="my-2"
              />
              {errors["nik"] && (
                <i className=" text-sm text-red-500">please input nik!</i>
              )}
            </div>

            <div className="mb-2">
              <Label htmlFor="name" value="Full Name" />
              <TextInput
                {...register("name", { required: true })}
                placeholder="type full name here..."
                className="my-2"
              />
              {errors["name"] && (
                <i className=" text-sm text-red-500">please input nik!</i>
              )}
            </div>

            <div className="mb-2 flex justify-between gap-2">
              <div className="flex-1">
                <Label htmlFor="email" value="Email" />
                <TextInput
                  {...register("email")}
                  placeholder="type email here..."
                  type="email"
                  className="my-2"
                />
                {errors["email"] && (
                  <i className=" text-sm text-red-500">please input email!</i>
                )}
              </div>
              <div className="flex-1">
                <Label htmlFor="phone" value="Phone Number" />
                <TextInput
                  {...register("phone", { required: true })}
                  className="my-2"
                  placeholder="type phone number here..."
                />
                {errors["phone"] && (
                  <i className=" text-sm text-red-500">
                    please input phone number!
                  </i>
                )}
              </div>
            </div>

            <div className="mb-2">
              <Label htmlFor="address">Adress</Label>
              <Textarea
                {...register("address")}
                placeholder="type address here..."
                className="my-2"
              />
            </div>

            <div className="mb-2 flex justify-between gap-2">
              <div className="flex-1">
                <Label htmlFor="religion" value="Religion" />
                <Select
                  {...register("religion", { required: true })}
                  className="my-2"
                >
                  <option value="" disabled selected>
                    select religion
                  </option>
                  <option>Islam</option>
                  <option>Kristen</option>
                  <option>Katolik</option>
                  <option>Hindu</option>
                  <option>Buddha</option>
                  <option>Khonghucu</option>
                </Select>
                {errors["religion"] && (
                  <i className=" text-sm text-red-500">
                    please select religion!
                  </i>
                )}
              </div>
              <div className="flex-1">
                {user?.role === "superAdmin" && (
                  <>
                    <Label htmlFor="role">
                      Role
                      <span className=" italic text-gray-400">
                        ( Only visible for Super Admin )
                      </span>
                    </Label>
                    <Select
                      {...register("role", { required: true })}
                      className="my-2"
                    >
                      <option>staff</option>
                      <option>admin</option>
                      <option>super admin</option>
                    </Select>
                    {errors["role"] && (
                      <i className=" text-sm text-red-500">
                        please select role!
                      </i>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="mb-2 flex justify-between gap-2">
              <div className="flex-1">
                <Label htmlFor="birthDate" value="Birth Date" />
                <TextInput
                  {...register("birthDate", { required: true })}
                  type="date"
                  className="my-2"
                />
                {errors["birthDate"] && (
                  <i className=" text-sm text-red-500">
                    please input birth date!
                  </i>
                )}
              </div>
              <div className="flex-1">
                <Label htmlFor="joinDate" value="Join Date" />
                <TextInput
                  {...register("joinDate")}
                  type="date"
                  className="my-2"
                />
                {errors["joinDate"] && (
                  <i className=" text-sm text-red-500">
                    please input join date!
                  </i>
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              isLoading={mutateAdd.isLoading}
              className=" bg-blue-500 text-white hover:bg-blue-600"
            >
              Save
            </Button>
            <Button
              onClick={handleClose}
              isLoading={mutateAdd.isLoading}
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

export const ModalUpdateEmployee = ({
  children,
  data,
  refetch,
}: TModalEmployee) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { user } = useAuth();
  const { refetch: refetchDetail } = useDetailEmployee(data?.id);
  const mutateUpdate = useMutation(updateEmployee);

  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    if (data) {
      Object.keys(data).forEach((key: string) => {
        setValue(key, data[key as keyof TEmployee]);
      });

      data.birthDate &&
        setValue("birthDate", dayjs(data.birthDate).format("YYYY-MM-DD"));
      data.joinDate &&
        setValue("joinDate", dayjs(data.joinDate).format("YYYY-MM-DD"));
    }
    setOpen(true);
  };
  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit = (body: any) => {
    body.birthDate = dayjs(body.birthDate).format();
    if (body.joinDate) {
      body.joinDate = dayjs(body.joinDate).format();
    }

    mutateUpdate.mutate(
      { id: data?.id, ...body },
      {
        onSuccess: () => {
          handleClose();
          refetch();
          refetchDetail();
        },
      }
    );
  };

  const onResetPassword = () => {
    const body = { password: data?.nip };
    mutateUpdate.mutate(
      { id: data?.id, ...body },
      {
        onSuccess: () => {
          Swal.fire({
            title: "Sucess!",
            text: "The password has been successfully reset!",
            icon: "success",
          });
        },
      }
    );
  };

  return (
    <div>
      {children && cloneElement(children, { onClick: handleOpen })}
      <Modal show={open} onClose={handleClose}>
        <Modal.Header>Edit Employee</Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <div className="mb-2">
              <Label htmlFor="nip" value="NIP" />
              <TextInput
                {...register("nip", { disabled: true })}
                placeholder="type nip here..."
                className="my-2"
              />
            </div>

            <div className="mb-2">
              <Label htmlFor="nik" value="NIK" />
              <TextInput
                {...register("nik", { required: true })}
                placeholder="type nik here..."
                className="my-2"
              />
              {errors["nik"] && (
                <i className=" text-sm text-red-500">please input nik!</i>
              )}
            </div>

            <div className="mb-2">
              <Label htmlFor="name" value="Full Name" />
              <TextInput
                {...register("name", { required: true })}
                placeholder="type full name here..."
                className="my-2"
              />
              {errors["name"] && (
                <i className=" text-sm text-red-500">please input nik!</i>
              )}
            </div>

            <div className="mb-2 flex justify-between gap-2">
              <div className="flex-1">
                <Label htmlFor="email" value="Email" />
                <TextInput
                  {...register("email")}
                  placeholder="type email here..."
                  type="email"
                  className="my-2"
                />
                {errors["email"] && (
                  <i className=" text-sm text-red-500">please input email!</i>
                )}
              </div>
              <div className="flex-1">
                <Label htmlFor="phone" value="Phone Number" />
                <TextInput
                  {...register("phone", { required: true })}
                  className="my-2"
                  placeholder="type phone number here..."
                />
                {errors["phone"] && (
                  <i className=" text-sm text-red-500">
                    please input phone number!
                  </i>
                )}
              </div>
            </div>

            <div className="mb-2">
              <Label htmlFor="address">Adress</Label>
              <Textarea
                {...register("address")}
                placeholder="type address here..."
                className="my-2"
              />
            </div>

            <div className="mb-2 flex justify-between gap-2">
              <div className="flex-1">
                <Label htmlFor="religion" value="Religion" />
                <Select
                  {...register("religion", { required: true })}
                  className="my-2"
                >
                  <option>Islam</option>
                  <option>Kristen</option>
                  <option>Katolik</option>
                  <option>Hindu</option>
                  <option>Buddha</option>
                  <option>Khonghucu</option>
                </Select>
                {errors["religion"] && (
                  <i className=" text-sm text-red-500">
                    please select religion!
                  </i>
                )}
              </div>
              <div className="flex-1">
                {user?.role === "superAdmin" && (
                  <>
                    <Label htmlFor="role">
                      Role
                      <span className=" italic text-gray-400">
                        ( Only visible for Super Admin )
                      </span>
                    </Label>
                    <Select
                      {...register("role", { required: true })}
                      className="my-2"
                    >
                      <option value="staff">Staff</option>
                      <option value="admin">Admin</option>
                      <option value="superAdmin">Super Admin</option>
                    </Select>
                    {errors["role"] && (
                      <i className=" text-sm text-red-500">
                        please select role!
                      </i>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="mb-2 flex justify-between gap-2">
              <div className="flex-1">
                <Label htmlFor="birthDate" value="Birth Date" />
                <TextInput
                  {...register("birthDate", { required: true })}
                  type="date"
                  className="my-2"
                />
                {errors["birthDate"] && (
                  <i className=" text-sm text-red-500">
                    please input birth date!
                  </i>
                )}
              </div>
              <div className="flex-1">
                <Label htmlFor="joinDate" value="Join Date" />
                <TextInput
                  {...register("joinDate")}
                  type="date"
                  className="my-2"
                />
                {errors["joinDate"] && (
                  <i className=" text-sm text-red-500">
                    please input join date!
                  </i>
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="flex justify-between">
            {user?.role === "superAdmin" && (
              <Button
                onClick={onResetPassword}
                isLoading={mutateUpdate.isLoading}
                className=" border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
              >
                Reset Password
              </Button>
            )}
            <div className="flex gap-2">
              <Button
                type="submit"
                isLoading={mutateUpdate.isLoading}
                className=" bg-blue-500 text-white hover:bg-blue-600"
              >
                Save Changes
              </Button>
              <Button
                onClick={handleClose}
                isLoading={mutateUpdate.isLoading}
                className=" bg-red-500 text-white hover:bg-red-600"
              >
                Cancel
              </Button>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export const ModalDeleteEmployee = ({
  children,
  data,
  refetch,
}: TModalEmployee) => {
  const mutateDelete = useMutation(deleteEmployee);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = () => {
    mutateDelete.mutate(data?.id, {
      onSuccess: () => {
        handleClose();
        refetch();
      },
    });
  };

  return (
    <div>
      {children && cloneElement(children, { onClick: handleOpen })}
      <Modal show={open} onClose={handleClose}>
        <Modal.Header>Delete Employee</Modal.Header>
        <Modal.Body>Do You Want to delete this employee?</Modal.Body>
        <Modal.Footer>
          <Button
            onClick={onSubmit}
            isLoading={mutateDelete.isLoading}
            className=" bg-blue-500 text-white hover:bg-blue-600"
          >
            Delete
          </Button>
          <Button
            onClick={handleClose}
            isLoading={mutateDelete.isLoading}
            className=" bg-red-500 text-white hover:bg-red-600"
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export const ModalDetailEmployee = ({ children, data }: TModalEmployee) => {
  const { data: _dt, refetch } = useDetailEmployee(data?.id);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    !_dt && refetch();
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const detailsEmployee = useMemo(() => _dt ?? data, [_dt, data]);

  return (
    <div>
      {children && cloneElement(children, { onClick: handleOpen })}
      <Modal show={open} onClose={handleClose}>
        <Modal.Header>Detail Employee</Modal.Header>
        <Modal.Body>
          {detailsEmployee && <CardDetailEmployee data={detailsEmployee} />}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={handleClose}
            className=" bg-red-500 text-white hover:bg-red-600"
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
