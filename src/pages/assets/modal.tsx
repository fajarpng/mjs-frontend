import { Label, Modal, TextInput, Textarea } from "flowbite-react";
import type { ReactElement } from "react";
import { cloneElement, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { addProduct, updateProduct } from "../../api/product";
import Button from "../../components/button";
import type { TProduct } from "../../types";

interface TModalProduct {
  children?: ReactElement;
  data?: TProduct;
  refetch: () => void;
}

export const ModalAddProduct = ({ children, refetch }: TModalProduct) => {
  const queryCLient = useQueryClient();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [open, setOpen] = useState<boolean>(false);
  const mutateAdd = useMutation(addProduct);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    reset();
    setOpen(false);
  };
  const onSubmit = (data: any) => {
    data.qty = 0;
    data.qtyMin = 0;
    data.barcode = data.productCode;
    data.rakCode = "-";
    data.type = "4";

    mutateAdd.mutate(data, {
      onSuccess: () => {
        handleClose();
        refetch();
        queryCLient.invalidateQueries("product/bundling");
        queryCLient.invalidateQueries("product/bundling/detail");
      },
    });
  };

  return (
    <div>
      {children && cloneElement(children, { onClick: handleOpen })}
      <Modal show={open} onClose={handleClose}>
        <Modal.Header>Add Product</Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body className="grid grid-cols-2 gap-2">
            <div className="col-span-2">
              <Label htmlFor="productName" value="Product Name" />
              <TextInput
                {...register("productName", { required: true })}
                placeholder="type product name here..."
                className="my-2"
              />
              {errors["productName"] && (
                <i className=" text-sm text-red-500">
                  please input product name!
                </i>
              )}
            </div>

            <div className="col-span-2">
              <Label htmlFor="productCode" value="Product Code" />
              <TextInput
                {...register("productCode", { required: true })}
                placeholder="type product code here..."
                className="my-2"
              />
              {errors["productCode"] && (
                <i className=" text-sm text-red-500">
                  please input product code!
                </i>
              )}
            </div>

            <div className="col-span-2">
              <Label htmlFor="description" value="Description" />
              <Textarea
                {...register("description")}
                placeholder="type product description here..."
                className="my-2"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              isLoading={mutateAdd.isLoading}
              type="submit"
              className=" bg-blue-500 text-white hover:bg-blue-600"
            >
              Save
            </Button>
            <Button
              isLoading={mutateAdd.isLoading}
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

export const ModalUpdateProduct = ({
  children,
  refetch,
  data,
}: TModalProduct) => {
  const queryCLient = useQueryClient();
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [open, setOpen] = useState<boolean>(false);
  const mutateUpdate = useMutation(updateProduct);

  const handleOpen = () => {
    if (data) {
      Object.keys(data).forEach((key: string) => {
        setValue(key, data[key as keyof TProduct]);
      });

      setValue("rak", `${data.rakCode}|${data.rakName}`);
    }
    setOpen(true);
  };

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit = (body: any) => {
    mutateUpdate.mutate(
      { id: data?.productId, ...body },
      {
        onSuccess: () => {
          handleClose();
          refetch();

          queryCLient.invalidateQueries("product/bundling");
          queryCLient.invalidateQueries("product/bundling/detail");
        },
      }
    );
  };

  return (
    <div>
      {children && cloneElement(children, { onClick: handleOpen })}
      <Modal show={open} onClose={handleClose}>
        <Modal.Header>Update Product</Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body className="grid grid-cols-2 gap-2">
            <div className="col-span-2">
              <Label htmlFor="productName" value="Product Name" />
              <TextInput
                {...register("productName", { required: true })}
                placeholder="type product name here..."
                className="my-2"
              />
              {errors["productName"] && (
                <i className=" text-sm text-red-500">
                  please input product name!
                </i>
              )}
            </div>

            <div className="col-span-2">
              <Label htmlFor="productCode" value="Product Code" />
              <TextInput
                {...register("productCode", { required: true })}
                placeholder="type product code here..."
                className="my-2"
              />
              {errors["productCode"] && (
                <i className=" text-sm text-red-500">
                  please input product code!
                </i>
              )}
            </div>

            <div className="col-span-2">
              <Label htmlFor="description" value="Description" />
              <Textarea
                {...register("description")}
                placeholder="type product description here..."
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
