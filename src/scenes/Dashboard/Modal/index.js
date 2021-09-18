import { useState, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { FormattedMessage } from 'react-intl'
import { db } from '../../../services/firebase/firebase';
import { Text, H2, Spacer } from '../../../linaria-components';


const ModalInput = ({ closeModal }) => {
  // const [modalBody, setModalBody] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const testCardID = "7ltvd30AQzDymXsptrto"

  useEffect(() => {
    // setModalBody(modalContent(onFinish, setMealName, setCalories, isLoading))
  }, [])

  const handleCancel = () => {
    closeModal()
    setIsLoading(false);
  };


  const CloseButton = () => {
    return (
      <Button className="primary-button--full-width" loading={isLoading} onClick={handleCancel}>
        <FormattedMessage
          id="modal.button.close"
          defaultMessage="Close"
        />
      </Button>
    )
  }

  // const handleOK = async (props) => {
  const onFinish = async (values) => {
    // setModalBody('Saving data...');
    setIsLoading(true);


    console.log("==checking state==")
    console.log(values)

    try {
      const cardReference = doc(db, "cards", testCardID);
      await updateDoc(cardReference, {
        meals: arrayUnion({
          name: values.meal_name,
          calories: values.calories,
        })
      })

      setIsLoading(false);
      // setModalBody(
      //   <>
      //     <Text>Your input is saved succesfully'</Text>
      //     <Spacer spacing={32} />
      //     <CloseButton />
      //   </>
      // );

    }
    catch (e) {
      setIsLoading(false);
      // setModalBody('Input Failed');
      console.log("Error adding document: ", e);
    }
    closeModal()
  };


  return (
    <div>
      <div className="modal-background" onClick={() => closeModal()}></div>
      <div className="modal-wrapper">
        <button className="close-button" onClick={() => closeModal()} >X</button>
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
              {/* 1st item */}
              <Form.Item
                name="meal_name"
                rules={[{ required: true, message: "Enter food name" }]}
              >
                <Text>
                  <FormattedMessage
                    id="modal.input.meal_name"
                    defaultMessage="Meal Name"
                  />
                </Text>
                <Input
                  prefix={<EditOutlined className="site-form-item-icon" />}
                  className="meal-name-input"
                />
              </Form.Item>

              {/* 2nd item */}
              <Form.Item
                name="calories"
                rules={[
                  { required: true, message: "Enter calory intake" },
                ]}
              >
                <Text>
                  <FormattedMessage
                    id="modal.input.calory_intake"
                    defaultMessage="Calory Intake (in kcal)"
                  />
                </Text>
                <Input
                  prefix={<PlusOutlined className="site-form-item-icon" />}
                  className="meal-name-input"
                />
              </Form.Item>
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




// const modalContent = (onFinish, setMealName, setCalories, isLoading) => {
//   return (
//     <Form
//       className="food-log-form"
//       initialValues={{ remember: true }}
//       onFinish={onFinish}
//     >
//       <div className="food-log-form__input--wrapper">
//         <Form.Item
//           name="meal_name"
//           className="form-item-label"
//           rules={[{ required: true, message: "Enter your meal name" }]}
//         >
//           <Text>
//             <FormattedMessage
//               id="modal.input.meal_name"
//               defaultMessage="Meal Name"
//             />
//           </Text>
//           <Input
//             prefix={<EditOutlined className="site-form-item-icon" />}
//             placeholder="e.g. burrito, salad"
//             onChange={e => (setMealName(e.target.value))}
//             className="meal-name-input"
//           />
//         </Form.Item>

//         <Form.Item
//           name="calories"
//           className="form-item-label"
//           rules={[{ required: true, message: "How much is the calories (in kcal)?" }]}
//         >
          // <Text>
          //   <FormattedMessage
          //     id="modal.input.calory_intake"
          //     defaultMessage="Calory Intake (in kcal)"
          //   />
          // </Text>
//           <Input
//             prefix={<PlusOutlined className="site-form-item-icon" />}
//             placeholder="e.g. 250 or 800"
//             onChange={e => (setCalories(e.target.value))}
//             className="calories-input"
//           />
//         </Form.Item>
//       </div>

//       <Form.item>
//         <Button
//           htmlType="submit"
//           className="primary-button--full-width"
//           loading={isLoading}
//           disabled={isLoading}
//         >
          // <FormattedMessage
          //   id="modal.button.submit"
          //   defaultMessage="Submit"
          // />
//         </Button>
//       </Form.item>

//     </Form>
//   )
// }

