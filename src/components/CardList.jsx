import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from './Card';
import './style.scss';
import { AddCard } from './AddCard';
import { EditCard } from './EditCard';
import { deleteCard } from '../redux/slices/dataSlice';

export const CardList = () => {
  const dispatch = useDispatch();
  const dataItem = useSelector((state) => state.data);
  const card = useSelector((state) => state.data.cards);
  const itemLength = dataItem.cards.length;
  const [activeCard, setActivCard] = React.useState(0);
  const [flip, setFlip] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [addNewCard, setAddNewCard] = React.useState(false);

  const prevCard = () => {
    if (activeCard > 0) {
      setActivCard(activeCard - 1);
      setFlip(false);
    }
  };

  const nextCard = () => {
    if (activeCard < itemLength - 1) {
      setActivCard(activeCard + 1);
      setFlip(false);
    }
  };

  const handleDeleteCard = (id) => {
    dispatch(deleteCard(id));
  };

  return (
    <>
      {!card.length && !addNewCard ? (
        <button onClick={() => setAddNewCard(true)}>Добавить карточку</button>
      ) : null}
      <div>
        {dataItem.loading && <h1>Идёт загрузка...</h1>}
        {!dataItem.loading && dataItem.error ? (
          <h1>Ошибка загрузки данных</h1>
        ) : null}
        {addNewCard ? (
          <AddCard addNewCard={addNewCard} setAddNewCard={setAddNewCard} />
        ) : !dataItem.loading && itemLength ? (
          <>
            <span>
              Количество карточек: {activeCard + 1} из {itemLength}
            </span>
            <div className='card-list'>
              {edit ? (
                <EditCard setEdit={setEdit} activeCard={activeCard} />
              ) : (
                <Card flip={flip} setFlip={setFlip} activeCard={activeCard} />
              )}
            </div>
            <button onClick={prevCard} disabled={activeCard <= 0}>
              Предыдущая
            </button>
            <button onClick={nextCard} disabled={activeCard >= itemLength - 1}>
              Следующая
            </button>
            <button onClick={() => setEdit(!edit)}>Редактировать</button>
            <button onClick={() => handleDeleteCard(card[activeCard])}>
              Удалить
            </button>
            <button onClick={() => setAddNewCard(true)}>Добавить</button>
          </>
        ) : null}
      </div>
    </>
  );
};
