import { Link } from 'react-router';

const Button = ({ children, type = 'primary', link, className }) => {
  const style = {
    base: 'py-2 px-3 text-white rounded-md',
    primary: 'bg-primary',
  };

  const classStyle = `${style.base} ${style[type]}`;

  if (link)
    return (
      <Link className={`${classStyle} ${className}`} to={link}>
        {children}
      </Link>
    );

  return <button className={`${classStyle} ${className}`}>{children}</button>;
};

export default Button;
