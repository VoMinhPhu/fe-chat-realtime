'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAddFriend } from '@/app/api/friends/friends';

import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const formAddNewFriend = z.object({
  username: z.string().email({
    message: 'Username must be email',
  }),
});

const FormAddNewFriend = () => {
  const { mutate: addFriendMutate } = useAddFriend();

  const form = useForm<z.infer<typeof formAddNewFriend>>({
    resolver: zodResolver(formAddNewFriend),
    defaultValues: {
      username: '',
    },
  });

  function onSubmit(values: z.infer<typeof formAddNewFriend>) {
    addFriendMutate({ username: values.username });
    form.reset();
  }
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add new friends to start a conversation</DialogTitle>
            <DialogDescription>Enter your friend&apos;s username to add them to your friend list</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your friend's username..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Add</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormAddNewFriend;
