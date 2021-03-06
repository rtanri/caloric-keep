import React, { useState, useEffect, useContext } from 'react'
import DashboardPage from './template'
import { AuthContext } from '../../data/services/AuthProvider';
import { CardContext } from '../../data/services/CardProvider';
import { Skeleton, Button, notification } from "antd"
import ModalNewCard from "./NewCardModal"
import { FormattedMessage } from 'react-intl'
import { Text, Spacer, secondary } from '../../linaria-components'
import { set } from 'ramda';

const Dashboard = () => {
  const auth = useContext(AuthContext)
  const deck = useContext(CardContext)
  const [isLoading, setIsLoading] = useState(true)
  const [cardDeck, setCardDeck] = useState([])
  const [printedSMR, setPrintedSMR] = useState(2100)
  const [metaRate, setMetaRate] = useState([2100, 1800, 1650]);
  const [openNewCardModal, setOpenNewCardModal] = useState(false)
  const [authUser, setAuthUser] = useState("")

  useEffect(() => {
    setIsLoading(true)
    signInUser()
  }, [authUser])

  const signInUser = async () => {
    try {
      const validUserIdResp = await auth.authUserID
      console.log(`login success, user-id: ${validUserIdResp}`)
      setAuthUser(validUserIdResp)
      return true
    }
    catch (error) {
      console.log(error)
      return false
    }
    finally {
      fetchAllCardsData()
    }
  }

  const fetchAllCardsData = async () => {
    const getLatestCards = await deck.getLatestCardsByUserId()
      .then(latestCardResponse => {
        setCardDeck(latestCardResponse)
      })
      .catch(err => {
        notification.error({
          message: "Failed to update cards",
          placement: "bottomRight",
        })
        console.log("Error deleting document: ", err);
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const Add = metaRate.map(Add => Add)
  const handleMetaRateDropdown = (e) => {
    setPrintedSMR(metaRate[e.target.value])
  }

  const handleAddNewCard = () => {
    setOpenNewCardModal(true)
  }

  if (isLoading) {
    return (<Skeleton active={true} />)
  }

  return (
    <>
      <div className="dashboard-setting--wrapper">
        <div className="dashboard__metabolism-rate--wrapper">
          <Text color={secondary} display="inline">
            <FormattedMessage
              id="dashboard.metabolism.rate"
              defaultMessage='My current static-metabolism-rate: {rate}'
              values={{ rate: `${printedSMR}` }}
            />
          </Text>

          <select onChange={e => handleMetaRateDropdown(e)} className="dropdown--metaRate">
            {
              Add.map((calories, key) => <option value={key}>{calories}</option>)
            }
          </select>
        </div>
        <div className="dashboard__button--new-card">
          <Button
            className="primary-button--full-width"
            onClick={handleAddNewCard}
          >
            <FormattedMessage
              id="dashboard.button.new_card"
              defaultMessage="Add New Card"
            />
          </Button>
        </div>
      </div>

      {
        openNewCardModal &&
        <ModalNewCard
          closeModal={() => setOpenNewCardModal(false)}
          currentUserId={auth.authUserID}
          refreshAfterAddNewCard={() => fetchAllCardsData()}
        />
      }

      <Spacer spacing={32} />

      <DashboardPage
        cardDeck={cardDeck}
        printedSMR={printedSMR}
        refreshAllCards={() => fetchAllCardsData()}
      />
    </>
  )
}

export default Dashboard