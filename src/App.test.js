import {screen, render, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as Errors from './constants/errors'
import * as WhatsAppConstants from './constants/whatsapp'
import App from './App'

it('attemps to open the whatsapp link with the given phone number', () => {
  jest.spyOn(window, 'open').mockImplementation(jest.fn)
  render(<App />)
  const phone = '11999999999'
  userEvent.type(screen.getByLabelText(/número/i), phone)
  userEvent.click(screen.getByRole('button', {name: /ir/i}))
  const url = `${WhatsAppConstants.URL}?phone=+55${phone}`
  expect(window.open).toHaveBeenCalledWith(url, '_blank')
})

it('displays an error message after leave the input with invalid phone number', () => {
  render(<App />)
  const inputElement = screen.getByLabelText(/número/i)
  const invalid = '11'
  userEvent.type(inputElement, invalid)
  fireEvent.blur(inputElement)
  expect(screen.getByRole('alert')).toHaveTextContent(Errors.INVALID_PHONE)
})

it('disables the submit button until the phone number is valid', () => {
  render(<App />)
  const submitButtonElement = screen.getByRole('button', {name: /ir/i})
  const inputElement = screen.getByLabelText(/número/i)
  const [ddd, number] = ['11', '9999999999']
  expect(submitButtonElement).toBeDisabled()
  userEvent.type(inputElement, ddd)
  expect(submitButtonElement).toBeDisabled()
  userEvent.type(inputElement, number)
  expect(submitButtonElement).toBeEnabled()
})

it('cancels submit if the phone number is invalid', () => {
  jest.spyOn(window, 'open').mockImplementation(jest.fn)
  render(<App />)
  userEvent.type(screen.getByLabelText(/número/i), '{enter}')
  expect(window.open).not.toHaveBeenCalled()
  expect(screen.getByRole('alert')).toHaveTextContent(Errors.INVALID_PHONE)
})
