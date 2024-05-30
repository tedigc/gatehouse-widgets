import { twMerge } from 'tailwind-merge';

export const Input = ({ className, ...rest }: any) => {
  return (
    <input
      {...rest}
      className={twMerge(
        'gh-block gh-w-full gh-rounded-lg gh-border-0 gh-px-3 gh-py-2 gh-text-sm gh-text-black gh-shadow-sm gh-ring-1 gh-ring-inset gh-ring-gray-300 placeholder:gh-text-gray-400 focus:gh-ring-2 focus:gh-ring-inset',
        className,
      )}
    />
  );
};
