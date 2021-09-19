import { db } from '../services/firebase/firebase'
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";


export const getAllCard = async (auth, printedSMR, setCardDeck, setIsLoading) => {
  let cardCollection = query(collection(db, "cards"), where("user_id", "==", auth.authUserID));

  const cardSnapshot = await getDocs(cardCollection)
  let docArray = []

  cardSnapshot.forEach((doc) => {

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
        meal1: foodData[0],
        meal2: foodData[1],
        meal3: foodData[2],
        meal4: foodData[3],
        meal5: foodData[4],
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
  setCardDeck(docArray)
  setIsLoading(false)
}

export const deleteOneCard = async (cardId) => {
  console.log(cardId)
  console.log(db)
  try {
    await deleteDoc(doc(db, "cards", cardId));
  } catch (err) {
    console.log(err)
  }
  window.location.reload()
}