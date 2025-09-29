import React, { createContext, useReducer } from "react";

export const GlobalContext = createContext();

const initialState = {
  user: null,
  users: [], 
  cards: [],      // card: { id, title, category, sub, subSub, images: [] }
  products: [],   // product: { id, cardId, name, price, category, images: [] }
  cart: [],       // { productId, qty }
  orders: []      // { id, items: [{...product, qty}], total, date }
};

function reducer(state, action) {
  switch (action.type) {
    case "SIGNUP": {
      return { ...state, users: [...state.users, action.payload] };
    }
    case "LOGIN": {
      return { ...state, user: action.payload };
    }
    case "LOGOUT": {
      return { ...state, user: null };
    }

    case "ADD_CARD": {
      return { ...state, cards: [...state.cards, action.payload] };
    }

    case "UPDATE_CARD": {
      const updated = state.cards.map(c => c.id === action.payload.id ? action.payload : c);
      console.log(updated);
      
      return { ...state, cards: updated };
    }

    case "DELETE_CARD": {
      const id = action.payload;
      return {
        ...state,
        cards: state.cards.filter(c => c.id !== id),
        products: state.products.filter(p => p.cardId !== id)
      };
    }

    case "ADD_PRODUCT": {
      return { ...state, products: [...state.products, action.payload] };
    }

   case "EDIT_PRODUCT": {
  const updated = state.products.map((p) =>
    String(p.id) === String(action.payload.id) ? { ...p, ...action.payload } : p
  );
  return { ...state, products: updated };
}


case "DELETE_PRODUCT": {
  const filtered = state.products.filter((p) => p.id !== action.payload);
  return { ...state, products: filtered };
}


    case "ADD_TO_CART": {
      const { productId } = action.payload;
      const found = state.cart.find(i => i.productId === productId);
      if (found) {
        return {
          ...state,
          cart: state.cart.map(i => i.productId === productId ? { ...i, qty: i.qty + 1 } : i)
        };
      } else {
        return { ...state, cart: [...state.cart, { productId, qty: 1 }] };
      }
    }

    case "REMOVE_FROM_CART": {
      return { ...state, cart: state.cart.filter(i => i.productId !== action.payload) };
    }

    case "CHANGE_QTY": {
      const { productId, qty } = action.payload;
      return { ...state, cart: state.cart.map(i => i.productId === productId ? { ...i, qty } : i) };
    }

   case "CHECKOUT": {
  const { items, total, customer } = action.payload;
  // const order = {
  //   id: Date.now().toString(),
  //   items,
  //   total,
  //   customer,
  //   date: new Date().toISOString(),
  // };
  return { ...state, orders: [...state.orders, action.payload], cart: [] };
}


    case "CLEAR_ALL":
      return initialState;

    default:
      return state;
  }
}

export function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = { state, dispatch };
  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
}
