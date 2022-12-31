import { useState, useCallback } from 'react';
import ButtonLoadingSpinner from 'components/general/ButtonLoadingSpinner';

type ReturnType = {
  LoadingWrapper: () => JSX.Element;
  toggleLoading: () => void;
  isLoading: boolean;
};

const useLoader: (initD: {
  text?: string;
  Cmp?: () => JSX.Element;
}) => ReturnType = ({ text = '', Cmp }) => {
  const [isLoading, setIsLoading] = useState(false);

  const toggleLoading = useCallback(
    () => setIsLoading((lastLoading) => !lastLoading),
    [],
  );

  const LoadingWrapper = useCallback(() => {
    if (isLoading) return <ButtonLoadingSpinner />;

    return <span>{text}</span>;
  }, [isLoading, text]);

  return { isLoading, toggleLoading, LoadingWrapper };
};

export default useLoader;
