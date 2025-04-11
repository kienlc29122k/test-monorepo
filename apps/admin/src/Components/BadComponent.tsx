/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/jsx-no-leaked-render */
/* eslint-disable react/function-component-definition */
import { useState, useEffect } from "react";
import type { FC } from "react";

interface DataItem {
  id: number;
  type: string;
  count: number;
  status: string;
}

interface ComponentProps {
  content?: string;
  onDataUpdate?: (data: DataItem[]) => void;
}

interface DataState {
  items: DataItem[];
  isLoading: boolean;
  error: Error | null;
}

const BadComponent: FC<ComponentProps> = ({
  content,
  onDataUpdate,
}): JSX.Element => {
  const [dataState, setDataState] = useState<DataState>({
    items: [],
    isLoading: false,
    error: null,
  });

  const [counter, setCounter] = useState<number>(0);

  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || "";

  const handleIncrement = (): void => {
    setCounter((prev) => prev + 1);
  };

  const handleAlert = (): void => {
    // eslint-disable-next-line no-console
    console.info("Button clicked!");
  };

  useEffect((): (() => void) => {
    const abortController = new AbortController();

    const fetchData = async (): Promise<void> => {
      try {
        setDataState((state) => ({ ...state, isLoading: true }));

        const response = await fetch(API_ENDPOINT, {
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = (await response.json()) as DataItem[];
        setDataState({
          items: data,
          isLoading: false,
          error: null,
        });

        onDataUpdate?.(data);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          setDataState((state) => ({
            ...state,
            isLoading: false,
            error,
          }));
        }
      }
    };

    void fetchData();

    return (): void => {
      abortController.abort();
    };
  }, [onDataUpdate, API_ENDPOINT]);

  const sanitizedContent = content
    ? content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    : "";

  return (
    <section className="bg-red-500 p-5">
      <img
        alt="Descriptive alt text"
        height={200}
        loading="lazy"
        src="image.jpg"
        width={300}
      />

      <button
        aria-label="Increment counter"
        className="rounded bg-blue-500 px-4 py-2 text-white"
        onClick={handleIncrement}
        type="button"
      >
        Count: {counter}
      </button>

      {sanitizedContent ? <div className="mt-4">{sanitizedContent}</div> : null}

      <button
        aria-label="Show alert"
        className="mt-4 cursor-pointer"
        onClick={handleAlert}
        type="button"
      >
        Click this text
      </button>

      <div className="mt-4" id="content-1">
        Content 1
      </div>
      <div className="mt-4" id="content-2">
        Content 2
      </div>

      {dataState.error && (
        <div className="mt-4 text-red-500" role="alert">
          Error: {dataState.error.message}
        </div>
      )}

      {dataState.isLoading && <div className="mt-4">Loading...</div>}
    </section>
  );
};

export { BadComponent };
