// Unused import to trigger dead code warning
import React, { useState, useEffect } from "react";
import { z } from "zod";

// Define types for data structure and props
interface DataItem {
  id: number;
  type: string;
  count: number;
  status: string;
}

const ContentProps = z.object({
  content: z.string().optional(),
  onDataUpdate: z.function().args(z.array(z.any())).optional(),
});

type Props = z.infer<typeof ContentProps>;

// No interface/type definitions for props
export const BadComponent = ({ content, onDataUpdate }: Props) => {
  // Combined related state into a single object
  interface DataState {
    items: DataItem[];
    isLoading: boolean;
    error: Error | null;
  }

  const [dataState, setDataState] = useState<DataState>({
    items: [],
    isLoading: false,
    error: null,
  });

  const [counter, setCounter] = useState(0);

  // Constants moved to named variables
  const TAX_RATE = 1.08;
  const SERVICE_FEE = 1.15;
  const SHIPPING_COST = 4.99;

  // API endpoint moved to environment variable reference
  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || "";

  // Proper error handling and cleanup in useEffect
  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        setDataState((prev) => ({ ...prev, isLoading: true }));

        const response = await fetch(API_ENDPOINT, {
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setDataState((prev) => ({
          items: data,
          isLoading: false,
          error: null,
        }));

        onDataUpdate?.(data);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          setDataState((prev) => ({
            ...prev,
            isLoading: false,
            error: error as Error,
          }));
        }
      }
    };

    void fetchData();

    return () => {
      abortController.abort();
    };
  }, [onDataUpdate]);

  // Simplified data processing with proper error handling
  const processData = (items: DataItem[]) => {
    return items.map((item) => ({
      ...item,
      processedId: item.id * 2,
    }));
  };

  // Simplified complex function with early returns
  const findSpecialActiveItems = (items: DataItem[]): DataItem[] => {
    if (!items?.length) return [];

    return items.filter(
      (item) =>
        item.type === "special" && item.status === "active" && item.count > 0
    );
  };

  const calculateTotal = (quantity: number): number => {
    return quantity * TAX_RATE * SERVICE_FEE + SHIPPING_COST;
  };

  // Safe HTML rendering with sanitization
  const sanitizedContent = content
    ? content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    : "";

  return (
    <section
      className="bg-red-500 p-5"
      role="region"
      aria-label="Content Section"
    >
      {/* Proper image with alt text and loading optimization */}
      <img
        src="image.jpg"
        alt="Descriptive alt text"
        width={300}
        height={200}
        loading="lazy"
      />

      {/* Accessible button with proper event handling */}
      <button
        type="button"
        onClick={() => setCounter((prev) => prev + 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
        aria-label="Increment counter"
      >
        Count: {counter}
      </button>

      {/* Safe content rendering */}
      <div className="mt-4">{sanitizedContent}</div>

      {/* Semantic HTML with proper accessibility */}
      <button
        type="button"
        onClick={() => window.alert("Clicked")}
        className="cursor-pointer mt-4"
        aria-label="Show alert"
      >
        Click this text
      </button>

      {/* Unique IDs */}
      <div id="content-1" className="mt-4">
        Content 1
      </div>
      <div id="content-2" className="mt-4">
        Content 2
      </div>

      {/* Error state handling */}
      {dataState.error && (
        <div role="alert" className="text-red-500 mt-4">
          Error: {dataState.error.message}
        </div>
      )}

      {/* Loading state */}
      {dataState.isLoading && (
        <div role="status" className="mt-4">
          Loading...
        </div>
      )}
    </section>
  );
};
