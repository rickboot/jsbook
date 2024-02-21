import React from 'react';
import { useActions } from '../hooks/use-actions';
import './ActionBar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

interface ActionButtonsProps {
  id: string;
}
const ActionButtons: React.FC<ActionButtonsProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();
  return (
    <div className='action-bar'>
      <Button icon='fas fa-arrow-up' onClick={() => moveCell(id, 'up')} />
      <Button icon='fas fa-arrow-down' onClick={() => moveCell(id, 'down')} />
      <Button icon='fas fa-times' onClick={() => deleteCell(id)} />
    </div>
  );
};

interface ButtonsProps {
  icon: string;
  onClick: () => {};
}
const Button: React.FC<ButtonsProps> = ({ icon, onClick }) => {
  return (
    <button className='button is-primary is-small' onClick={onClick}>
      <span className='icon'>
        <i className={icon} />
      </span>
    </button>
  );
};

export default ActionButtons;
