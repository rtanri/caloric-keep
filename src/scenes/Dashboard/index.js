import React, { useState, useEffect, useContext } from 'react'
import DashboardPage from './template'
import { AuthContext } from '../../data/services/AuthProvider';
import { getAllCard } from "../../data/api/dashboard_api"
import { Skeleton, Button } from "antd"
import ModalNewCard from "./NewCardModal"
import { FormattedMessage } from 'react-intl'
import { Text, Spacer, secondary } from '../../linaria-components'

const Dashboard = () => {
  const auth = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)
  const [cardDeck, setCardDeck] = useState([])
  const [printedSMR, setPrintedSMR] = useState(2100)
  const [metaRate, setMetaRate] = useState([2100, 1800, 1650]);
  const [openNewCardModal, setOpenNewCardModal] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    signInUser()
    setTimeout(() => {
      fetchAllCardsData()
    }, 2000)
  }, [])

  const signInUser = async () => {
    const validUserId = await auth.authUserID
    if (validUserId) {
      console.log(`right: ${validUserId}`)
      return true
    } else {
      console.log(`wrong: ${validUserId}`)
      return false
    }
  }

  const fetchAllCardsData = () => {
    getAllCard(auth, printedSMR, setCardDeck, setIsLoading)
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
        <ModalNewCard closeModal={() => setOpenNewCardModal(false)} currentUserId={auth.authUserID} />
      }

      <Spacer spacing={32} />

      <DashboardPage
        cardDeck={cardDeck}
        printedSMR={printedSMR}
      />
    </>
  )
}

export default Dashboard