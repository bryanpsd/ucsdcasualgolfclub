/* global fetch */
import { useForm, type SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useCaptcha } from '~utils/useCaptcha'

import { Button } from '~components/Button/Button'

import * as styles from './ContactUsForm.css'

type ContactUsFormData = {
  name: string
  email: string
  message?: string
  'bot-field'?: string
  captchaToken?: string
}

export const ContactUsForm = () => {
  const captcha = useCaptcha()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ContactUsFormData>()

  const onSubmit: SubmitHandler<ContactUsFormData> = async (data) => {
    try {
      // Get captcha token and set it in the form state
      const captchaToken = await captcha.execute()
      setValue('captchaToken', captchaToken)
      // Prepare data for Netlify
      const formData: Record<string, string> = {
        'form-name': 'contact',
        ...Object.fromEntries(
          Object.entries({ ...data, captchaToken }).filter(([, v]) => v !== undefined)
        ),
      }

      const response = await fetch('/contact', {
        method: 'POST',
        body: new URLSearchParams(formData).toString(),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      if (response.ok) {
        toast.success('Form submitted successfully!')
        reset()
      } else {
        toast.error('There was a problem submitting the form. Please try again.')
        console.error('Error sending form:', response.status)
      }
    } catch (error) {
      toast.error('There was a problem submitting the form. Please try again.')
      console.error('Error sending form:', error)
    }
  }

  return (
    <form
      name="contact"
      className={styles.formWrapper}
      onSubmit={handleSubmit(onSubmit)}
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      noValidate
      method="POST"
    >
      <input type="hidden" name="form-name" value="contact" />
      <input type="hidden" {...register('bot-field')} />

      <div className={styles.formField}>
        <label htmlFor="contact-name">Name:</label>
        <input
          className={styles.input}
          id="contact-name"
          type="text"
          {...register('name', { required: true })}
        />
        {errors.name && <span className={styles.error}>Enter a Name</span>}
      </div>

      <div className={styles.formField}>
        <label htmlFor="contact-email">Email:</label>
        <input
          className={styles.input}
          id="contact-email"
          type="email"
          {...register('email', {
            required: 'Enter an Email address',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Enter a valid email address.',
            },
          })}
        />
        {errors.email && <span className={styles.error}>{errors.email.message}</span>}
      </div>

      <div className={styles.formField}>
        <label htmlFor="contact-message">Message:</label>
        <textarea
          className={styles.textarea}
          id="contact-message"
          {...register('message', { required: true })}
        ></textarea>
        {errors.message && <span className={styles.error}>Enter a message.</span>}
      </div>

      <div>
        <Button type="submit" color="primary" size="small" variant="contained">
          Submit
        </Button>
      </div>
    </form>
  )
}
