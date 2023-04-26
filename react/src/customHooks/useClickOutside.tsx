import { useEffect, useRef, RefObject } from "react";

function useClickOutside<T extends HTMLElement>(
  fn: () => void,
  initialValue: T | null = null
): RefObject<T> {
  const ref = useRef<T | null>(initialValue);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        fn();
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [fn, ref]);

  return ref;
}

export default useClickOutside;
