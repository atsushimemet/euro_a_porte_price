import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth = false, ...props }, ref) => {
    return (
      <button
        className={clsx(
          'touch-feedback inline-flex items-center justify-center rounded-ios font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ios-blue focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
          {
            // Variants
            'bg-ios-blue text-white hover:bg-opacity-90': variant === 'primary',
            'bg-ios-gray-100 text-ios-gray-900 hover:bg-ios-gray-200 dark:bg-ios-gray-700 dark:text-white dark:hover:bg-ios-gray-600':
              variant === 'secondary',
            'text-ios-blue hover:bg-ios-blue hover:bg-opacity-10': variant === 'ghost',
            
            // Sizes
            'h-8 px-3 text-sm': size === 'sm',
            'h-10 px-4 text-base': size === 'md',
            'h-12 px-6 text-lg': size === 'lg',
            
            // Full width
            'w-full': fullWidth,
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };