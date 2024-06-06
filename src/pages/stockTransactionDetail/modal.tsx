import { Label, Modal, Select, TextInput } from "flowbite-react";
import type { ReactElement } from "react";
import { cloneElement, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { addStockDetail, deleteStockDetail } from "../../api/stockTransaction";
import Button from "../../components/button";
import type { TStock, TStockDetail } from "../../types";
import { useProductStockTransaction } from "../../hooks/product";

interface TModalStock {
  children?: ReactElement;
  stock?: TStock;
  data?: TStockDetail;
  refetch: () => void;
}

export const ModalAddStock = ({ children, refetch, stock }: TModalStock) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { data: componentCode } = useProductStockTransaction();

  const mutauteAdd = useMutation(addStockDetail);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit = (body: any) => {
    body.numberTrans = stock?.number;

    mutauteAdd.mutate(
      { body, type: stock?.type },
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
        <Modal.Header>Add Product</Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body className="grid grid-cols-2 gap-2">
            <div className="col-span-2">
              <Label htmlFor="productCode" value="Select Product" />
              <Select
                {...register("productCode", { required: true })}
                className="my-2"
                defaultValue=""
              >
                <option value="" disabled>
                  select product
                </option>
                {componentCode?.data.map((v) => (
                  <option key={v.productCode} value={v.productCode}>
                    {v.productName}
                  </option>
                ))}
              </Select>
              {errors["productCode"] && (
                <i className=" text-sm text-red-500">
                  please input product code!
                </i>
              )}
            </div>
            <div className="col-span-2">
              <Label htmlFor="qty" value="Quantity" />
              <TextInput
                {...register("qty", { required: true })}
                placeholder="type number here..."
                className="my-2"
                type="number"
              />
              {errors["qty"] && (
                <i className=" text-sm text-red-500">please input quantity!</i>
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

export const ModalDeleteStock = ({ children, data, refetch }: TModalStock) => {
  const mutateDelete = useMutation(deleteStockDetail);
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
        <Modal.Header>Delete Product</Modal.Header>
        <Modal.Body>Do You Want to delete this product?</Modal.Body>
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
