import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  cards: [],
  error: '',
};

export const fetchData = createAsyncThunk('cards/fetchData', () => {
  return axios
    .get('http://192.168.88.254:3001/cards')
    .then((response) => response.data);
});

export const updateCard = createAsyncThunk('cards/updateCard', async (card) => {
  try {
    const response = await axios.put(
      `http://192.168.88.254:3001/cards/${card.id}`,
      card,
    );
    return response.data;
  } catch (error) {
    console.error('Ошибка в обновлении карточки', error);
  }
});

export const deleteCard = createAsyncThunk('cards/deleteCard', async (card) => {
  try {
    await axios.delete(`http://192.168.88.254:3001/cards/${card.id}`);
    return card.id;
  } catch (error) {
    console.error('Ошибка в удалении карточки', error);
  }
});

export const addCard = createAsyncThunk('cards/addCard', async (card) => {
  try {
    const response = await axios.post(`http://192.168.88.254:3001/cards`, card);
    return response.data;
  } catch (error) {
    console.error('Ошибка в добавлении новой карточки', error);
  }
});

const dataSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.loading = false;
      state.cards = action.payload;
      state.error = '';
    });

    builder.addCase(updateCard.fulfilled, (state, action) => {
      const index = state.cards.findIndex(
        (card) => card.id === action.payload.id,
      );
      if (index !== -1) {
        state.cards[index] = action.payload;
      }
    });

    builder.addCase(deleteCard.fulfilled, (state, action) => {
      const index = state.cards.findIndex((card) => card.id === action.payload);
      if (index !== -1) {
        state.cards.splice(index, 1);
      }
    });

    builder.addCase(addCard.fulfilled, (state, action) => {
      state.cards.push(action.payload);
    });

    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.cards = [];
      state.error = action.error.message;
    });
  },
});

export default dataSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const initialState = {
//   loading: false,
//   cards: [],
//   error: '',
// };

// export const fetchData = createAsyncThunk('cards/fetchData', () => {
//   return axios.get('http://192.168.88.254:3001/cards').then((res) => res.data);
// });

// export const addCard = createAsyncThunk('cards/addCard', async (card) => {
//   try {
//     const response = await axios.post('http://192.168.88.254:3001/cards', card);
//     return response.data;
//   } catch (error) {
//     console.error('Ошибка добавлении карточки', error);
//   }
// });

// export const updateCard = createAsyncThunk('cards/updateCard', async (card) => {
//   try {
//     const response = await axios.put(
//       `http://192.168.88.254:3001/cards/${card.id}`,
//       card,
//     );
//     return response.data;
//   } catch (error) {
//     console.error('Ошибка обновлении карточки', error);
//   }
// });

// export const deleteCard = createAsyncThunk('cards/deleteCard', async (card) => {
//   try {
//     await axios.delete(`http://192.168.88.254:3001/cards/${card.id}`);
//     return card.id;
//   } catch (error) {
//     console.error('Ошибка удалении карточки', error);
//   }
// });

// const dataSlice = createSlice({
//   name: 'data',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(fetchData.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(fetchData.fulfilled, (state, action) => {
//       state.loading = false;
//       state.cards = action.payload;
//       state.error = '';
//     });

//     builder.addCase(addCard.fulfilled, (state, action) => {
//       state.cards.push(action.payload);
//     });

//     builder.addCase(deleteCard.fulfilled, (state, action) => {
//       const index = state.cards.findIndex((card) => card.id === action.payload);
//       if (index !== -1) {
//         state.cards.splice(index, 1);
//       }
//     });

//     builder.addCase(updateCard.fulfilled, (state, action) => {
//       const index = state.cards.findIndex(
//         (card) => card.id === action.payload.id,
//       );
//       if (index !== -1) {
//         state.cards[index] = action.payload;
//       }
//     });

//     builder.addCase(fetchData.rejected, (state, action) => {
//       state.loading = false;
//       state.cards = [];
//       state.error = action.error.message || 'Ошибка загрузки карточек';
//     });
//   },
// });

// export default dataSlice.reducer;
