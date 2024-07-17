import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"
import { actionConst } from "../context/reducer";


function useDialog() {
    const { state, dispatch } = useContext(GlobalContext);

    const openDialog = (product, rect) => {
        const payload = {
            product,
            dialogPosition: { top: rect.top + window.scrollY }
        }

        dispatch({
            type: actionConst.MANAGE_OPEN_AND_CLOSE_DIALOG,
            payload: { ...payload }
        })
    }


    const closeDialog = () => {
        dispatch({
            type: actionConst.MANAGE_OPEN_AND_CLOSE_DIALOG,
            payload: {
                product: null,
                dialogPosition: { top: 0 }
            }
        })
    }

    const selectedProduct = state.selectedProduct;

    const isDialogOpen = state.isDialogOpen;

    const dialogPosition = state.dialogPosition;

    return { selectedProduct, isDialogOpen, dialogPosition, openDialog, closeDialog, }
}

export default useDialog;