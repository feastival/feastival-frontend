import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { API_URL } from '@/lib/api';
import { getCookie } from 'cookies-next';
import { toast } from 'react-toastify';
import axios from 'axios';
import ImageKit from 'imagekit';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { useQueryClient } from '@tanstack/react-query';

type EditButtonProps = {
  username: string;
  email: string;
  imageUrl: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
};

interface IFormInput {
  username: string;
  email: string;
  imageUrl: string;
}

const publicKeyEnv = process.env.NEXT_PUBLIC_KEY as string;
const privateKeyEnv = process.env.NEXT_PUBLIC_PRIVATE_KEY as string;
const urlEndpointEnv = process.env.NEXT_PUBLIC_URL_ENDPOINT as string;

const imageKit = new ImageKit({
  publicKey: publicKeyEnv,
  privateKey: privateKeyEnv,
  urlEndpoint: urlEndpointEnv,
});

export default function EditButtonUser(props: EditButtonProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [formValues, setFormValues] = useState<IFormInput>({
    username: '',
    email: '',
    imageUrl: '',
  });

  const token = getCookie('token');
  const queryClient = useQueryClient();

  useEffect(() => {
    setFormValues({
      username: props.username,
      email: props.email,
      imageUrl: props.imageUrl,
    });
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    //const fileBuffer = await readFileAsBuffer(file);

    try {
      setIsUploading(true);
      const response = await imageKit.upload({
        file: file as any,
        fileName: `${Date.now()}-${file.name}`, // Provide a unique filename for each image
      });

      // Get the URL of the uploaded image from the response and save it to your user profile
      const imageUrl = response.url;

      toast.success('Profile image uploaded successfully! 😎', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });

      setFormValues((prevState) => ({
        ...prevState,
        imageUrl: imageUrl,
      }));
      setIsUploading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error(
        `Oops! Profile image upload failed, please try again later!`,
        {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        },
      );
      setIsUploading(false);
    }
  };

  // Helper function to read the file as a buffer
  const readFileAsBuffer = (file: File): Promise<Buffer> => {
    return new Promise<Buffer>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const buffer = Buffer.from(arrayBuffer);
        resolve(buffer);
      };
      reader.onerror = () => {
        reject(new Error('Error reading the file.'));
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const handleSubmit = async () => {
    //e: React.FormEvent<HTMLFormElement>
    //e.preventDefault();

    try {
      await axios.put(
        `${API_URL}/user/me`,
        { ...formValues },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      props.setUsername(formValues.username);
      props.setEmail(formValues.email);
      props.setImageUrl(formValues.imageUrl);
      queryClient.invalidateQueries();
      toast.success('Profile update successful! 😎', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      //router.push('/profile/me');
    } catch (error: any) {
      toast.error(`Oops! Profile update failed, please try again later!`, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-[#9747FF] shadow-md shadow-slate-400 font-bold text-lg rounded-2xl hover:text-white text-white hover:bg-[#ac77f1] ">
          Edit Profile
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-black text-white">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you`re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              className="col-span-3"
              value={formValues.username}
              onChange={(e) =>
                setFormValues((prevState) => ({
                  ...prevState,
                  username: e.target.value,
                }))
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              className="col-span-3"
              value={formValues.email}
              onChange={(e) =>
                setFormValues((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }))
              }
            />
          </div>
          <div className="grid max-w-sm mt-10 items-center text-center gap-1.5">
            <Label htmlFor="picture">Upload your profile image</Label>
            <Input id="picture" type="file" onChange={handleImageUpload} />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" onClick={handleSubmit} disabled={isUploading}>
              Save changes
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
