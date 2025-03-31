"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerWithRangeProps extends React.HTMLAttributes<HTMLDivElement> {
  onDateChange?: (range: { startDate: Date | undefined; endDate: Date | undefined }) => void;
}

export function DatePickerWithRange({
  className,
  onDateChange,
}: DatePickerWithRangeProps) {
  const [date, setDate] = React.useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 10),
  });

  const handleDateChange = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate || { from: new Date(), to: addDays(new Date(), 10) });
    if (onDateChange) {
      onDateChange({
        startDate: selectedDate?.from || new Date(),
        endDate: selectedDate?.to || addDays(new Date(), 10),
      });
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover modal>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal  hover:bg-green-50",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon size={18} className="mr-2 text-black/60" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Escolha uma data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 border border-orange-400"
          align="start"
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={2}
            className="rounded-lg overflow-hidden"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
