import { Label, Modal, Select } from "flowbite-react";
import type { ReactElement } from "react";
import { cloneElement, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import {
  addBundling,
  deleteBundling,
  updateBundling,
} from "../../api/bundling";
import Button from "../../components/button";
import { useProductBundling } from "../../hooks/product";
import type { TBundling } from "../../types";

interface TModalBundling {
  children?: ReactElement;
  data?: TBundling;
  refetch: () => void;
}

export const ModalAddBundling = ({ children, refetch }: TModalBundling) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const mutauteAdd = useMutation(addBundling);
  const { data: bundlingCode } = useProductBundling();
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
        <Modal.Header>Add Bundling</Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body className="grid grid-cols-2 gap-2">
            <div className="col-span-2">
              <Label htmlFor="bundlingCode" value="Code" />
              <Select
                {...register("bundlingCode", { required: true })}
                className="my-2"
                defaultValue=""
              >
                <option value="" disabled>
                  select bunding code
                </option>
                {bundlingCode?.data.map((v) => (
                  <option key={v.productCode} value={v.productCode}>
                    {v.productCode}
                  </option>
                ))}
              </Select>
              {errors["bundlingCode"] && (
                <i className=" text-sm text-red-500">please select code!</i>
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

export const ModalUpdateBundling = ({
  children,
  refetch,
  data,
}: TModalBundling) => {
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [open, setOpen] = useState<boolean>(false);
  const mutateUpdate = useMutation(updateBundling);
  const { data: bundlingCode } = useProductBundling();

  const handleOpen = () => {
    if (data) {
      Object.keys(data).forEach((key: string) => {
        setValue(key, data[key as keyof TBundling]);
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit = (body: any) => {
    mutateUpdate.mutate(
      { id: data?.id, ...body },
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
        <Modal.Header>Update Bundling</Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body className="grid grid-cols-2 gap-2">
            <div className="col-span-2">
              <Label htmlFor="bundlingCode" value="Code" />
              <Select
                {...register("bundlingCode", { required: true })}
                className="my-2"
              >
                <option value="" disabled>
                  select bunding code
                </option>
                {bundlingCode?.data.map((v) => (
                  <option key={v.productCode} value={v.productCode}>
                    {v.categoryCode} - {v.categoryName}
                  </option>
                ))}
              </Select>
              {errors["bundlingCode"] && (
                <i className=" text-sm text-red-500">please select code!</i>
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

export const ModalDeleteBundling = ({
  children,
  data,
  refetch,
}: TModalBundling) => {
  const mutateDelete = useMutation(deleteBundling);
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
        <Modal.Header>Delete Bundling</Modal.Header>
        <Modal.Body>Do You Want to delete this bundle?</Modal.Body>
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
