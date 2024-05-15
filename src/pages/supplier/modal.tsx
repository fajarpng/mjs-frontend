import { Label, Modal, TextInput } from "flowbite-react";
import type { ReactElement } from "react";
import { cloneElement, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import {
  addSupplier,
  deleteSupplier,
  updateSupplier,
} from "../../api/supplier";
import Button from "../../components/button";
import type { TSupplier } from "../../types";

interface TModalSupplier {
  children?: ReactElement;
  data?: TSupplier;
  refetch: () => void;
}

export const ModalAddSupplier = ({ children, refetch }: TModalSupplier) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const mutauteAdd = useMutation(addSupplier);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit = (body: any) => {
    mutauteAdd.mutate(body, {
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
        <Modal.Header>Add Supplier</Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body className="grid grid-cols-2 gap-2">
            <div className="col-span-2">
              <Label htmlFor="supplierName" value="Name" />
              <TextInput
                {...register("supplierName", { required: true })}
                placeholder="type name here..."
                className="my-2"
              />
              {errors["supplierName"] && (
                <i className=" text-sm text-red-500">please input name!</i>
              )}
            </div>

            <div className="col-span-2">
              <Label htmlFor="supplierCode" value="Code" />
              <TextInput
                {...register("supplierCode", { required: true })}
                placeholder="type code here..."
                className="my-2"
              />
              {errors["supplierCode"] && (
                <i className=" text-sm text-red-500">please input code!</i>
              )}
            </div>

            <div className="col-span-2">
              <Label htmlFor="phone" value="Phone" />
              <TextInput
                {...register("phone", { required: true })}
                placeholder="type phone here..."
                className="my-2"
              />
              {errors["phone"] && (
                <i className=" text-sm text-red-500">please input phone!</i>
              )}
            </div>

            <div className="col-span-2">
              <Label htmlFor="address" value="Address" />
              <TextInput
                {...register("address", { required: true })}
                placeholder="type address here..."
                className="my-2"
              />
              {errors["address"] && (
                <i className=" text-sm text-red-500">please input address!</i>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              isLoading={mutauteAdd.isLoading}
              className=" bg-blue-500 text-white hover:bg-blue-600"
            >
              Save
            </Button>
            <Button
              isLoading={mutauteAdd.isLoading}
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

export const ModalUpdateSupplier = ({
  children,
  refetch,
  data,
}: TModalSupplier) => {
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [open, setOpen] = useState<boolean>(false);
  const mutateUpdate = useMutation(updateSupplier);

  const handleOpen = () => {
    if (data) {
      Object.keys(data).forEach((key: string) => {
        setValue(key, data[key as keyof TSupplier]);
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit = (body: any) => {
    body.notes = body.notes || "-";

    mutateUpdate.mutate(
      { supplierCode: data?.supplierCode, body },
      {
        onSuccess: () => {
          handleClose();
          refetch();
        },
      }
    );
  };

  return (
    <div>
      {children && cloneElement(children, { onClick: handleOpen })}
      <Modal show={open} onClose={handleClose}>
        <Modal.Header>Update Supplier</Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body className="grid grid-cols-2 gap-2">
            <div className="col-span-2">
              <Label htmlFor="supplierName" value="Name" />
              <TextInput
                {...register("supplierName", { required: true })}
                placeholder="type name here..."
                className="my-2"
              />
              {errors["supplierName"] && (
                <i className=" text-sm text-red-500">please input name!</i>
              )}
            </div>

            <div className="col-span-2">
              <Label htmlFor="supplierCode" value="Code" />
              <TextInput
                {...register("supplierCode", { required: true })}
                placeholder="type code here..."
                className="my-2"
              />
              {errors["supplierCode"] && (
                <i className=" text-sm text-red-500">please input code!</i>
              )}
            </div>

            <div className="col-span-2">
              <Label htmlFor="phone" value="Phone" />
              <TextInput
                {...register("phone", { required: true })}
                placeholder="type phone here..."
                className="my-2"
              />
              {errors["phone"] && (
                <i className=" text-sm text-red-500">please input phone!</i>
              )}
            </div>

            <div className="col-span-2">
              <Label htmlFor="address" value="Address" />
              <TextInput
                {...register("address", { required: true })}
                placeholder="type address here..."
                className="my-2"
              />
              {errors["address"] && (
                <i className=" text-sm text-red-500">please input address!</i>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              isLoading={mutateUpdate.isLoading}
              className=" bg-blue-500 text-white hover:bg-blue-600"
            >
              Save
            </Button>
            <Button
              isLoading={mutateUpdate.isLoading}
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

export const ModalDeleteSupplier = ({
  children,
  data,
  refetch,
}: TModalSupplier) => {
  const mutateDelete = useMutation(deleteSupplier);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = () => {
    mutateDelete.mutate(data?.supplierCode, {
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
        <Modal.Header>Delete Supplier</Modal.Header>
        <Modal.Body>Do You Want to delete this supplier?</Modal.Body>
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
