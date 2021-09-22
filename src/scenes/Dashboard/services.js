import React, { useContext, useState, useEffect } from 'react'


export const setTotalAndAllMeals = (cardDataArray) => {
  let foodData = []
  let total = 0
  /* 
  [
    0: {calories: '600', name: 'ayam penyet'}
    1: {calories: '150', name: 'coconut water'}
    2: {calories: '250', name: 'snacks'}
    3: {calories: '450', name: 'dinner'}
  ]
  */
  for (const key of cardDataArray) {
    foodData.push(`${key.name} (${key.calories})`)
    total += parseInt(key.calories)
  }

  console.log(foodData)
  console.log(total)
  return
}

// // cardProvider
// const getOneCardData = async (cardId) => {
//   let updatedAllMeals = {}

//   try {
//     let aCardCollection = doc(db, "cards", cardId);
//     let oneUpdatedCard = await getDoc(aCardCollection)

//     updatedAllMeals["allMeals"] = oneUpdatedCard.data().meals
//     console.log(updatedAllMeals)
//     return updatedAllMeals
//   } catch (err) {
//     console.log(err)
//     return false
//   }
// }
