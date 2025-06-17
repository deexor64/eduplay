
type SubmitButtonProps = {
  children: React.ReactNode;
};

export default function SubmitButton ( props: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
    >
      {props.children}
    </button>
  )
}