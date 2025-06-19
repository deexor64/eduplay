
type PhoneInputProps = {
  label: string,
  name: string,
  setFormData: Function,
};

export default function PhoneInput(props: PhoneInputProps) {
  
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    props.setFormData(function (prev: any) {
      return {
        ...prev,
        [props.name]: e.target.value,}
    });
  }
  
  return (
    <div className="mb-4">
      <label htmlFor={props.name} className="block text-gray-700 font-medium mb-1">
        {props.label}
      </label>
      <input
        name={props.name}
        type="number"
        id={props.name}
        onChange={handleChange}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
  )
  
}
