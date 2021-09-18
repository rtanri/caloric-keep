import { useState, useEffect } from 'react';
import { Button, Form, Input, notification } from 'antd';
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { doc, setDoc } from "firebase/firestore";
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
    // console.log("==checking new card==")
    let newObj = {
      title: values.title,
      user_id: uniqueUserId,
      meals: ({
        name: values.meal_name,
        calories: values.calories,
      })
    }
    // console.log(newObj)

    try {
      console.log(1)
      const collectionRef = db
      console.log(collectionRef)
      // await setDoc(doc(db, "cards"), newObj)
      // notification.open({
      //   message: "New card is created",
      //   placement: "topRight",
      // });
      console.log(2)
      setIsLoading(false);
    }
    catch (e) {
      console.log(3)
      setIsLoading(false);
      notification.warning({
        message: "Card created failed",
        placement: "topRight",
      });
      console.log("Error adding document: ", e);
    }
    console.log(4)
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