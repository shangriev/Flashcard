import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCard } from '../redux/slices/dataSlice';

export const AddCard = ({ activeCard, addNewCard, setAddNewCard }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.data.cards.length).toString();
  const [question, setQuestion] = React.useState('');
  const [answer, setAnswer] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question !== '' && answer !== '') {
      dispatch(addCard({ id, question, answer }));
      setQuestion('');
      setAnswer('');
      setAddNewCard(false);
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
        <button type='submit'>Добавить</button>
      </div>
    </form>
  );
};
