import React, { useState, useEffect } from "react";
import { db } from './firebase/firebase'
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
  arrayUnion
} from "firebase/firestore";

export const CardContext = React.createContext({});

export default function CardProvider({ children }) {
  useEffect(() => {
  }, []);

  const getCardsByUserId = () => {
    return true
  };

  const saveNewCard = async (newObj) => {
    try {
      const collectionRef = collection(db, "cards")
      await setDoc(doc(collectionRef), newObj)
      return true
    } catch (err) {
      return false
    }
  };

  const saveMealByCardId = async (uniqueCardId, values) => {
    try {
      const cardReference = doc(db, "cards", uniqueCardId);
      await updateDoc(cardReference, {
        meals: arrayUnion({
          name: values.meal_name,
          calories: values.calories,
        })
      })
      return true
    } catch (err) {
      return false
    }
  };

  const deleteOneCard = async (cardId) => {
    try {
      await deleteDoc(doc(db, "cards", cardId));
      return true
    } catch (err) {
      return false
    }
  };

  return (
    <CardContext.Provider
      value={{ getCardsByUserId, saveNewCard, saveMealByCardId, deleteOneCard }}
    >
      {children}
    </CardContext.Provider>
  );
}
