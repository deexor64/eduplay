
type ErrorProps = {
  error: string | boolean;
};

export default function Error(props: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      {props.error && <p className="text-red-500 text-md mb-4">{props.error}</p>}
    </div>
  );
}