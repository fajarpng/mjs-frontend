import { Label, Modal, TextInput } from "flowbite-react";
import type { ReactElement } from "react";
import { cloneElement, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import {
  addStockOpname,
  deleteStockOpname,
  updateStockOpname,
} from "../../api/stockOpname";
import Button from "../../components/button";
import type { TStockOpname } from "../../types";

interface TModalStockOpname {
  children?: ReactElement;
  data?: TStockOpname;
  refetch: () => void;
}

export const ModalAddStockOpname = ({
  children,
  refetch,
}: TModalStockOpname) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const mutateAdd = useMutation(addStockOpname);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit = (body: any) => {
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
        <Modal.Header>Add Stock Opnames</Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <div className="mb-2">
              <Label htmlFor="note" value="Note" />
              <TextInput
                {...register("note", { required: true })}
                placeholder="type note here..."
                className="my-2"
              />
              {errors["note"] && (
                <i className=" text-sm text-red-500">please input note!</i>
              )}
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

export const ModalUpdateStockOpname = ({
  children,
  data,
  refetch,
}: TModalStockOpname) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const mutateUpdate = useMutation(updateStockOpname);

  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    if (data) {
      Object.keys(data).forEach((key: string) => {
        setValue(key, data[key as keyof TStockOpname]);
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
        <Modal.Header>Edit Employee</Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <div className="mb-2">
              <Label htmlFor="note" value="Note" />
              <TextInput
                {...register("note", { required: true })}
                placeholder="type note here..."
                className="my-2"
              />
              {errors["note"] && (
                <i className=" text-sm text-red-500">please input note!</i>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer className="flex justify-between">
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

export const ModalDeleteStockOpname = ({
  children,
  data,
  refetch,
}: TModalStockOpname) => {
  const mutateDelete = useMutation(deleteStockOpname);
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
        <Modal.Header>Delete Stock Opname</Modal.Header>
        <Modal.Body>Do You Want to delete this stock opname?</Modal.Body>
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
