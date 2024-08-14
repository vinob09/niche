import { useModal } from '../../context/Modal';
import './Navigation.css'

function refreshPage() {
  window.location.reload();
}
function OpenModalMenuItem({
  modalComponent, // component to render inside the modal
  itemText, // text of the button that opens the modal
  onItemClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) {
      setOnModalClose(onModalClose);
      refreshPage();
    }
    setModalContent(modalComponent);
    if (typeof onItemClick === "function") onItemClick();
  };

  return (
    <button onClick={onClick} className="modal-menu-item-button">
      {itemText}
    </button>
  );
}

export default OpenModalMenuItem;
