'use client'

import React, { useEffect, useState } from 'react'

import { z } from 'zod';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { showToast } from '@/lib/toast'
import { RootState } from '@/store/store'
import { setCurrUser } from '@/store/userSlice'
import { useDispatch, useSelector } from 'react-redux'

import { useGetInfoCurrUser, useUpdateAvatar } from '@/app/api/user/user'

import { Camera } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';


import AvatarEditor from "react-avatar-editor";
import { Slider } from '@/components/ui/slider';

const formSchema = z.object({
  avatar: z
    .instanceof(File)
    .refine((file) => file.size <= 2 * 1024 * 1024, { message: "File must be smaller than 2MB" })
    .refine((file) => ["image/jpeg", "image/png"].includes(file.type), { message: "Only JPEG or PNG is allowed" })
});

const FormUpdateAvt = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const currUser = useSelector((state: RootState) => state.user.currUser)
  const dispatch = useDispatch()

  const [scale, setScale] = useState<number>(1);
  const [editor, setEditor] = useState<AvatarEditor | null>(null);

  const { data, isSuccess, refetch } = useGetInfoCurrUser()
  const { mutate: updateAvtMutate, isSuccess: updateSuccess } = useUpdateAvatar()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatar: undefined,
    }
  })

  const onSubmit = () => {
    if (editor) {
      const croppedImage = editor.getImageScaledToCanvas();

      croppedImage.toBlob((blob) => {
        if (blob) {
          const formData = new FormData();
          formData.append("avatar", blob, "avatar.jpg");

          updateAvtMutate(formData);
        }
      });
    }
  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const scale = parseFloat(e.target.value)
    setScale(scale / 10);
  };

  useEffect(() => {
    if (isSuccess && data)
      dispatch(setCurrUser({ data }))

    if (updateSuccess) {
      refetch()
      if (data)
        dispatch(setCurrUser({ data }))
      setPreviewImage(null)
      setScale(1)
      showToast('Update', 'Update Avatar Successfully!')
    }
  }, [data, updateSuccess, isSuccess, refetch, dispatch])

  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage)
      }
    };
  }, [previewImage]);

  return (
    <div className="p-4 flex gap-4">
      <Sheet>
        <SheetTrigger asChild>
          <div className="p-2 relative cursor-pointer">
            <Avatar className="w-24 h-24 p-1">
              <AvatarImage
                src={currUser.avatar === null ? '/avt.svg' : `data:image/jpg;base64,${currUser.avatar}`}
                alt="avt"
                className="rounded-full"
              />
              <AvatarFallback>avt</AvatarFallback>
            </Avatar>
            <Camera className="absolute bottom-0 right-0" />
          </div>
        </SheetTrigger>
        <SheetContent side="top" className="w-full sm:w-[540px] mx-auto my-12">
          <SheetHeader>
            <SheetTitle>Update Avatar</SheetTitle>
            <SheetDescription>
              Make changes to your avatar here. Click save when you&apos;re done.
            </SheetDescription>
          </SheetHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <Input
                      id="avtImg"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files ? e.target.files[0] : null
                        if (file) {
                          setPreviewImage(URL.createObjectURL(file))
                          field.onChange(file);
                        }
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="p-4 flex flex-col items-center justify-center">
                {
                  !previewImage ? <div className='w-full'>
                    <FormLabel htmlFor="avtImg" className="cursor-pointer w-full flex flex-col items-center justify-center">
                      <Avatar className="w-44 h-44 p-1 relative">
                        <AvatarImage
                          src={previewImage || (currUser.avatar === null ? '/avt.svg' : `data:image/jpg;base64,${currUser.avatar}`)}
                          alt="avt"
                          className="rounded-full"
                        />
                        <AvatarFallback>avt</AvatarFallback>
                      </Avatar>
                      <div className='flex w-full justify-start'>
                        <div className="mt-2 cursor-pointer border px-4 py-3 w-24 text-center rounded-md bg-primary text-primary-foreground">Upload</div>
                      </div>
                    </FormLabel>
                  </div>
                    : <>
                      <AvatarEditor
                        ref={(ref) => setEditor(ref)}
                        image={previewImage || (currUser.avatar === null ? '/avt.svg' : `data:image/jpg;base64,${currUser.avatar}`)}
                        width={300} height={300} border={50}
                        scale={scale}
                        borderRadius={300}
                      />
                      <div className='mt-2 w-full flex flex-col gap-2 justify-between items-start'>
                        <p>Zoom:</p>
                        <Slider defaultValue={[10]}
                          onChange={handleSliderChange}
                          min={10} max={30} step={1}
                          className='w-full cursor-pointer' />
                        <span>{scale.toFixed(1)}</span>
                        <div className='w-full flex justify-between'>
                          <SheetClose asChild>
                            <Button type="submit">Save changes</Button>
                          </SheetClose>
                          <div>
                            <FormLabel htmlFor="avtImg" className="cursor-pointer w-full flex flex-col items-center justify-center">
                              <div className="border border-input px-4 py-3 rounded-md bg-background hover:bg-accent hover:text-accent-foreground">Upload</div>
                            </FormLabel>
                          </div>
                        </div>
                      </div>
                    </>
                }
              </div>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
      <div className="p-4">
        <p className="font-semibold text-2xl mb-2">{currUser.name}</p>
        <p className="text-[#007aff] text-sm">{currUser.username}</p>
      </div>
    </div>
  )
}

export default FormUpdateAvt