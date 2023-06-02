import { useEffect, useRef, RefObject } from "react";

function useClickOutside<T extends HTMLElement>(
  fn: () => void,
  bool: boolean
): RefObject<T> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node) && bool) {
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
