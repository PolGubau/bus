import React, { useState } from "react";
 import { Header } from "../../../shared/ui/header/layout-header";
import { firstStop, secondStop } from "~/shared/data/stops";
  
/**
 * Converts hours and minutes to total minutes.
 */
const hoursAndMinutesToMinutes = (hours: number, minutes: number) =>
  hours * 60 + minutes;

/**
 * Formats minutes into human-readable hours/minutes.
 */
const minutesToHoursAndMinutes = (minutes: number): string => {
  const value = {
    hours: Math.floor(minutes / 60),
    minutes: minutes % 60,
  };
  return value.hours > 0
    ? `${value.hours} hrs. y ${value.minutes} min.`
    : `${value.minutes} min.`;
};

export const InText: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const currentTimeToMinutes = hoursAndMinutesToMinutes(
    new Date().getHours(),
    new Date().getMinutes()
  );

  const firstStopToMinutes = firstStop.map((stop) =>
    hoursAndMinutesToMinutes(stop.hour, stop.minute)
  );

  const findSoonestStop = firstStopToMinutes.map((stop) =>
    stop > currentTimeToMinutes ? stop - currentTimeToMinutes : 0
  );

  const formatMinute = (minute: number) =>
    minute === 0
      ? `${minute}0`
      : minute > 0 && minute < 10
      ? `0${minute}`
      : minute.toString();

  return (
    <div className="min-h-[90vh] flex flex-col p-8">
      <Header />

      <div className="flex-1 flex flex-col justify-center text-[28px] leading-10">
        {/* First stop */}
        <div className="mb-6">
          <div>El bus que sale de</div>
          <select className="appearance-none bg-transparent pr-6 border-0 text-[#005DD6] font-bold border-b-2 border-b-[#005DD633] outline-none bg-no-repeat bg-right"
            style={{
              backgroundImage:
                'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0i...")', // recorta tu base64 aquí
            }}
          >
            <option>pl. de les Tereses</option>
          </select>

          <div className="inline-block mr-2">a las</div>
          <select
            className="appearance-none bg-transparent pr-6 border-0 text-[#005DD6] font-bold border-b-2 border-b-[#005DD633] outline-none"
            value={selectedIndex}
            onChange={(e) => setSelectedIndex(Number(e.target.value))}
          >
            {firstStop.map((stop, index) => (
              <option value={index} key={index}>
                {stop.hour}:{formatMinute(stop.minute)}
              </option>
            ))}
          </select>

          {findSoonestStop[selectedIndex] > 0 && (
            <div
              className={`mt-2 ${
                findSoonestStop[selectedIndex] >= 15 ? "opacity-50" : ""
              }`}
            >
              quedan{" "}
              <span
                className={`inline-block ${
                  findSoonestStop[selectedIndex] < 15 ? "text-red-500" : ""
                }`}
              >
                {minutesToHoursAndMinutes(findSoonestStop[selectedIndex])}
              </span>
            </div>
          )}
        </div>

        {/* Second stop */}
        <div>
          <div>llegará a</div>
          <select className="appearance-none bg-transparent pr-6 border-0 text-[#005DD6] font-bold border-b-2 border-b-[#005DD633] outline-none">
            <option>rda. Universitat, 21</option>
          </select>

          <div className="inline-block mr-2">a las</div>
          <select
            className="appearance-none bg-transparent pr-6 border-0 text-[#005DD6] font-bold border-b-2 border-b-[#005DD633] outline-none"
            value={selectedIndex}
            onChange={(e) => setSelectedIndex(Number(e.target.value))}
          >
            {secondStop.map((stop, index) => (
              <option value={index} key={index}>
                {stop.hour}:{formatMinute(stop.minute)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

 