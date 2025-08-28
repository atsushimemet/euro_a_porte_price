import { InputHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error = false, ...props }, ref) => {
    return (
      <input
        type={type}
        className={clsx(
          'flex h-10 w-full rounded-ios border border-ios-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-ios-gray-400 focus:outline-none focus:ring-2 focus:ring-ios-blue focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          'dark:border-ios-gray-700 dark:bg-ios-gray-800 dark:ring-offset-ios-gray-900 dark:placeholder:text-ios-gray-500',
          {
            'border-red-500 focus:ring-red-500': error,
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };