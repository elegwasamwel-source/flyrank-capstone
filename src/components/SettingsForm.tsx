import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export const settingsSchema = z.object({
  displayName: z.string().min(2, 'Display name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  theme: z.enum(['system', 'light', 'dark']),
  emailNotifications: z.boolean(),
})

export type SettingsFormData = z.infer<typeof settingsSchema>

interface SettingsFormProps {
  defaultValues?: Partial<SettingsFormData>
  onSubmit: (data: SettingsFormData) => void
}

export function SettingsForm({ defaultValues, onSubmit }: SettingsFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      displayName: '',
      email: '',
      theme: 'system',
      emailNotifications: false,
      ...defaultValues,
    },
    mode: 'onBlur',
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="field">
        <label htmlFor="displayName">Display Name</label>
        <input
          id="displayName"
          type="text"
          {...register('displayName')}
          aria-invalid={!!errors.displayName}
          aria-describedby={errors.displayName ? 'displayName-error' : undefined}
        />
        {errors.displayName && (
          <span id="displayName-error" className="error" role="alert">
            {errors.displayName.message}
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <span id="email-error" className="error" role="alert">
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor="theme">Theme</label>
        <select
          id="theme"
          {...register('theme')}
          aria-invalid={!!errors.theme}
          aria-describedby={errors.theme ? 'theme-error' : undefined}
        >
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
        {errors.theme && (
          <span id="theme-error" className="error" role="alert">
            {errors.theme.message}
          </span>
        )}
      </div>

      <div className="field checkbox-field">
        <input
          id="emailNotifications"
          type="checkbox"
          {...register('emailNotifications')}
          aria-invalid={!!errors.emailNotifications}
        />
        <label htmlFor="emailNotifications">Email Notifications</label>
        {errors.emailNotifications && (
          <span id="emailNotifications-error" className="error" role="alert">
            {errors.emailNotifications.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className="save-button"
      >
        Save
      </button>
    </form>
  )
}