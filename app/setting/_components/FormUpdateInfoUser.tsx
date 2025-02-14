'use client'

import React, { useEffect } from 'react'

import { z } from "zod"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

import { format } from 'date-fns';
import "react-day-picker/style.css";
import { DayPicker } from "react-day-picker";

import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useUpdateInfoUser } from '@/app/api/user/user';
import { showToast } from '@/lib/toast';

const formSchema = z.object({
  name: z.string().min(2).max(50),
  gender: z.string(),
  dateOfBirth: z.date().refine(
    (date) => date <= new Date() && date >= new Date("1900-01-01"),
    "Date of birth must be between 1900 and today"
  ),
  phoneNumber: z.string().optional(),
})

const FormUpdateInfoUser = ({ cancelUpdateInfo }: { cancelUpdateInfo: () => void }) => {
  const currUser = useSelector((state: RootState) => state.user.currUser)

  const { mutate: updateMutate, isSuccess } = useUpdateInfoUser()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: currUser.name,
      gender: currUser.gender || 'Male',
      dateOfBirth: new Date(currUser.dateOfBirth),
      phoneNumber: currUser.phoneNumber || '',
    }
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    const utcDateOfBirth = new Date(
      data.dateOfBirth.getTime() - data.dateOfBirth.getTimezoneOffset() * 60000
    );
    updateMutate({ ...data, dateOfBirth: utcDateOfBirth.toISOString() })
  }

  useEffect(() => {
    if (isSuccess) {
      showToast('Update info User', 'Update info successfully')
      cancelUpdateInfo()
    }
  }, [isSuccess, cancelUpdateInfo])

  return (
    <div className='bg-card p-4 rounded-md'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Name</FormLabel>
                <Input type='text' placeholder='Enter your name...' {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex gap-4"
                >
                  <FormItem className="flex items-center space-x-2">
                    <RadioGroupItem value="Male" id="Male" />
                    <FormLabel htmlFor="Male">Male</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <RadioGroupItem value="Female" id="Female" />
                    <FormLabel htmlFor="Female">Female</FormLabel>
                  </FormItem>
                </RadioGroup>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Phone number</FormLabel>
                <Input type='text' placeholder='Enter your phone number...' {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto py-4 px-32" align="center">
                    <DayPicker mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      // hideNavigation 
                      captionLayout="dropdown" />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Your date of birth is used to calculate your age.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-end gap-4'>
            <Button type="submit">Update</Button>
            <div onClick={cancelUpdateInfo} className='border px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground'>Cancel</div>
          </div>
        </form>
      </Form>

    </div>
  )
}

export default FormUpdateInfoUser