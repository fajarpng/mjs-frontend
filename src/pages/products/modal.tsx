import { Label, Modal, Select, TextInput, Textarea } from "flowbite-react";
import type { ReactElement } from "react";
import { cloneElement, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { addProduct, deleteProduct, updateProduct } from "../../api/product";
import Button from "../../components/button";
import { useCategory } from "../../hooks/category";
import { useDetailProduct } from "../../hooks/product";
import type { TProduct } from "../../types";
import { CardDetail } from "./cardDetail";

interface TModalProduct {
  children?: ReactElement;
  data?: TProduct;
  refetch: () => void;
}

export const ModalAddProduct = ({ children, refetch }: TModalProduct) => {
  const category = useCategory();
  const listCategory = category.data?.data ?? [];
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
    const category = data.category.split("|");

    data.qty = 0;
    data.barcode = data.productCode;
    data.categoryCode = category[0];
    data.categoryName = category[1];
    data.type = "1";
    delete data.category;

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
            {/* <div className="col-span-2">
              <InputImage />
            </div> */}

            <div className="col-span-2">
              <Label htmlFor="imageUrl" value="Image Url" />
              <TextInput
                {...register("imageUrl", { required: true })}
                placeholder="type image url here..."
                className="my-2"
              />
              {errors["imageUrl"] && (
                <i className=" text-sm text-red-500">
                  please input product image url!
                </i>
              )}
            </div>

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

            <div>
              <Label htmlFor="qtyMin" value="Quantity Min" />
              <TextInput
                {...register("qtyMin", { required: true })}
                placeholder="type product minimum here..."
                className="my-2"
                type="number"
              />
              {errors["qtyMin"] && (
                <i className=" text-sm text-red-500">
                  please input product quantitiy minimum!
                </i>
              )}
            </div>

            <div className="col-span-2">
              <Label htmlFor="category" value="Category" />
              <Select
                {...register("category", { required: true })}
                className="my-2"
                defaultValue=""
              >
                <option value="" disabled>
                  select product category
                </option>
                {listCategory.map((v) => (
                  <option
                    key={v.categoryCode}
                    value={`${v.categoryCode}|${v.categoryName}`}
                  >
                    {v.categoryCode} - {v.categoryName}
                  </option>
                ))}
              </Select>
              {errors["category"] && (
                <i className=" text-sm text-red-500">please select category!</i>
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
  const category = useCategory();
  const listCategory = category.data?.data ?? [];
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

      setValue("category", `${data.categoryCode}|${data.categoryName}`);
    }
    setOpen(true);
  };

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit = (body: any) => {
    const category = body.category.split("|");

    body.categoryCode = category[0];
    body.categoryName = category[1];
    delete body.category;

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
            {/* <div className="col-span-2">
              <InputImage />
            </div> */}

            <div className="col-span-2">
              <Label htmlFor="imageUrl" value="Image Url" />
              <TextInput
                {...register("imageUrl", { required: true })}
                placeholder="type image url here..."
                className="my-2"
              />
              {errors["imageUrl"] && (
                <i className=" text-sm text-red-500">
                  please input product image url!
                </i>
              )}
            </div>

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

            <div>
              <Label htmlFor="qty" value="Quantity" />
              <TextInput
                {...register("qty", { required: true })}
                placeholder="type product quantitiy here..."
                className="my-2"
                type="number"
              />
              {errors["qty"] && (
                <i className=" text-sm text-red-500">
                  please input product quantitiy!
                </i>
              )}
            </div>

            <div>
              <Label htmlFor="qtyMin" value="Quantity Min" />
              <TextInput
                {...register("qtyMin", { required: true })}
                placeholder="type product minimum here..."
                className="my-2"
                type="number"
              />
              {errors["qtyMin"] && (
                <i className=" text-sm text-red-500">
                  please input product quantitiy minimum!
                </i>
              )}
            </div>

            <div className="col-span-2">
              <Label htmlFor="category" value="Category" />
              <Select
                {...register("category", { required: true })}
                className="my-2"
              >
                <option value="" disabled>
                  select product category
                </option>
                {listCategory.map((v) => (
                  <option
                    key={v.categoryCode}
                    value={`${v.categoryCode}|${v.categoryName}`}
                  >
                    {v.categoryCode} - {v.categoryName}
                  </option>
                ))}
              </Select>
              {errors["category"] && (
                <i className=" text-sm text-red-500">please select category!</i>
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

export const ModalDeleteProduct = ({
  children,
  data,
  refetch,
}: TModalProduct) => {
  const mutateDelete = useMutation(deleteProduct);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = () => {
    mutateDelete.mutate(data?.productId, {
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

export const ModalDetailProduct = ({ children, data }: TModalProduct) => {
  const { data: _dt, refetch } = useDetailProduct(data?.productId);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    !_dt && refetch();
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const detailsProdutct = useMemo(() => _dt ?? data, [_dt, data]);

  return (
    <div>
      {children && cloneElement(children, { onClick: handleOpen })}
      <Modal show={open} onClose={handleClose}>
        <Modal.Header>Detail Product</Modal.Header>
        <Modal.Body>
          {detailsProdutct && <CardDetail data={detailsProdutct} />}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={handleClose}
            className=" bg-red-500 text-white hover:bg-red-600"
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
