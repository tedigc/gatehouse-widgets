export type FormConfig = {
  buttonBackgroundColor: string;
  buttonForegroundColor: string;
  submitButtonText: string;
  fileUrl: string;
};

export type FormProps = {
  config: FormConfig;
};

export const Form = ({ config }: FormProps) => {
  return (
    <form className="flex w-full flex-col items-stretch rounded-md border border-gray-300 bg-gray-100 p-4">
      <div className="mb-4">
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium leading-6 text-gray-900"
        >
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>

      <button
        type="button"
        className="flex min-h-[36px] w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        style={{
          backgroundColor: config.buttonBackgroundColor,
          color: config.buttonForegroundColor,
        }}
      >
        {config.submitButtonText}
      </button>
    </form>
  );
};
