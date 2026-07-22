export type Theme = 'system' | 'light' | 'dark'

export type SettingsFormData = {
  displayName: string
  email: string
  company: string
  theme: Theme
  language: string
  emailNotifications: boolean
  weeklyDigest: boolean
  aiSuggestions: boolean
  autoSave: boolean
}

export type SettingsFormErrors = Partial<Record<keyof SettingsFormData, string>>

export const defaultSettings: SettingsFormData = {
  displayName: '',
  email: '',
  company: '',
  theme: 'system',
  language: 'en',
  emailNotifications: true,
  weeklyDigest: false,
  aiSuggestions: true,
  autoSave: true,
}

export function validateSettings(data: SettingsFormData): SettingsFormErrors {
  const errors: SettingsFormErrors = {}

  if (!data.displayName.trim()) {
    errors.displayName = 'Display name is required.'
  } else if (data.displayName.trim().length < 2) {
    errors.displayName = 'Display name must be at least 2 characters.'
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Enter a valid email address.'
  }

  return errors
}
