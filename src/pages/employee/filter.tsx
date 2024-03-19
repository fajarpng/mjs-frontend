import { TextInput } from "flowbite-react";
import { type FC } from "react";
import { useSearchQuery } from "../../hooks/searchQuery";
import { useForm } from "react-hook-form";

const EmployeePageFilter: FC = function () {
  const { handleSubmit, register } = useForm();
  const { setQuery, query } = useSearchQuery();

  const onSubmit = (newQuery: object) => setQuery(newQuery);

  return (
    <form
      className="grid w-full grid-cols-3 gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        {...register("search", { required: true })}
        defaultValue={query.search}
        placeholder="search by nip/nik/email/name..."
      />
    </form>
  );
};

export default EmployeePageFilter;
