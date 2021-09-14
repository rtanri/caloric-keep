import { useState, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { collection, addDoc } from "firebase/firestore";
import { firebaseApp, db } from '../../../services/firebase/firebase';
import { Text } from '../../../linaria-components';


const ModalInput = ({ closeModal }) => {
  const [modalText, setModalText] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [mealName, setMealName] = useState("")
  const [calories, setCalories] = useState(null)
  const [otherMealName, setOtherMealName] = useState("")
  const [otherCalories, setOtherCalories] = useState(null)

  useEffect(() => {
    setModalText(modalContent)
    return () => {
    }
  }, [])

  const testCardID = "7GvhOprgJf3qSHCfCdNw"

  // const onFinish = values => {
  const handleOK = async () => {
    setModalText('Saving data...');
    setIsLoading(true);

    try {
      const docRef = await addDoc(collection(db, "meals"), {
        meal_name: mealName,
        calories: calories,
        card_id: testCardID
      });
      console.log("Record written with ID: ", docRef.id);
      setIsLoading(false);
      setModalText('Your input is saved succesfully');
    }
    catch (e) {
      setIsLoading(false);
      setModalText('Input Failed');
      console.log("Error adding document: ", e);
    }

    setTimeout(() => {
      closeModal()
    }, 2000)
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    closeModal()
    setIsLoading(false);
  };

  const modalContent = () => {
    return (
      <Form className="food-log-form"
      // initialValues={{ remember: true }} onFinish={onFinish}
      >
        <div className="food-log-form__input--wrapper">
          <Form.Item
            id="meal-name"
            name="food"
            className="form-item-label"
            rules={[{ required: true, message: "Enter your meal name" }]}
          >
            <Text>Meal Name</Text>
            <Input
              prefix={<EditOutlined className="site-form-item-icon" />}
              placeholder="e.g. burrito, salad"
              onChange={e => (setMealName(e.target.value))}
              className="meal-name-input"
            />
          </Form.Item>

          <Form.Item
            id="calories"
            name="calories"
            className="form-item-label"
            rules={[{ required: true, message: "How much is the calories (in kcal)?" }]}
          >
            <Text>Calory Intake (in kcal)</Text>
            <Input
              prefix={<PlusOutlined className="site-form-item-icon" />}
              placeholder="e.g. 250 or 800"
              onChange={e => (setCalories(e.target.value))}
              className="calories-input"
            />
          </Form.Item>
        </div>
      </Form>
    )
  }

  return (
    <div>
      <div className="modal-background" onClick={() => closeModal()}></div>
      <div className="modal-wrapper">
        <button className="close-button" onClick={() => closeModal()} >X</button>
        <div className="modal-header">
          <h1>Record your meal</h1>
        </div>
        <div className="modal-body">
          {modalText}
        </div>
        <div className="modal-footer">
          <Button className="secondary-button" onClick={handleCancel} >Cancel</Button>
          <Button className="primary-button" loading={isLoading} onClick={handleOK}>Save</Button>
        </div>

      </div>


    </div>
  );
};

export default ModalInput