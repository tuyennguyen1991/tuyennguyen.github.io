import { renderHook, act } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { useScrollSpy } from './useScrollSpy'

class MockIntersectionObserver {
  callback: IntersectionObserverCallback
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback
  }
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}

describe('useScrollSpy', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="a"></div><div id="b"></div>'
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
  })

  it('defaults to the first section id', () => {
    const { result } = renderHook(() => useScrollSpy(['a', 'b']))
    expect(result.current).toBe('a')
  })

  it('updates active id when a section becomes the most visible', () => {
    let capturedCallback: IntersectionObserverCallback = () => {}
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(cb: IntersectionObserverCallback) {
          capturedCallback = cb
        }
        observe = vi.fn()
        unobserve = vi.fn()
        disconnect = vi.fn()
      },
    )

    const { result } = renderHook(() => useScrollSpy(['a', 'b']))

    act(() => {
      capturedCallback(
        [
          {
            isIntersecting: true,
            intersectionRatio: 0.9,
            target: document.getElementById('b'),
          } as unknown as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver,
      )
    })

    expect(result.current).toBe('b')
  })
})
