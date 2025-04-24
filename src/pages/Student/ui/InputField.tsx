type InputFieldProps = {
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
  };
  
  function InputField(props: InputFieldProps) {
    return (
      <div className="input-group">
        <label>{props.label}</label>
        <input
          type={props.type}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          required
        />
        {props.error && <p className="error-text">{props.error}</p>}
      </div>
    );
  }
  
  export default InputField;
  