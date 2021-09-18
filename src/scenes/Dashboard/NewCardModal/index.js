import { useState, useEffect } from 'react';
import { Button, Form, Input, notification } from 'antd';
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { doc, updateDoc, setDoc } from "firebase/firestore";
import { FormattedMessage } from 'react-intl'
import { db } from '../../../services/firebase/firebase';
import { Text, H2, Spacer } from '../../../linaria-components';


const ModalNewCard = ({ closeModal, currentUserId }) => {
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
    console.log("==checking new card==")
    console.log(values)
    let newObj = {
      title: values.title,
      user_id: uniqueUserId,
      meals: ({
        name: values.meal_name,
        calories: values.calories,
      })
    }

    try {
      await setDoc(doc(db, "cards"), newObj)
      notification.open({
        message: "New card is created",
        placement: "topRight",
      });
      setIsLoading(false);
    }
    catch (e) {
      setIsLoading(false);
      notification.warning({
        message: "Card created failed",
        placement: "topRight",
      });
      console.log("Error adding document: ", e);
    }
    closeModal()
  };

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
                {/* 1st item */}
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

export default ModalNewCard
