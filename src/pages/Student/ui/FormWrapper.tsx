type FormWrapperProps = {
    title: string;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    children: React.ReactNode;
  };
  
  function FormWrapper(props: FormWrapperProps) {
    return (
      <div className="form-page">
        <h2>{props.title}</h2>
        <form onSubmit={props.onSubmit} className="form-container">
          {props.children}
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    );
  }
  
  export default FormWrapper;
  