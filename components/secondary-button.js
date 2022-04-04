export default function SecondaryButton(props) {
  return <button
    {...props}
    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium font-loader rounded-md text-black bg-blue-100 hover:bg-black hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 disabled:opacity-80 disabled:pointer-events-none"
  >{props.children}</button>
}
