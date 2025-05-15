import { useForm, type SubmitHandler } from 'react-hook-form'
import { useCaptcha } from '~utils/useCaptcha'
import 'cross-fetch/polyfill'
import fetch from 'cross-fetch'

import * as styles from './ContactUsForm.css'

type ContactUsFormData = {
  name: string
  email: string
  message?: string
  captchaToken?: string
}

export const ContactUsForm = () => {
  const captcha = useCaptcha()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactUsFormData>()

  const onSubmit: SubmitHandler<ContactUsFormData> = async (data) => {
    try {
      const captchaToken = await captcha.execute()
      // Prepare data for Netlify
      const formData: Record<string, string> = {
        'form-name': 'contact',
        ...Object.fromEntries(Object.entries(data).filter(([, v]) => v !== undefined)),
        captchaToken,
      }

      const response = await fetch('/', {
        method: 'POST',
        body: new URLSearchParams(formData).toString(),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      if (response.ok) {
        console.log('Thanks for your submission!')
        reset()
      } else {
        console.error('Error sending form:', response.status)
      }
    } catch (error) {
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
    >
      <input type="hidden" name="form-name" value="contact" />
      <input type="hidden" name="bot-field" />
      <label htmlFor="contact-name">Name:</label>
      <input id="contact-name" type="text" {...register('name', { required: true })} />
      {errors.name && <span>This field is required</span>}

      <label htmlFor="contact-email">Email:</label>
      <input id="contact-email" type="email" {...register('email', { required: true })} />
      {errors.email && <span>This field is required</span>}

      <label htmlFor="contact-message">Message:</label>
      <textarea id="contact-message" {...register('message', { required: true })}></textarea>
      {errors.message && <span>This field is required</span>}

      <button type="submit">Send</button>
    </form>
  )
}
