import { useState, type FormEvent } from 'react'
import {
  defaultSettings,
  validateSettings,
  type SettingsFormData,
  type SettingsFormErrors,
} from '../types/settings'
import './SettingsForm.css'

type SettingsFormProps = {
  initialValues?: Partial<SettingsFormData>
  onSave?: (values: SettingsFormData) => void | Promise<void>
}

export function SettingsForm({ initialValues, onSave }: SettingsFormProps) {
  const [values, setValues] = useState<SettingsFormData>({
    ...defaultSettings,
    ...initialValues,
  })
  const [errors, setErrors] = useState<SettingsFormErrors>({})
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  function updateField<K extends keyof SettingsFormData>(
    key: K,
    value: SettingsFormData[K],
  ) {
    setValues((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
    setStatus('idle')
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validateSettings(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setStatus('error')
      return
    }

    setStatus('saving')

    try {
      await onSave?.(values)
      setStatus('saved')
    } catch {
      setStatus('error')
    }
  }

  function handleReset() {
    setValues({ ...defaultSettings, ...initialValues })
    setErrors({})
    setStatus('idle')
  }

  return (
    <form className="settings-form" onSubmit={handleSubmit} noValidate>
      <header className="settings-form__header">
        <div>
          <p className="settings-form__eyebrow">FlyRank</p>
          <h1>Settings</h1>
          <p className="settings-form__subtitle">
            Manage your profile, preferences, and AI assistant options.
          </p>
        </div>
        {status === 'saved' && (
          <p className="settings-form__status settings-form__status--success" role="status">
            Changes saved
          </p>
        )}
        {status === 'error' && Object.keys(errors).length > 0 && (
          <p className="settings-form__status settings-form__status--error" role="alert">
            Fix the highlighted fields to continue.
          </p>
        )}
      </header>

      <section className="settings-form__section" aria-labelledby="profile-heading">
        <h2 id="profile-heading">Profile</h2>
        <div className="settings-form__grid">
          <div className="settings-form__field">
            <label htmlFor="displayName">Display name</label>
            <input
              id="displayName"
              name="displayName"
              type="text"
              autoComplete="name"
              value={values.displayName}
              aria-invalid={Boolean(errors.displayName)}
              aria-describedby={errors.displayName ? 'displayName-error' : undefined}
              onChange={(event) => updateField('displayName', event.target.value)}
            />
            {errors.displayName && (
              <p id="displayName-error" className="settings-form__error">
                {errors.displayName}
              </p>
            )}
          </div>

          <div className="settings-form__field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
              onChange={(event) => updateField('email', event.target.value)}
            />
            {errors.email && (
              <p id="email-error" className="settings-form__error">
                {errors.email}
              </p>
            )}
          </div>

          <div className="settings-form__field settings-form__field--full">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              value={values.company}
              placeholder="Optional"
              onChange={(event) => updateField('company', event.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="settings-form__section" aria-labelledby="preferences-heading">
        <h2 id="preferences-heading">Preferences</h2>
        <div className="settings-form__grid">
          <div className="settings-form__field">
            <label htmlFor="theme">Theme</label>
            <select
              id="theme"
              name="theme"
              value={values.theme}
              onChange={(event) =>
                updateField('theme', event.target.value as SettingsFormData['theme'])
              }
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          <div className="settings-form__field">
            <label htmlFor="language">Language</label>
            <select
              id="language"
              name="language"
              value={values.language}
              onChange={(event) => updateField('language', event.target.value)}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
        </div>
      </section>

      <section className="settings-form__section" aria-labelledby="notifications-heading">
        <h2 id="notifications-heading">Notifications</h2>
        <div className="settings-form__toggles">
          <label className="settings-form__toggle">
            <input
              type="checkbox"
              checked={values.emailNotifications}
              onChange={(event) => updateField('emailNotifications', event.target.checked)}
            />
            <span>
              <strong>Email notifications</strong>
              <small>Receive updates about your account and activity.</small>
            </span>
          </label>

          <label className="settings-form__toggle">
            <input
              type="checkbox"
              checked={values.weeklyDigest}
              onChange={(event) => updateField('weeklyDigest', event.target.checked)}
            />
            <span>
              <strong>Weekly digest</strong>
              <small>Get a summary of your FlyRank insights every week.</small>
            </span>
          </label>
        </div>
      </section>

      <section className="settings-form__section" aria-labelledby="ai-heading">
        <h2 id="ai-heading">AI Assistant</h2>
        <div className="settings-form__toggles">
          <label className="settings-form__toggle">
            <input
              type="checkbox"
              checked={values.aiSuggestions}
              onChange={(event) => updateField('aiSuggestions', event.target.checked)}
            />
            <span>
              <strong>Inline suggestions</strong>
              <small>Show AI-powered suggestions while you work.</small>
            </span>
          </label>

          <label className="settings-form__toggle">
            <input
              type="checkbox"
              checked={values.autoSave}
              onChange={(event) => updateField('autoSave', event.target.checked)}
            />
            <span>
              <strong>Auto-save drafts</strong>
              <small>Automatically save AI-assisted content as you edit.</small>
            </span>
          </label>
        </div>
      </section>

      <footer className="settings-form__actions">
        <button type="button" className="settings-form__button settings-form__button--ghost" onClick={handleReset}>
          Reset
        </button>
        <button
          type="submit"
          className="settings-form__button settings-form__button--primary"
          disabled={status === 'saving'}
        >
          {status === 'saving' ? 'Saving…' : 'Save changes'}
        </button>
      </footer>
    </form>
  )
}
