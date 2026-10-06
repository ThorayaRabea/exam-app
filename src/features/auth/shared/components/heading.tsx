export default function Heading({className,children,...props}:React.HTMLAttributes<HTMLHeadingElement>) {
  return<>
  <h1 className={className} {...props}>{children}</h1>
  </>
}
 