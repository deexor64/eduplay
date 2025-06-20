type DateInputProps = {
  label: string,
  name: string,
  setFormData: Function,
};

export default function DateInput(props: DateInputProps) {

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    props.setFormData(function (prev: any) {
      return {
        ...prev,
        [props.name]: new Date(e.target.value + "T00:00:00"),
      };
    });
  }

  return (
    <div className="mb-4">
      <label htmlFor={props.name} className="block text-gray-700 font-medium mb-1">
        {props.label}
      </label>
      <input
        name={props.name}
        type="date"
        id={props.name}
        onChange={handleChange}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
  );
}
