export default function PrimaryButton(props) {

  const { type, children, ...rest } = props
  const className="max-w-fit inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium font-loader rounded-md shadow-sm text-gray-100 bg-black hover:bg-indigo-200 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 disabled:opacity-80 disabled:pointer-events-none"

  if(type === "link") {
    return <a {...rest} className={className}>{children}</a>
  } else {
    return <button {...rest} className={className}>{children}</button>
  }
}
