export default function Footer({className,children,...props}:React.HTMLAttributes<HTMLHeadingElement>) {
  return <h5 {...props} className={className}>{children}</h5>
}
