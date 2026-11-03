import { useEffect, useRef } from 'react';

export function usePageFocus() {
  const headingRef = useRef(null);

  useEffect(() => {
    if (headingRef.current) {
      headingRef.current.focus();
    }
  }, []);

  return headingRef;
}
