import {useEffect, useState} from 'react'
import * as Errors from './constants/errors'
import * as WhatsAppConstants from './constants/whatsapp'
import * as Firebase from './services/firebase'
import * as PhoneUtils from './utils/phone'

const App = () => {
  const [phone, setPhone] = useState('')
  const [touched, setTouched] = useState(false)
  const [error, setError] = useState('')
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    const isValid = PhoneUtils.isValid(phone)
    setError(isValid ? '' : Errors.INVALID_PHONE)
    setIsValid(isValid)
  }, [phone])

  const handleBlur = event => {
    setTouched(true)
  }

  const handleChange = event => {
    setPhone(PhoneUtils.mask(event.target.value))
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (!isValid) {
      setTouched(true)
      setError(Errors.INVALID_PHONE)
      return
    }
    const unmaskedPhone = PhoneUtils.unmask(phone)
    const url = `${WhatsAppConstants.URL}?phone=+55${PhoneUtils.unmask(unmaskedPhone)}`
    Firebase.logEvent('generate_lead', {value: unmaskedPhone})
    window.open(url, '_blank')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="phone-input">Número: </label>
      <input
        type="tel"
        name="phone"
        id="phone-input"
        placeholder="(xx) xxxxx-xxxx"
        onBlur={handleBlur}
        onChange={handleChange}
        value={phone}
        aria-errormessage="phone-error"
        aria-invalid={Boolean(touched && error)}
      />
      {touched && error && (
        <span role="alert" id="phone-error">
          {error}
        </span>
      )}
      <button type="submit" disabled={!isValid}>
        Ir
      </button>
    </form>
  )
}

export default App
