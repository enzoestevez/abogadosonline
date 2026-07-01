import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface TimeSlot {
  time: string;
  available: boolean;
}

interface CalendarDay {
  date: Date;
  dayName: string;
  dayNumber: number;
  month: string;
  slots: TimeSlot[];
}

interface LandingCalendarProps {
  onSelectSlot?: (date: string, time: string) => void;
  consultationType?: string;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
}

export default function LandingCalendar({ 
  onSelectSlot, 
  consultationType = "consulta",
  clientName = "",
  clientEmail = "",
  clientPhone = ""
}: LandingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const saveAppointmentMutation = trpc.forms.saveAppointment.useMutation();

  // Generar próximos 14 días hábiles (Lunes a Viernes)
  const generateAvailableDays = (): CalendarDay[] => {
    const days: CalendarDay[] = [];
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1); // Comenzar desde mañana

    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

    while (days.length < 14) {
      const dayOfWeek = currentDate.getDay();

      // Solo agregar lunes a viernes (1-5)
      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        const slots: TimeSlot[] = [];

        // Generar horarios: 9:00 a 18:00 cada 30 minutos
        for (let hour = 9; hour < 18; hour++) {
          for (let minute of [0, 30]) {
            const timeStr = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
            slots.push({
              time: timeStr,
              available: Math.random() > 0.3, // 70% de disponibilidad
            });
          }
        }

        days.push({
          date: new Date(currentDate),
          dayName: dayNames[dayOfWeek],
          dayNumber: currentDate.getDate(),
          month: monthNames[currentDate.getMonth()],
          slots,
        });
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  };

  const availableDays = generateAvailableDays();
  const firstDay = availableDays[0];
  const currentSelectedDay = selectedDate ? availableDays.find((d) => d.date.toDateString() === selectedDate.toDateString()) : firstDay;

  const handleSelectSlot = async (day: CalendarDay, time: string) => {
    setSelectedDate(day.date);
    setSelectedTime(time);
    setError(null);
    setSuccess(false);
    
    // Si tenemos datos de cliente, guardar la cita
    if (clientName && clientEmail && clientPhone) {
      setIsLoading(true);
      try {
        const result = await saveAppointmentMutation.mutateAsync({
          consultationType,
          clientName,
          clientEmail,
          clientPhone,
          appointmentDate: day.date.toISOString().split("T")[0],
          appointmentTime: time,
        });
        
        if (result.success) {
          setSuccess(true);
          if (onSelectSlot) {
            onSelectSlot(day.date.toISOString().split("T")[0], time);
          }
        } else {
          setError(result.error || "Error al guardar la cita");
        }
      } catch (err) {
        setError(String(err));
      } finally {
        setIsLoading(false);
      }
    } else {
      // Solo callback si no hay datos de cliente
      if (onSelectSlot) {
        onSelectSlot(day.date.toISOString().split("T")[0], time);
      }
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Days Carousel */}
      <div className="space-y-3">
        <h3 className="font-bold text-gray-900">Selecciona un día</h3>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {availableDays.map((day, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedDate(day.date)}
              className={`flex-shrink-0 p-3 rounded-lg border-2 transition-all ${
                selectedDate?.toDateString() === day.date.toDateString()
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 bg-white hover:border-blue-300"
              }`}
            >
              <p className="text-xs font-semibold text-gray-600">{day.dayName}</p>
              <p className="text-lg font-bold text-gray-900">{day.dayNumber}</p>
              <p className="text-xs text-gray-500">{day.month}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Time Slots */}
      {currentSelectedDay && (
        <div className="space-y-3">
          <h3 className="font-bold text-gray-900">
            Horarios disponibles para {currentSelectedDay.dayName} {currentSelectedDay.dayNumber} de {currentSelectedDay.month}
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {currentSelectedDay.slots.map((slot, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectSlot(currentSelectedDay, slot.time)}
                disabled={!slot.available || isLoading}
                className={`p-2 rounded-lg border-2 font-semibold transition-all ${
                  !slot.available
                    ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                    : selectedTime === slot.time && selectedDate?.toDateString() === currentSelectedDay.date.toDateString()
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-300 bg-white text-gray-900 hover:border-green-500 hover:bg-green-50"
                }`}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <Card className="p-4 bg-red-50 border-red-200">
          <p className="text-sm text-red-600">{error}</p>
        </Card>
      )}

      {/* Selected Summary */}
      {selectedDate && selectedTime && (success || !clientName) && (
        <Card className={`p-4 ${success ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}`}>
          <p className="text-sm text-gray-600">Cita {success ? 'agendada' : 'seleccionada'} para:</p>
          <p className={`text-lg font-bold ${success ? 'text-green-700' : 'text-blue-700'}`}>
            {currentSelectedDay?.dayName} {currentSelectedDay?.dayNumber} de {currentSelectedDay?.month} a las {selectedTime}
          </p>
          {isLoading && <p className="text-sm text-gray-500 mt-2">Guardando...</p>}
        </Card>
      )}
    </div>
  );
}
