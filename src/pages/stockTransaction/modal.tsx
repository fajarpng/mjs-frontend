import { Label, Modal, Select, TextInput } from "flowbite-react";
import type { ReactElement } from "react";
import { cloneElement, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/button";
import { useMutation } from "react-query";
import { addStock, deleteStock, updateStock } from "../../api/stockTransaction";
import type { TStock } from "../../types";
import { useSupplier } from "../../hooks/supplier";

interface TModalStock {
  children?: ReactElement;
  data?: TStock;
  refetch: () => void;
}

export const ModalAddStock = ({ children, refetch }: TModalStock) => {
  const { data: supplier } = useSupplier({ pageIndex: 1, pageSize: 1000 });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const mutauteAdd = useMutation(addStock);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit = (body: any) => {
    body.notes = body.notes || "-";

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
        <Modal.Header>Add Stock</Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body className="grid grid-cols-2 gap-2">
            <div className="col-span-2">
              <Label htmlFor="type" value="Type" />
              <Select
                {...register("type", { required: true })}
                className="my-2"
                defaultValue=""
              >
                <option value="" disabled>
                  select stock type
                </option>
                <option value="In">In</option>
                <option value="Out">Out</option>
              </Select>
              {errors["type"] && (
                <i className=" text-sm text-red-500">please select type!</i>
              )}
            </div>

            <div className="col-span-2">
              <Label htmlFor="supplierCode" value="Supplier" />
              <Select
                {...register("supplierCode", { required: true })}
                className="my-2"
                defaultValue=""
              >
                <option value="" disabled>
                  select stock supplier
                </option>
                <option value="No-Supp">No-Supp</option>
                {supplier?.data.map((v, i) => (
                  <option key={i} value={v.supplierCode}>
                    {v.supplierCode} - {v.supplierName}
                  </option>
                ))}
              </Select>
              {errors["supplierCode"] && (
                <i className=" text-sm text-red-500">please select supplier!</i>
              )}
            </div>

            <div className="col-span-2">
              <Label htmlFor="notes" value="Note" />
              <TextInput
                {...register("notes")}
                placeholder="type note here..."
                className="my-2"
              />
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

export const ModalUpdateStock = ({ children, refetch, data }: TModalStock) => {
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [open, setOpen] = useState<boolean>(false);
  const mutateUpdate = useMutation(updateStock);

  const handleOpen = () => {
    if (data) {
      Object.keys(data).forEach((key: string) => {
        setValue(key, data[key as keyof TStock]);
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
        <Modal.Header>Update Stock</Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body className="grid grid-cols-2 gap-2">
            <div className="col-span-2">
              <Label htmlFor="type" value="Type" />
              <Select
                {...register("type", { required: true })}
                className="my-2"
              >
                <option value="" disabled>
                  select stock type
                </option>
                <option value="In">In</option>
                <option value="Out">Out</option>
              </Select>
              {errors["type"] && (
                <i className=" text-sm text-red-500">please select type!</i>
              )}
            </div>

            <div className="col-span-2">
              <Label htmlFor="supplierCode" value="Supplier" />
              <Select
                {...register("supplierCode", { required: true })}
                className="my-2"
              >
                <option value="" disabled>
                  select stock supplier
                </option>
                <option value="No-Supp">No-Supp</option>
                <option value="Out">Out</option>
              </Select>
              {errors["supplierCode"] && (
                <i className=" text-sm text-red-500">please select supplier!</i>
              )}
            </div>

            <div className="col-span-2">
              <Label htmlFor="notes" value="Note" />
              <TextInput
                {...register("notes")}
                placeholder="type note here..."
                className="my-2"
              />
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

export const ModalDeleteStock = ({ children, data, refetch }: TModalStock) => {
  const mutateDelete = useMutation(deleteStock);
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
        <Modal.Header>Delete Stock</Modal.Header>
        <Modal.Body>Do You Want to delete this stock?</Modal.Body>
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
