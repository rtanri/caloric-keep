import { useState, useEffect, useContext } from 'react';
import { FormattedMessage } from 'react-intl'
import { Button, Form, Input, notification } from 'antd';
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Text, H2, Spacer, Card } from '../../../linaria-components';
import { CardContext } from "../../../data/services/CardProvider"


const ModalNewCard = ({ closeModal, currentUserId, refreshAfterAddNewCard }) => {
  const deck = useContext(CardContext)
  const [isLoading, setIsLoading] = useState(false)
  const [uniqueUserId, setUniqueUserId] = useState("")

  useEffect(() => {
    setUniqueUserId(currentUserId)
  }, [])

  const handleCancel = () => {
    closeModal()
    setIsLoading(false);
  };

  const onFinish = async (values) => {
    setIsLoading(true);
    let newObj = {
      title: values.title,
      user_id: uniqueUserId,
    }
    const saveNewCardSuccess = await deck.saveNewCard(newObj)

    if (saveNewCardSuccess) {
      notification.open({
        message: "New card is saved successfully",
        placement: "bottomRight",
      });
    } else {
      notification.error({
        message: "Failed to save card",
        placement: "bottomRight",
      });
    }
    setIsLoading(false);
    refreshAfterAddNewCard();
    closeModal()
  }

  return (
    <div>
      <div className="modal-background" onClick={handleCancel}></div>
      <div className="modal-wrapper">
        <button className="close-button" onClick={handleCancel} >X</button>
        <div className="modal-header">
          <H2 textAlign="center">
            <FormattedMessage
              id="modal.new_card.header"
              defaultMessage="Enter Card Title"
            />
          </H2>
          <Spacer spacing={32} />
        </div>
        <div className="modal-body">
          <Form
            className="food-log-form"
            initialValues={{ remember: true }}
            requiredMark="optional"
            onFinish={onFinish}
          >
            <div className="food-log-form__input--wrapper">
              <div className="form-item--wrapper">
                <Text>
                  <FormattedMessage
                    id="modal.input.card_title"
                    defaultMessage="Title"
                  />
                </Text>

                <Form.Item
                  name="title"
                  rules={[{ required: true, message: "Enter card title" }]}
                >
                  <Input
                    prefix={<EditOutlined className="site-form-item-icon" />}
                    className="meal-name-input"
                  />
                </Form.Item>
              </div>
            </div>

            <div className="submit-button-wrapper">
              <Form.Item>
                <Button
                  htmlType="submit"
                  className="primary-button--full-width"
                  loading={isLoading}
                  disabled={isLoading}
                >
                  <FormattedMessage
                    id="modal.button.submit"
                    defaultMessage="Submit"
                  />
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ModalNewCard
