// call card collection only (title and user_id)
const getAllCard = () => {
  let docArray = [];
  getDocs(collection(db, "cards"), where("user_id", "==", "CuGTCvX8Y6B7gIKvcfAy"))
    .then(docResp => {
      docResp.forEach((card) => {
        docArray.push({ key: card.id, title: card.data().title, user: card.data().user_id })
      })
      console.log(docArray)
      return docArray
    })
    .catch(err => {
      console.log(err)
    })
  setCardDeck(docArray)
  console.log(cardDeck)
}