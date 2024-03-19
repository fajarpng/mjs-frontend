import { Label, Modal, TextInput } from "flowbite-react";
import type { ReactElement } from "react";
import { cloneElement, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/button";
import { useMutation } from "react-query";
import {
  addCategory,
  deleteCategory,
  updateCategory,
} from "../../api/category";
import { useCategory } from "../../hooks/category";
import type { TCategory } from "../../types";

export const ModalAddCategory = ({ children }: { children?: ReactElement }) => {
  const { refetch } = useCategory();
  const mutateAdd = useMutation(addCategory);
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
        <Modal.Header>Add Category</Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <div className="mb-2">
              <Label htmlFor="categoryName">name</Label>
              <TextInput
                {...register("categoryName", { required: true })}
                placeholder="type category here..."
                className="my-2"
              />
              {errors["categoryName"] && (
                <i className=" text-sm text-red-500">
                  please input category name!
                </i>
              )}
            </div>

            <div className="mb-2">
              <Label htmlFor="categoryCode">Code</Label>
              <TextInput
                {...register("categoryCode", { required: true })}
                placeholder="type code here..."
                className="my-2"
              />
              {errors["categoryCode"] && (
                <i className=" text-sm text-red-500">
                  please input category code!
                </i>
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

export const ModalUpdateCategory = ({
  children,
  data,
}: {
  children?: ReactElement;
  data: TCategory;
}) => {
  const { refetch } = useCategory();
  const mutateUpdate = useMutation(updateCategory);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: data });
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit = (body: object) => {
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
        <Modal.Header>Edit Category</Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <div className="mb-2">
              <Label htmlFor="categoryName" value="Name" />
              <TextInput
                {...register("categoryName", { required: true })}
                placeholder="type name here..."
                className="my-2"
              />
              {errors.categoryName && (
                <i className=" text-sm text-red-500">
                  please input category name!
                </i>
              )}
            </div>

            <div className="mb-2">
              <Label htmlFor="categoryCode" value="Code" />
              <TextInput
                {...register("categoryCode", { required: true })}
                placeholder="type code here..."
                className="my-2"
              />
              {errors.categoryCode && (
                <i className=" text-sm text-red-500">
                  please input category code!
                </i>
              )}
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

export const ModalDeleteCategory = ({
  children,
  data,
}: {
  children?: ReactElement;
  data: TCategory;
}) => {
  const { refetch } = useCategory();
  const mutateDelete = useMutation(deleteCategory);
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
        <Modal.Header>Delete Category</Modal.Header>
        <Modal.Body>Do You Want to delete this category?</Modal.Body>
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
