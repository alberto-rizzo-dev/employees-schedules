import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
    return (
      <button
        {...rest}
        className={clsx(
          'flex h-10 items-center rounded-lg bg-orange-500 px-4 transition-colors hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 active:bg-orange-600',
          className,
        )}
      >
        {children}
      </button>
    );
  }