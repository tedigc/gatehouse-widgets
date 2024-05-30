import { twMerge } from 'tailwind-merge';

export const Label = ({ className, ...rest }: any) => {
  return <label {...rest} className={twMerge('gh-font-regular gh-block gh-text-sm gh-leading-[1]', className)} />;
};
