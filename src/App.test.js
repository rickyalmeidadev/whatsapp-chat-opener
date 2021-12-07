import {screen, render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as WhatsAppConstants from './constants/whatsapp'
import App from './App'

it('attemps to open the whatsapp link with the given phone number', () => {
  jest.spyOn(window, 'open').mockImplementation(jest.fn)
  render(<App />)
  const phone = '11999999999'
  userEvent.type(screen.getByLabelText(/número/i), phone)
  userEvent.click(screen.getByRole('button', {name: /ir/i}))
  const url = `${WhatsAppConstants.URL}?phone=${phone}`
  expect(window.open).toHaveBeenCalledWith(url, '_blank')
})
