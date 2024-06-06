import { Label, Modal, Select, TextInput } from "flowbite-react";
import type { ReactElement } from "react";
import { cloneElement, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useParams } from "react-router";
import { addBundlinDetail, deleteBundlingDetail } from "../../api/bundling";
import Button from "../../components/button";
import { useProductBundlingDetail } from "../../hooks/product";
import type { TBundleDetail } from "../../types";

interface TModalBundling {
  children?: ReactElement;
  data?: TBundleDetail;
  refetch: () => void;
}

export const ModalAddBundling = ({ children, refetch }: TModalBundling) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const query: any = useParams();
  const mutauteAdd = useMutation(addBundlinDetail);
  const { data: componentCode } = useProductBundlingDetail();
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit = (body: any) => {
    body.numberTrans = query.code;

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
        <Modal.Header>Add Component</Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body className="grid grid-cols-2 gap-2">
            <div className="col-span-2">
              <Label htmlFor="componentCode" value="Component Code" />
              <Select
                {...register("componentCode", { required: true })}
                className="my-2"
                defaultValue=""
              >
                <option value="" disabled>
                  select component code
                </option>
                {componentCode?.data.map((v) => (
                  <option key={v.productCode} value={v.productCode}>
                    {v.productCode} - {v.productName}
                  </option>
                ))}
              </Select>
              {errors["componentCode"] && (
                <i className=" text-sm text-red-500">
                  please select component code!
                </i>
              )}
            </div>

            <div className="col-span-2">
              <Label htmlFor="qty" value="Quantity" />
              <TextInput
                {...register("qty", { required: true })}
                placeholder="type product name here..."
                className="my-2"
                type="number"
              />
              {errors["qty"] && (
                <i className=" text-sm text-red-500">
                  please input quantitiy component!
                </i>
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

export const ModalDeleteBundling = ({
  children,
  data,
  refetch,
}: TModalBundling) => {
  const mutateDelete = useMutation(deleteBundlingDetail);
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
