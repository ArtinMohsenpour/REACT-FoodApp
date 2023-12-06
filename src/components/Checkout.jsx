import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import Input from "./UI/Input";
import { currencyFormatter } from "../util/formatting";
import UserProgressContext from "../store/UserProgressContext";

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify({
        items: cartCtx.items,
        customers: customerData,
      })
    });
  }

  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={userProgressCtx.progress === "checkout" ? handleClose : null}
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

        <Input type="text" lable="Full Name" id="name" />
        <Input type="email" lable="E-mail Address" id="email" />
        <Input type="text" lable="Street" id="Street" />
        <div className="control-row">
          <Input type="text" lable="Postal Code" id="postal-code" />
          <Input type="text" lable="City" id="city" />
        </div>

        <p className="modal-actions">
          <button onClick={handleClose} className="text-button" type="button">
            Close
          </button>
          <button className="text-button">Submit</button>
        </p>
      </form>
    </Modal>
  );
}
