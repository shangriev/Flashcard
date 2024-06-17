import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCard } from '../redux/slices/dataSlice';

export const EditCard = ({ activeCard, setEdit }) => {
  const dispatch = useDispatch();
  const card = useSelector((state) =>
    state.data.cards.find((card) => card.id == activeCard),
  );

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    if (card) {
      setQuestion(card.question);
      setAnswer(card.answer);
    }
  }, [card]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(updateCard({ ...card, answer, question }));
      setEdit(false);
    } catch (error) {
      console.error('Ошибка изменения карточки', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='card card-edit'>
        <span>Вопрос:</span>
        <textarea
          className='question'
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <span>Ответ:</span>
        <textarea
          className='answer'
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button type='submit'>Сохранить</button>
        <button onClick={() => setEdit(false)}>Отменить</button>
      </div>
    </form>
  );
};
