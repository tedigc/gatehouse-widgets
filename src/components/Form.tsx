import { useRef } from "react";

export type FormConfig = {
  fileUrl: string;
  backgroundColour: string;
  textColour: string;
  buttonColour: string;
  buttonTextColour: string;
  submitButtonText: string;
};

export type FormProps = {
  config: FormConfig;
};

export const Form = ({ config }: FormProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleClick = () => {
    const modal = modalRef.current;
    if (modal?.open) {
      modal?.close();
    } else {
      modal?.showModal();
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="!px-3 !py-2.5 !rounded-lg"
        style={{
          backgroundColor: config.buttonColour,
          color: config.buttonTextColour,
        }}
      >
        Get it now
      </button>
      <dialog ref={modalRef}>
        <form
          className="!flex !w-full !flex-col !items-stretch !rounded-md !border !border-gray-300 !p-4"
          style={{
            backgroundColor: config.backgroundColour,
            color: config.textColour,
          }}
        >
          <div className="!mb-4">
            <label
              htmlFor="email"
              className="!mb-2 !block !text-sm !font-medium !leading-6 !text-gray-900"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="!block !w-full !rounded-md !border-0 !px-3 !py-1.5 !text-gray-900 !shadow-sm !ring-1 !ring-inset !ring-gray-300 !placeholder:text-gray-400 !focus:ring-2 !focus:ring-inset !focus:ring-indigo-600 !sm:text-sm sm:leading-6"
            />
          </div>

          <button
            type="button"
            className="!flex !min-h-[36px] !w-full !justify-center !rounded-md !px-3 !py-1.5 !text-sm !font-semibold !leading-6 !shadow-sm !focus-visible:outline !focus-visible:outline-2 !focus-visible:outline-offset-2"
            style={{
              backgroundColor: config.buttonColour,
              color: config.buttonTextColour,
            }}
          >
            {config.submitButtonText}
          </button>
        </form>
      </dialog>
    </>
  );
};
