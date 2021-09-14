import { useState, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { H2 } from '../../../linaria-components';
import { EditOutlined, PlusOutlined } from "@ant-design/icons";


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

  const handleOk = () => {
    setModalText('Saving data.. this will be closed once finished');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      closeModal()
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    closeModal()
  };

  const modalContent = () => {

    return (
      <Form className="food-log-form">
        <div className="food-log-form__input--wrapper">
          <Form.Item
            id="meal-name"
            name="Food"
            className="form-item-meal"
            rules={[{ required: true, message: "Enter your meal name" }]}
          >
            <Input
              prefix={<EditOutlined className="site-form-item-icon" />}
              placeholder="Meal (e.g. burrito)"
              onChange={e => (setMealName(e.target.value))}
              className="meal-name-input"
            />
          </Form.Item>

          <Form.Item
            id="calories"
            name="calories"
            className="form-item-calories"
            rules={[{ required: true, message: "How much is the calories (in kcal)?" }]}
          >
            <Input
              prefix={<PlusOutlined className="site-form-item-icon" />}
              placeholder="Calories (700 kcal)"
              onChange={e => (setCalories(e.target.value))}
              className="calories-input"
            />
          </Form.Item>
        </div>

        <div className="food-log-form__input--wrapper">
          <Form.Item
            id="other-meal-name"
            name="other-food"
            className="form-item-meal"
          >
            <Input
              prefix={<EditOutlined className="site-form-item-icon" />}
              placeholder="Other Meal (e.g. mcspicy)"
              onChange={e => (setOtherMealName(e.target.value))}
              className="meal-name-input"
            />
          </Form.Item>

          <Form.Item
            id="other-calories"
            name="other-calories"
            className="form-item-calories"
          >
            <Input
              prefix={<PlusOutlined className="site-form-item-icon" />}
              placeholder="Calories (1200 kcal)"
              onChange={e => (setOtherCalories(e.target.value))}
              className="calories-input"
            />
          </Form.Item>
        </div>
      </Form>
    )
  }

  return (
    <div clasName="modal-background">
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
          <Button className="primary-button" onClick={handleOk} loading={isLoading} >Save</Button>
        </div>
      </div>

    </div>
  );
};

export default ModalInput