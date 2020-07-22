import OnLeaveIntent from '.'

describe('OnLeaveIntent', () => {
  let callback
  let onLeaveIntent
  const delay = 1000
  jest.useFakeTimers()

  beforeEach(() => {
    callback = jest.fn()
    onLeaveIntent = new OnLeaveIntent(callback, delay)
  })

  it('should run the callback function if the user goes out of the screen', () => {
    jest.advanceTimersByTime(delay)

    document.dispatchEvent(new MouseEvent('mouseout', { relatedTarget: null }))
    expect(callback).toHaveBeenCalled()
  })

  it('should not run the callback function if the user stills on the screen', () => {
    jest.advanceTimersByTime(delay)

    document.dispatchEvent(new MouseEvent('mouseout', { relatedTarget: new EventTarget() }))
    expect(callback).not.toHaveBeenCalled()
  })

  it('should not run the callback function before the delay', () => {
    jest.advanceTimersByTime(delay / 2)

    document.dispatchEvent(new MouseEvent('mouseout', { relatedTarget: null }))
    expect(callback).not.toHaveBeenCalled()
  })

  it('should run the callback function only once', () => {
    jest.advanceTimersByTime(delay)

    document.dispatchEvent(new MouseEvent('mouseout', { relatedTarget: null }))
    document.dispatchEvent(new MouseEvent('mouseout', { relatedTarget: null }))
    expect(callback).toHaveBeenCalledTimes(1)
  })
})
