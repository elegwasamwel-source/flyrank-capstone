import { describe, expect, it } from 'vitest'
import { validateSettings } from './settings'

describe('validateSettings', () => {
  it('requires display name and email', () => {
    const errors = validateSettings({
      displayName: '',
      email: '',
      company: '',
      theme: 'system',
      language: 'en',
      emailNotifications: true,
      weeklyDigest: false,
      aiSuggestions: true,
      autoSave: true,
    })

    expect(errors.displayName).toBeTruthy()
    expect(errors.email).toBeTruthy()
  })

  it('accepts valid input', () => {
    const errors = validateSettings({
      displayName: 'Alex',
      email: 'alex@example.com',
      company: 'FlyRank',
      theme: 'dark',
      language: 'en',
      emailNotifications: false,
      weeklyDigest: true,
      aiSuggestions: false,
      autoSave: false,
    })

    expect(Object.keys(errors)).toHaveLength(0)
  })
})
