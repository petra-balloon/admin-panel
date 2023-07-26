import { toast } from "react-toastify"

export const toastStyle = {
  position: "top-center",
  closeDuration: 1000,
}

export const toastError = message => {
  toast.error(message, {
    position: toastStyle.position,
    autoClose: toastStyle.closeDuration,
  })
}
export const toastSuccess = message => {
  toast.success(message, {
    position: toastStyle.position,
    autoClose: toastStyle.closeDuration,
  })
}
