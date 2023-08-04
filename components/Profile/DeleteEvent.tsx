import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import axios from 'axios';
import { API_URL } from '@/lib/api';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import ScaleLoader from 'react-spinners/ScaleLoader';
interface UntrackEventProps {
  eventId: string;
}
export default function DeleteEvent({ eventId }: UntrackEventProps) {
  const [submitLoading, setSubmitLoading] = useState(false);
  const router = useRouter();
  const token = getCookie('token');

  const handleUntrackButton = async (eventId: string) => {
    setSubmitLoading(true);
    try {
      // Make the API call to delete the event
      await axios.delete(`${API_URL}/user/me/track-event/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubmitLoading(false);
      alert(`Successfully deleted!!`);
      router.reload();
    } catch (error) {
      alert(error);
      setSubmitLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="bg-[#de2929] font-bold  rounded-2xl p-2 hover:text-white text-white hover:bg-[#f40d0d]">
        Untrack Event
      </DialogTrigger>
      <DialogContent className="bg-black  text-white">
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently remove your
            tracked event.
          </DialogDescription>

          <button
            onClick={() => handleUntrackButton(eventId)}
            className="bg-[#de2929] font-bold py-4  rounded-2xl p-2 hover:text-white text-white hover:bg-[#f40d0d]"
          >
            {submitLoading ? (
              <ScaleLoader color="#d3dddb" height={4} width={4} />
            ) : (
              <span className="drop-shadow-lg">Yes, of course!</span>
            )}
          </button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
