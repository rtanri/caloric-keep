// call card collection only (title and user_id)
import { db } from '../../services/firebase/firebase";

const getAllCard = async () => {
  const result = await getDocs(collection(db, "cards"), where("user_id", "==", "CuGTCvX8Y6B7gIKvcfAy"))
    .then(docResp => {
      let docArray = [];
      docResp.forEach((card) => {
        let total = 0
        let remain = 0
        let card_color = COLOR_GREEN.green

        if (card.data().meals) {
          let mealArray = card.data().meals
          let mealz = []

          if (mealArray[0]) {

            for (const key of mealArray) {
              mealz.push(`${key.name} (${key.calories})`)
              total += parseInt(key.calories);
            }
            if (total >= metabolism_rate) {
              card_color = COLOR_RED.red
            }
            remain = metabolism_rate - total
            console.log(remain)
          }

          docArray.push({
            key: card.id,
            id: card.id,
            title: card.data().title,
            user: card.data().user_id,
            color: card_color,
            total: total,
            remain: remain,
            meal1: mealz[0],
            meal2: mealz[1],
            meal3: mealz[2],
            meal4: mealz[3],
            meal5: mealz[4],
          })
          return;
        }

        docArray.push({
          key: card.id,
          id: card.id,
          title: card.data().title,
          user: card.data().user_id,
          color: card_color,
          total: total,
          remain: remain,
        })
      }
      )
      console.log(docArray)
      return docArray
    })
    .catch(err => {
      console.log(err)
    })
  console.log(typeof metabolism_rate)
  setCardDeck(result)
}