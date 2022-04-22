import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../App'
import { isCorrectChoice } from '../Components/DataFetching'
import ResumeGameScreen from 'Components/ResumeGameScreen'
import EndScreen from 'Components/EndScreen'
import History from 'Components/History'

test('renders welcome page', () => {
  const { getByText } = render(<App />)
  expect(getByText('The Dice Game')).toBeInTheDocument()
  expect(getByText('Lets Roll')).toBeInTheDocument()
})

test('calculate correct choice', () => {
  expect(isCorrectChoice(1, 2, 2)).toBe(true)
  expect(isCorrectChoice(2, 1, 1)).toBe(true)
})

test('renders resume screen', () => {
  const { getByText } = render(<ResumeGameScreen handleResumeGame={() => {}} />)
  expect(getByText('Reload the previous game?')).toBeInTheDocument()
  expect(getByText('YES')).toBeInTheDocument()
  expect(getByText('NO')).toBeInTheDocument()
})

test('renders end screen', () => {
  const { getByText } = render(<EndScreen points={2} handleReset={() => {}} />)
  expect(getByText('Game Over')).toBeInTheDocument()
  expect(getByText('Your points: 2')).toBeInTheDocument()
  expect(getByText('Reset')).toBeInTheDocument()
})
