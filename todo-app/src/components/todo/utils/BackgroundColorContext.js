// BackgroundColorContext.js

import React, { createContext, useState, useContext } from "react";

const BackgroundColorContext = createContext();

export const BackgroundColorProvider = ({ children }) => {
    const [backgroundColor, setBackgroundColor] = useState("#ffffff");

    const setAppBackgroundColor = (color) => {
        setBackgroundColor(color);
    };

    return (
        <BackgroundColorContext.Provider
            value={{ backgroundColor, setAppBackgroundColor }}
        >
            {children}
        </BackgroundColorContext.Provider>
    );
};

export const useBackgroundColor = () => useContext(BackgroundColorContext);
