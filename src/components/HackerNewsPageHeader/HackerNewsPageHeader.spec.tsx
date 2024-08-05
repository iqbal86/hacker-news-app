import { fireEvent, queries, RenderResult } from '@testing-library/react'
import HackerNewsPageHeader from './HackerNewsPageHeader'
import RenderWrapper from '../../test/RenderWrapper'
import '@testing-library/jest-dom'

let component: RenderResult<typeof queries>

const hackerNewsPageHeaderPrefix = 'HackerNewsPageHeader_'

describe('HackerNewsPageHeader Tests', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should render', () => {
    component = RenderWrapper(<HackerNewsPageHeader />)
    const title = component.getByTestId(`${hackerNewsPageHeaderPrefix}_title`)
    expect(component).toBeTruthy()
    expect(title).toBeInTheDocument()
  })

  it('should open menu when menu icon is clicked', () => {
    component = RenderWrapper(<HackerNewsPageHeader />)
    const pages = ['New', 'Past', 'Comments', 'Ask', 'Show', 'Jobs', 'Submit']

    const menuIcon = component.getByTestId(
      `${hackerNewsPageHeaderPrefix}_menuIcon`,
    )
    fireEvent.click(menuIcon)

    pages.forEach((page) => {
      expect(
        component.getByTestId(`${hackerNewsPageHeaderPrefix}_menuItem${page}`),
      ).toBeInTheDocument()
    })
    expect(
      component.getByTestId(`${hackerNewsPageHeaderPrefix}_loginMenuItem`),
    ).toBeInTheDocument()
  })

  it('should close menu when a menu item is clicked', () => {
    component = RenderWrapper(<HackerNewsPageHeader />)
    const menuIcon = component.getByTestId(
      `${hackerNewsPageHeaderPrefix}_menuIcon`,
    )
    fireEvent.click(menuIcon)

    const newMenuItem = component.getByTestId(
      `${hackerNewsPageHeaderPrefix}_menuItemNew`,
    )
    expect(newMenuItem).toBeVisible()
    fireEvent.click(newMenuItem)
    expect(newMenuItem).not.toBeVisible()
  })

  it('should trigger action when login button is clicked', () => {
    console.log = jest.fn()
    component = RenderWrapper(<HackerNewsPageHeader />)
    const loginButton = component.getByTestId(
      'HackerNewsPageHeader__loginButton',
    )
    fireEvent.click(loginButton)

    expect(console.log).toHaveBeenCalledWith('Login Clicked')
  })
})
