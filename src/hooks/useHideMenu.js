import React, { useEffect } from "react";

import { UiContext } from "../context/UiContext";

export const useHideMenu = (ocultar) => {
  const { showMenu, hideMenu } = React.useContext(UiContext);

  useEffect(() => {
    if (ocultar) {
      hideMenu();
    } else {
      showMenu();
    }
  }, [ocultar, hideMenu, showMenu]);

  return <div>useHideMenu</div>;
};
