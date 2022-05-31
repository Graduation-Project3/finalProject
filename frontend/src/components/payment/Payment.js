import React, { useEffect } from "react";
import { render } from "react-dom";
import Styles from "./Styles";
import { Form, Field } from "react-final-form";
import Card from "./Card";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "./cardUtils";
import Axios from "axios";
import {useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';




function Payment() {
  const navigate = useNavigate();
  const token = localStorage.getItem("auth-token");
  const location = useLocation();
  const onSubmit = (values) => {
    Axios.post('/payment', { product: location.state.product, price: location.state.price, token: token }).then(response => {
      console.log(response);
      console.log('re');
      navigate(`/product/${location.state.product}`);
     /*  if (response.data.pay) {

          window.alert('succses')
      }
      else {
          navigate('/payment',{state:{product:product._id,price:price,token:token}});
      } */
  }).catch(err => console.log("err"))
  navigate(`/signIn`);
  };

  return (
    <Styles>
      <Form
      onSubmit={'hi'}
        render={({
          handleSubmit,
          form,
          submitting,
          pristine,
          values,
          active,
        }) => {
          return (
            <form >
              <Card
                number={values.number || ""}
                name={values.name || ""}
                expiry={values.expiry || ""}
                cvc={values.cvc || ""}
                focused={active}
              />
              <div>
              </div>
              <div>
                <Field
                  name="number"
                  component="input"
                  required
                  type="text"
                  pattern="[\d| ]{16,22}"
                  placeholder="Card Number"
                  format={formatCreditCardNumber}
                />
              </div>
              <div>
                <Field
                  name="name"
                  component="input"
                  type="text"
                  placeholder="Name"
                  required
                />
              </div>
              <div>
                <Field
                  name="expiry"
                  component="input"
                  type="text"
                  pattern="\d\d/\d\d"
                  placeholder="Valid Thru"
                  format={formatExpirationDate}
                  required
                />
                <Field
                  name="cvc"
                  component="input"
                  type="text"
                  pattern="\d{3,4}"
                  placeholder="CVC"
                  format={formatCVC}
                  required
                />
              </div>
              <div className="buttons"> 
                <button type="button" disabled={submitting} style={{display:"block"}} onClick={onSubmit} >
                  Submit
                </button>
              </div>
            </form>
          );
        }}
      />
    </Styles>
  );
}

export default Payment;