import { useModal } from '../../context/Modal'
import './cartCheckout.css'

const PaymentCheckoutModal = () => {
    const { closeModal } = useModal();

    const handleClose = () => {
        closeModal()
    };

    return (
        <div>
            <h1>Checkout Successful!</h1>
            <p>Project website and we will not accept real payments</p>
            <div>
            </div>
            <button
            type='button'
            className='close-payment-confirmation'
            onClick={handleClose}>Close</button>
        </div>
    )
}

export default PaymentCheckoutModal
