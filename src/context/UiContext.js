import React from "react";

export const UiContext = React.createContext();

export const UiProvider = ({ children }) => {
  const [ocultarMenu, setOcultarMenu] = React.useState(true);

  const showMenu = () => {
    setOcultarMenu(false);
  };

  const hideMenu = () => {
    setOcultarMenu(true);
  };

  return (
    <UiContext.Provider value={{ ocultarMenu, showMenu, hideMenu }}>
      {children}
    </UiContext.Provider>
  );
};
