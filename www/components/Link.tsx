import { useRouter } from "next/router";
import Link from "next/link";
import React, { Children } from "react";

const ActiveLink = ({ children, ...props }) => {
  const router = useRouter();
  const child = Children.only(children);

  let className = child.props.className || null;
  if (router.pathname === props.href && props.activeClassName) {
    className = `${className !== null ? className : ""} ${
      props.activeClassName
    }`.trim();
  }

  delete props.activeClassName;

  return (
    <Link href={props.href} {...props}>
      {React.cloneElement(child, { className })}
    </Link>
  );
};

export default ActiveLink;
