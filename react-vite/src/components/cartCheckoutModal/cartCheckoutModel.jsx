import { useModal } from '../../context/Modal'

const PaymentCheckoutModal = () => {
    const { closeModal } = useModal();

    const handleClose = () => {
        closeModal()
    };

    return (
        <div>
            <h1>Payment page coming soon...</h1>
            <button
            type='button'
            className='close-payment-confirmation'
            onClick={handleClose}>Close</button>
        </div>
    )
}

export default PaymentCheckoutModal
