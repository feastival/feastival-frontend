import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import DetailButton from './DetailButton';
import DeleteEvent from './DeleteEvent';
import { ClockLoader, ScaleLoader } from 'react-spinners';
interface UpcomingProps {
  events: any;
}
export default function Upcoming({ events }: UpcomingProps) {
  const formatToIDR = (data: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(data);
  };

  const dateOptions = {
    hour12: false,
    hour: '2-digit' as const,
    minute: '2-digit' as const,
    day: '2-digit' as const,
    month: 'long' as const,
    year: 'numeric' as const,
  };
  if (!events) {
    return (
      <div className="mb-20">
        <ScaleLoader color="black" height={50} className="text-center" />
      </div>
    );
  }
  return (
    <div>
      <Table className="text-center justify-center items-center shadow-md">
        <TableCaption></TableCaption>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="text-center">Date</TableHead>
            <TableHead className="text-center">Event Name</TableHead>
            <TableHead className="text-center">Artists</TableHead>
            <TableHead className="text-center">Venue</TableHead>
            <TableHead className="text-center">Ticket</TableHead>
            <TableHead className="text-center">More Info</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event: any) => (
            <TableRow key={event.id}>
              <TableCell className="font-medium">
                {' '}
                {event.startedAt.toLocaleString('en-gb', dateOptions)}
              </TableCell>
              <TableCell>{event.name}</TableCell>
              <TableCell>
                {event.artists ? event.artists : 'updating...'}
              </TableCell>
              <TableCell>
                {' '}
                {event.location.venue ? event.location.venue : 'updating...'}
              </TableCell>
              <TableCell className="">
                {' '}
                {event.price ? formatToIDR(event.price) : 'updating...'}
              </TableCell>
              <TableCell className="">
                <DetailButton />
                <DeleteEvent eventId={event.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
