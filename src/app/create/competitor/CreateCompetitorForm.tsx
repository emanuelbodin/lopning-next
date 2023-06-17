'use client'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import classnames from 'classnames'

import TextInput from '@components/form/TextInput'
import Spinner from '@components/Spinner'
import ButtonOutline from '@components/ui/ButtonOutline'

const validationSchema = z.object({
  name: z.string(),
})
type ValidationSchema = z.infer<typeof validationSchema>

export default function CreateCompetitorForm() {
  const [isLoading, setIsLoading] = useState(false)
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  })

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    setIsLoading(true)
    await fetch('/api/competitor', { method: 'POST', body: JSON.stringify(data) })
    setIsLoading(false)
    reset()
  }

  return (
    <div className="w-full max-w-xs text-slate-50 relative">
      {isLoading && (
        <div className="absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 z-10">
          <Spinner />
        </div>
      )}
      <h2 className="text-lg font-bold my-5">Create a new competitor</h2>
      <form
        className={classnames(
          'bg-gray-800',
          'shadow-md',
          'rounded',
          'px-8',
          'pt-6',
          'pb-8',
          'mb-4',
          { 'blur-sm': isLoading }
        )}
        onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          {...register('name')}
          label="Name"
          placeholder="Enter name"
          errorMessage={errors.name?.message}
        />
        <div className="flex justify-center">
          <ButtonOutline type="success">Submit</ButtonOutline>
        </div>
      </form>
    </div>
  )
}
