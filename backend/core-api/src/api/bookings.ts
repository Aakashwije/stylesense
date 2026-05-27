import { Router, type Request, type Response } from 'express';
import { z } from 'zod';
import { HttpError } from '../middleware/error.js';
import { randomUUID } from 'crypto';

const bookingSchema = z.object({
  serviceId: z.string().min(1, 'Please select a service'),
  stylistId: z.string().min(1, 'Please select a stylist'),
  date: z.string().min(1, 'Please select a date'),
  timeSlot: z.string().min(1, 'Please select a time slot'),
  notes: z.string().max(500).optional(),
});

const rescheduleSchema = z.object({
  date: z.string().min(1, 'Please select a date'),
  timeSlot: z.string().min(1, 'Please select a time slot'),
});

const ratingSchema = z.object({
  rating: z.number().min(1).max(5),
  review: z.string().max(500).optional(),
});

interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  duration: number;
  price: number;
  discountPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  addOns: unknown[];
}

interface Booking {
  id: string;
  userId: string;
  stylistId: string;
  services: Service[];
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  totalAmount: number;
  notes?: string;
  createdAt: string;
}

const serviceCatalog: Record<string, Omit<Service, 'id'>> = {
  haircut: {
    name: 'Haircut & Style',
    category: 'haircut',
    description: 'A complete haircut and styling session',
    duration: 60,
    price: 3500,
    image: '/images/services/haircut.jpg',
    rating: 4.9,
    reviewCount: 240,
    addOns: [],
  },
  'full-color': {
    name: 'Full Color',
    category: 'coloring',
    description: 'Full-color transformation with expert care',
    duration: 120,
    price: 8000,
    image: '/images/services/full-color.jpg',
    rating: 4.8,
    reviewCount: 150,
    addOns: [],
  },
  'keratin-treatment': {
    name: 'Keratin Treatment',
    category: 'haircut',
    description: 'Smooth, frizz-free keratin treatment',
    duration: 180,
    price: 15000,
    image: '/images/services/keratin-treatment.jpg',
    rating: 4.9,
    reviewCount: 180,
    addOns: [],
  },
  highlights: {
    name: 'Highlights',
    category: 'coloring',
    description: 'Beautiful highlights to brighten your hair',
    duration: 150,
    price: 10500,
    image: '/images/services/highlights.jpg',
    rating: 4.7,
    reviewCount: 130,
    addOns: [],
  },
  blowout: {
    name: 'Blowout',
    category: 'haircut',
    description: 'Signature blowout for smooth, shiny hair',
    duration: 45,
    price: 2500,
    image: '/images/services/blowout.jpg',
    rating: 4.6,
    reviewCount: 80,
    addOns: [],
  },
  'signature-facial': {
    name: 'Signature Facial',
    category: 'spa',
    description: 'Relaxing facial treatment with premium products',
    duration: 75,
    price: 6500,
    image: '/images/services/signature-facial.jpg',
    rating: 4.8,
    reviewCount: 95,
    addOns: [],
  },
};

const bookings: Booking[] = [];

function formatBooking(serviceId: string, stylistId: string, date: string, timeSlot: string, notes?: string): Booking {
  const service = serviceCatalog[serviceId];
  if (!service) {
    throw new HttpError(400, 'Unknown service selected');
  }

  const startTime = timeSlot;
  const endTime = timeSlot;

  return {
    id: randomUUID(),
    userId: 'user-123',
    stylistId,
    services: [
      {
        id: serviceId,
        ...service,
      },
    ],
    date,
    startTime,
    endTime,
    status: 'confirmed',
    totalAmount: service.price,
    notes,
    createdAt: new Date().toISOString(),
  };
}

const router = Router();

router.get('/bookings', (_req: Request, res: Response) => {
  res.json({ appointments: bookings, total: bookings.length });
});

router.get('/bookings/:id', (req: Request, res: Response) => {
  const booking = bookings.find((b) => b.id === req.params.id);
  if (!booking) {
    throw new HttpError(404, 'Booking not found');
  }
  res.json(booking);
});

router.post('/bookings', (req: Request, res: Response) => {
  const result = bookingSchema.safeParse(req.body);
  if (!result.success) {
    throw new HttpError(400, 'Validation failed', result.error.format());
  }

  const booking = formatBooking(
    result.data.serviceId,
    result.data.stylistId,
    result.data.date,
    result.data.timeSlot,
    result.data.notes,
  );

  bookings.push(booking);
  res.status(201).json(booking);
});

router.patch('/bookings/:id/cancel', (req: Request, res: Response) => {
  const booking = bookings.find((b) => b.id === req.params.id);
  if (!booking) {
    throw new HttpError(404, 'Booking not found');
  }
  booking.status = 'cancelled';
  res.json({ message: 'Booking cancelled successfully' });
});

router.patch('/bookings/:id/reschedule', (req: Request, res: Response) => {
  const result = rescheduleSchema.safeParse(req.body);
  if (!result.success) {
    throw new HttpError(400, 'Validation failed', result.error.format());
  }

  const booking = bookings.find((b) => b.id === req.params.id);
  if (!booking) {
    throw new HttpError(404, 'Booking not found');
  }

  booking.date = result.data.date;
  booking.startTime = result.data.timeSlot;
  booking.status = 'rescheduled';

  res.json(booking);
});

router.post('/bookings/:id/rate', (req: Request, res: Response) => {
  const result = ratingSchema.safeParse(req.body);
  if (!result.success) {
    throw new HttpError(400, 'Validation failed', result.error.format());
  }

  const booking = bookings.find((b) => b.id === req.params.id);
  if (!booking) {
    throw new HttpError(404, 'Booking not found');
  }

  res.json({ message: 'Rating submitted successfully' });
});

export default router;
