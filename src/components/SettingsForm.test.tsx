import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SettingsForm } from './SettingsForm'

describe('SettingsForm', () => {
  const mockOnSubmit = vi.fn()

  beforeEach(() => {
    mockOnSubmit.mockClear()
  })

  const renderForm = (defaultValues = {}) => {
    return render(<SettingsForm defaultValues={defaultValues} onSubmit={mockOnSubmit} />)
  }

  describe('valid submission', () => {
    it('calls onSubmit with form data when all fields are valid', async () => {
      renderForm()

      await userEvent.type(screen.getByLabelText('Display Name'), 'John Doe')
      await userEvent.type(screen.getByLabelText('Email'), 'john@example.com')
      await userEvent.selectOptions(screen.getByLabelText('Theme'), 'dark')
      await userEvent.click(screen.getByLabelText('Email Notifications'))

      const saveButton = screen.getByRole('button', { name: 'Save' })
      expect(saveButton).not.toBeDisabled()

      await userEvent.click(saveButton)

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(
          {
            displayName: 'John Doe',
            email: 'john@example.com',
            theme: 'dark',
            emailNotifications: true,
          },
          expect.anything()
        )
      })
    })

    it('enables save button when form becomes valid', async () => {
      renderForm()

      const saveButton = screen.getByRole('button', { name: 'Save' })
      expect(saveButton).toBeDisabled()

      const displayNameInput = screen.getByLabelText('Display Name')
      await userEvent.type(displayNameInput, 'Jo')
      await userEvent.tab()
      expect(saveButton).toBeDisabled()

      const emailInput = screen.getByLabelText('Email')
      await userEvent.type(emailInput, 'test@example.com')
      await userEvent.tab()

      await waitFor(() => {
        expect(saveButton).not.toBeDisabled()
      })
    })
  })

  describe('invalid email', () => {
    it('shows inline error for invalid email on blur', async () => {
      renderForm()

      const emailInput = screen.getByLabelText('Email')
      await userEvent.type(emailInput, 'invalid-email')
      await userEvent.tab()

      await waitFor(() => {
        expect(screen.getByText('Invalid email address')).toBeInTheDocument()
      })

      const saveButton = screen.getByRole('button', { name: 'Save' })
      expect(saveButton).toBeDisabled()
    })

    it('shows inline error for empty email on blur', async () => {
      renderForm()

      const emailInput = screen.getByLabelText('Email')
      await userEvent.click(emailInput)
      await userEvent.tab()

      await waitFor(() => {
        expect(screen.getByText('Email is required')).toBeInTheDocument()
      })
    })

    it('clears email error when valid email is entered', async () => {
      renderForm()

      const emailInput = screen.getByLabelText('Email')
      await userEvent.type(emailInput, 'invalid')
      await userEvent.tab()

      await waitFor(() => {
        expect(screen.getByText('Invalid email address')).toBeInTheDocument()
      })

      await userEvent.type(emailInput, 'valid@example.com')
      await userEvent.tab()

      await waitFor(() => {
        expect(screen.queryByText('Invalid email address')).not.toBeInTheDocument()
      })
    })
  })

  describe('empty required field', () => {
    it('shows inline error for empty display name on blur', async () => {
      renderForm()

      const displayNameInput = screen.getByLabelText('Display Name')
      await userEvent.click(displayNameInput)
      await userEvent.tab()

      await waitFor(() => {
        expect(screen.getByText('Display name must be at least 2 characters')).toBeInTheDocument()
      })
    })

    it('shows inline error for display name with less than 2 characters', async () => {
      renderForm()

      const displayNameInput = screen.getByLabelText('Display Name')
      await userEvent.type(displayNameInput, 'J')
      await userEvent.tab()

      await waitFor(() => {
        expect(screen.getByText('Display name must be at least 2 characters')).toBeInTheDocument()
      })

      const saveButton = screen.getByRole('button', { name: 'Save' })
      expect(saveButton).toBeDisabled()
    })

    it('clears display name error when valid name is entered', async () => {
      renderForm()

      const displayNameInput = screen.getByLabelText('Display Name')
      await userEvent.type(displayNameInput, 'J')
      await userEvent.tab()

      await waitFor(() => {
        expect(screen.getByText('Display name must be at least 2 characters')).toBeInTheDocument()
      })

      await userEvent.type(displayNameInput, 'Jo')
      await userEvent.tab()

      await waitFor(() => {
        expect(screen.queryByText('Display name must be at least 2 characters')).not.toBeInTheDocument()
      })
    })
  })

  describe('accessibility', () => {
    it('has labels with htmlFor for all fields', () => {
      renderForm()

      expect(screen.getByLabelText('Display Name')).toBeInTheDocument()
      expect(screen.getByLabelText('Email')).toBeInTheDocument()
      expect(screen.getByLabelText('Theme')).toBeInTheDocument()
      expect(screen.getByLabelText('Email Notifications')).toBeInTheDocument()
    })

    it('associates error messages with inputs via aria-describedby', async () => {
      renderForm()

      const emailInput = screen.getByLabelText('Email')
      await userEvent.type(emailInput, 'invalid')
      await userEvent.tab()

      await waitFor(() => {
        expect(emailInput).toHaveAttribute('aria-describedby', 'email-error')
      })
    })
  })

  describe('default values', () => {
    it('populates fields with default values', () => {
      renderForm({
        displayName: 'Jane',
        email: 'jane@example.com',
        theme: 'light',
        emailNotifications: true,
      })

      expect(screen.getByLabelText('Display Name')).toHaveValue('Jane')
      expect(screen.getByLabelText('Email')).toHaveValue('jane@example.com')
      expect(screen.getByLabelText('Theme')).toHaveValue('light')
      expect(screen.getByLabelText('Email Notifications')).toBeChecked()
    })
  })
})