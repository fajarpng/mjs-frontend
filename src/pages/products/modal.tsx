import { Label, Modal, Select, TextInput, Textarea } from "flowbite-react";
import type { ReactElement } from "react";
import { cloneElement, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { addProduct, deleteProduct, updateProduct } from "../../api/product";
import Button from "../../components/button";
import { useRak } from "../../hooks/rak";
import { useDetailProduct } from "../../hooks/product";
import type { TProduct } from "../../types";
import { CardDetail } from "./cardDetail";
import Barcode from "react-barcode";
import { useReactToPrint } from "react-to-print";

interface TModalProduct {
  children?: ReactElement;
  data?: TProduct;
  refetch: () => void;
}

export const ModalAddProduct = ({ children, refetch }: TModalProduct) => {
  const rak = useRak({ pageIndex: 1, pageSize: 1000 });
  const listRak = rak.data?.data ?? [];
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
    const rak = data.rak.split("|");

    data.qty = 0;
    data.barcode = data.productCode;
    data.rakCode = rak[0];
    data.type = "1";
    delete data.rak;

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
              <Label htmlFor="rak" value="Rak" />
              <Select
                {...register("rak", { required: true })}
                className="my-2"
                defaultValue=""
              >
                <option value="" disabled>
                  select product rak
                </option>
                {listRak.map((v) => (
                  <option key={v.rakCode} value={`${v.rakCode}|${v.rakName}`}>
                    {v.rakCode} - {v.rakName}
                  </option>
                ))}
              </Select>
              {errors["rak"] && (
                <i className=" text-sm text-red-500">please select rak!</i>
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
  const rak = useRak({ pageIndex: 1, pageSize: 1000 });
  const listRak = rak.data?.data ?? [];
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
    const rak = body.rak.split("|");

    body.rakCode = rak[0];
    body.categoryCode = "NL";
    delete body.rak;

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
              <Label htmlFor="rak" value="Rak" />
              <Select {...register("rak", { required: true })} className="my-2">
                <option value="" disabled>
                  select product rak
                </option>
                {listRak.map((v) => (
                  <option key={v.rakCode} value={`${v.rakCode}|${v.rakName}`}>
                    {v.rakCode} - {v.rakName}
                  </option>
                ))}
              </Select>
              {errors["rak"] && (
                <i className=" text-sm text-red-500">please select rak!</i>
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

export const ModalProductBarcode = ({ children, data }: TModalProduct) => {
  const componentRef = useRef<Barcode>(null);
  const { data: _dt, refetch } = useDetailProduct(data?.productId);
  const [open, setOpen] = useState<boolean>(false);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
    @page { size: 30mm 20mm };
    @media all {
      .pageBreak { display: none }
    };
    @media print {
      .pageBreak { page-break-before: always }
    }
    `,
  });

  const handleOpen = () => {
    !_dt && refetch();
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const detailsProdutct = useMemo(() => _dt ?? data, [_dt, data]);

  return (
    <div>
      {children && cloneElement(children, { onClick: handleOpen })}
      <Modal show={open} onClose={handleClose} size="lg">
        <Modal.Header>Barcode Product</Modal.Header>
        <Modal.Body>
          {detailsProdutct && (
            <div className="flex items-center justify-center">
              <Barcode
                width={1}
                height={30}
                ref={componentRef}
                value={detailsProdutct.productCode}
              />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            onClick={handlePrint}
            className=" bg-blue-500 text-white hover:bg-blue-600"
          >
            Print
          </Button>
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
