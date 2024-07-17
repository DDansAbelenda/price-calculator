
export const actionConst = {
  CREATE_PRODUCT: 1,
  UPDATE_PRODUCT: 2,
  DELETE_PRODUCT: 3,
  FETCH_PRODUCTS: 4,
  SET_NOTIFICATIONS: 5,
  SET_SERVER_NOTIFICATION: 6,
  MANAGE_OPEN_AND_CLOSE_DIALOG: 7
}

export const initialState = {
  products: [],
  selectedProduct: null,
  isDialogOpen: false,
  dialogPosition: { top: 0 },
  notifications: [],
  serverNotification: {typeError: "", error: false, isLoad: false},
}

export const reducer = (state, action) => {

  switch (action.type) {
    case actionConst.CREATE_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case actionConst.UPDATE_PRODUCT:
      return {
        ...state,
        videos: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    case actionConst.DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((product) => product.id !== action.payload),
      };
    case actionConst.MANAGE_OPEN_AND_CLOSE_DIALOG:
      return {
        ...state,
        selectedProduct: action.payload.product,
        isDialogOpen: action.payload.product != null ? true : false,
        dialogPosition: action.payload.dialogPosition
      };
    case actionConst.FETCH_PRODUCTS:
      return { ...state, videos: action.payload };
    case actionConst.SET_NOTIFICATIONS:
      return { ...state, notifications: action.payload };
    case actionConst.SET_SERVER_NOTIFICATION:
      return { ...state, serverNotification: action.payload }
    default:
      return state;
  }

};
