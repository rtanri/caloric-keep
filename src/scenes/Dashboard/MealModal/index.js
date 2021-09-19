import { useState, useEffect } from 'react';
import { Button, Form, Input, notification } from 'antd';
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { FormattedMessage } from 'react-intl'
import { db } from '../../../data/services/firebase/firebase';
import { Text, H2, Spacer } from '../../../linaria-components';


const ModalInput = ({ closeModal, cardId }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [uniqueCardId, setUniqueCardId] = useState("")

  useEffect(() => {
    setUniqueCardId(cardId)
  }, [])

  const handleCancel = () => {
    closeModal()
    setIsLoading(false);
  };

  const refreshPage = () => {
    window.location.reload()
  }

  const onFinish = async (values) => {
    setIsLoading(true);
    console.log("==checking state==")
    console.log(values)

    try {
      const cardReference = doc(db, "cards", uniqueCardId);
      await updateDoc(cardReference, {
        meals: arrayUnion({
          name: values.meal_name,
          calories: values.calories,
        })
      })
      notification.open({
        message: "Input Success",
        placement: "topRight",
      });
      setIsLoading(false);
    }
    catch (e) {
      setIsLoading(false);
      notification.warning({
        message: "Input Failed",
        placement: "topRight",
      });
      console.log("Error adding document: ", e);
    }
    closeModal()
    refreshPage()
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
