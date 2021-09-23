import React, { useContext } from "react";
import { db } from './firebase/firebase'
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
  arrayUnion
} from "firebase/firestore";
import { AuthContext } from './AuthProvider';

export const CardContext = React.createContext({});

export default function CardProvider({ children }) {
  const auth = useContext(AuthContext)

  const getLatestCardsByUserId = async () => {
    let cardDeckArray;
    try {
      let cardCollection = query(collection(db, "cards"), where("user_id", "==", auth.authUserID));
      cardDeckArray = await getDocs(cardCollection)
      
    } catch (err) {
      return false
    } finally {
      let docArray = []
      cardDeckArray.forEach((doc) => {

        let currentCard = doc.data()
        currentCard.id = doc.id
        let total = 0

        if (currentCard.meals) {
          let mealArray = currentCard.meals
          let foodData = []

          if (mealArray[0]) {
            for (const key of mealArray) {
              foodData.push(`${key.name} (${key.calories})`)
              total += parseInt(key.calories);
            }
          }
          
          docArray.push({
            key: currentCard.id,
            id: currentCard.id,
            title: currentCard.title,
            user: currentCard.user_id,
            total: total,
            allMeals: foodData,
          })
          return;
        }

        docArray.push({
          key: currentCard.id,
          id: currentCard.id,
          title: currentCard.title,
          user: currentCard.user_id,
          total: total,
        })
      })
      // === forEach ended

      return docArray
    }
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

  const getOneCardData = async (cardId) => {
    let updatedAllMeals = []

    try {
      // let myCard = {}
      let aCardCollection = doc(db, "cards", cardId);
      let oneUpdatedCard = await getDoc(aCardCollection)

      updatedAllMeals.push({
        allMeals: oneUpdatedCard.data().meals,
      })
      return updatedAllMeals
    } catch (err) {
      console.log(err)
      return false
    }
  }

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
      value={{
        getLatestCardsByUserId,
        saveNewCard,
        saveMealByCardId,
        getOneCardData,
        deleteOneCard
      }}
    >
      {children}
    </CardContext.Provider>
  );
}
