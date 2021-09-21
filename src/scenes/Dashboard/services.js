import React, { useContext, useState, useEffect } from 'react'


export const getAllCard = async (deck, setCardDeck) => {
  try {
    let cardCollection = await deck.getCardsByUserId()
    console.log("service = cardCollection")
    console.log(cardCollection)
    // let docArray = []

    // cardCollection.forEach((doc) => {

    //   let currentCard = doc.data()
    //   currentCard.id = doc.id
    //   let total = 0

    //   if (currentCard.meals) {
    //     let mealArray = currentCard.meals
    //     let foodData = []

    //     if (mealArray[0]) {
    //       for (const key of mealArray) {
    //         foodData.push(`${key.name} (${key.calories})`)
    //         total += parseInt(key.calories);
    //       }
    //     }

    //     docArray.push({
    //       key: currentCard.id,
    //       id: currentCard.id,
    //       title: currentCard.title,
    //       user: currentCard.user_id,
    //       total: total,
    //       allMeals: foodData,
    //     })
    //     return;
    //   }

    //   docArray.push({
    //     key: currentCard.id,
    //     id: currentCard.id,
    //     title: currentCard.title,
    //     user: currentCard.user_id,
    //     total: total,
    //   })
    // })
    // setCardDeck(docArray)
  }
  catch (error) {
    console.log(error)
    return false
  }






}
