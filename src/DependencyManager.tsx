import React, { useContext } from "react";

interface Props<T> {
  container: T;
}
export const createDependencyManager = <T,>() => {
  const DependencyContext = React.createContext<{
    container: T | null;
  }>({ container: null });

  const Provider: React.FC<Props<T>> = (props) => {
    return (
      <DependencyContext.Provider value={{ container: props.container }}>
        {props.children}
      </DependencyContext.Provider>
    );
  };
  const useDependecyContainer = (): T => {
    const { container } = useContext(DependencyContext);
    if (!container) {
      throw new Error();
    }
    return container;
  };
  return {
    provider: Provider,
    hook: useDependecyContainer,
  };
};
