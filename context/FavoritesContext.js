import React, { createContext, useState } from "react";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const addFavorite = (pet) => {
        setFavorites((prevFavorites) => [...prevFavorites, pet]);
    };

    const removeFavorite = (petId) => {
        setFavorites((prevFavorites) =>
            prevFavorites.filter((pet) => pet.id !== petId)
        );
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};