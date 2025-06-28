import * as yup from "yup"
import { id } from "yup-locales"

export default function () {
   const locale: yup.LocaleObject = {
      mixed: {
         required: "${path} harus diisi",
         oneOf: "${path} harus salah satu dari ${values}",
      },
      array: {
         min: "${path} harus memiliki setidaknya ${min} item",
      },
   }
   yup.setLocale({ ...id, ...locale })
   return yup
}
