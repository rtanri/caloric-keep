import { useState, useEffect, useContext } from 'react';
import { Button, Form, Input, notification } from 'antd';
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { FormattedMessage } from 'react-intl'
import { Text, H2, Spacer } from '../../../linaria-components';
import { CardContext } from '../../../data/services/CardProvider';

const ModalInput = ({ closeModal, cardId }) => {
  const deck = useContext(CardContext)
  const [isLoading, setIsLoading] = useState(false)
  const [uniqueCardId, setUniqueCardId] = useState("")

  useEffect(() => {
    setUniqueCardId(cardId)
  }, [])

  const handleCancel = () => {
    closeModal()
    setIsLoading(false);
  };

  const onFinish = async (values) => {
    setIsLoading(true);
    if (!uniqueCardId) {
      return false
    }

    const saveMealSuccess = await deck.saveMealByCardId(uniqueCardId, values)
      .then(resp => {
        setIsLoading(false);
        closeModal();
      })
      .catch(err => {
        console.log("Error adding document: ", err);
      })
  };

  return (
    <div>
      <div className="modal-background" onClick={handleCancel}></div>
      <div className="modal-wrapper">
        <button className="close-button" onClick={handleCancel} >X</button>
        <div className="modal-header">
          <H2 textAlign="center">
            <FormattedMessage
              id="modal.form.header"
              defaultMessage="Record your meal"
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
                    id="modal.input.meal_name"
                    defaultMessage="Meal Name"
                  />
                </Text>
                {/* 1st item */}
                <Form.Item
                  name="meal_name"
                  rules={[{ required: true, message: "Enter food name" }]}
                >
                  <Input
                    prefix={<EditOutlined className="site-form-item-icon" />}
                    className="meal-name-input"
                  />
                </Form.Item>
              </div>

              {/* 2nd item */}
              <div className="form-item--wrapper">
                <Text>
                  <FormattedMessage
                    id="modal.input.calory_intake"
                    defaultMessage="Calory Intake (in kcal)"
                  />
                </Text>
                <Form.Item
                  name="calories"
                  rules={[
                    { required: true, message: "Enter calory intake" },
                  ]}
                >
                  <Input
                    prefix={<PlusOutlined className="site-form-item-icon" />}
                    className="meal-name-input"
                  />
                </Form.Item>
              </div>
            </div>

            {/* submit button */}
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

export default ModalInput
