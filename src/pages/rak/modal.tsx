import { Label, Modal, TextInput } from "flowbite-react";
import type { ReactElement } from "react";
import { cloneElement, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { addRak, deleteRak, updateRak } from "../../api/rak";
import Button from "../../components/button";
import type { TRak } from "../../types";

interface TRakProduct {
  children?: ReactElement;
  data: TRak;
  refetch: () => void;
}

export const ModalAddRak = ({
  children,
  refetch,
}: {
  children?: ReactElement;
  refetch: () => void;
}) => {
  const mutateAdd = useMutation(addRak);
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
    mutateAdd.mutate(data, {
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
        <Modal.Header>Add Rak</Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <div className="mb-2">
              <Label htmlFor="rakName">Name</Label>
              <TextInput
                {...register("rakName", { required: true })}
                placeholder="type rak here..."
                className="my-2"
              />
              {errors["rakName"] && (
                <i className=" text-sm text-red-500">please input rak name!</i>
              )}
            </div>

            <div className="mb-2">
              <Label htmlFor="rakCode">Code</Label>
              <TextInput
                {...register("rakCode", { required: true })}
                placeholder="type code here..."
                className="my-2"
              />
              {errors["rakCode"] && (
                <i className=" text-sm text-red-500">please input rak code!</i>
              )}
            </div>

            <div className="mb-2">
              <Label htmlFor="description" value="Description" />
              <TextInput
                {...register("description")}
                placeholder="type description here..."
                className="my-2"
              />
              {/* {errors["description"] && (
                <i className=" text-sm text-red-500">
                  please input rak description!
                </i>
              )} */}
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

export const ModalUpdateRak = ({ children, data, refetch }: TRakProduct) => {
  const mutateUpdate = useMutation(updateRak);
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    Object.keys(data).forEach((key: string) => {
      setValue(key, data[key as keyof TRak]);
    });
    setOpen(true);
  };
  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit = (body: object) => {
    console.log(body);

    mutateUpdate.mutate(
      { id: data.id, ...body },
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
        <Modal.Header>Edit Rak</Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <div className="mb-2">
              <Label htmlFor="rakName" value="Name" />
              <TextInput
                {...register("rakName", { required: true })}
                placeholder="type name here..."
                className="my-2"
              />
              {errors["rakName"] && (
                <i className=" text-sm text-red-500">please input rak name!</i>
              )}
            </div>

            <div className="mb-2">
              <Label htmlFor="rakCode" value="Code" />
              <TextInput
                {...register("rakCode", { required: true })}
                placeholder="type code here..."
                className="my-2"
              />
              {errors["rakCode"] && (
                <i className=" text-sm text-red-500">please input rak code!</i>
              )}
            </div>

            <div className="mb-2">
              <Label htmlFor="description" value="Description" />
              <TextInput
                {...register("description")}
                placeholder="type description here..."
                className="my-2"
              />
              {/* {errors["description"] && (
                <i className=" text-sm text-red-500">
                  please input rak description!
                </i>
              )} */}
            </div>
          </Modal.Body>
          <Modal.Footer>
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
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export const ModalDeleteRak = ({ children, data, refetch }: TRakProduct) => {
  const mutateDelete = useMutation(deleteRak);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = () => {
    mutateDelete.mutate(data.id, {
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
        <Modal.Header>Delete Rak</Modal.Header>
        <Modal.Body>Do You Want to delete this rak?</Modal.Body>
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
