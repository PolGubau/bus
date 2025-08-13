import React, { useState, type ChangeEvent, useMemo } from "react";
import arrowLg from "~/assets/arrow-lg.svg";
import rootArrow from "~/assets/root-arrow.svg";
import { Header } from "../../../shared/ui/header/layout-header";
import { e11 } from "~/shared/data/stops";

type DayType = 0 | 1 | 2;

const hoursAndMinutesToMinutes = (hours: number, minutes: number) =>
  hours * 60 + minutes;

const currentTimeToMinutes = hoursAndMinutesToMinutes(
  new Date().getHours(),
  new Date().getMinutes()
);

const getDayType = (): DayType => {
  const day = new Date().getDay();
  if (day === 0) return 1;
  if (day < 5) return 0;
  if (day > 5) return 1;
  return 0;
};

const minuteToDoubleDigit = (minute: number): string =>
  minute < 10 ? `0${minute}` : `${minute}`;

const stopsAmount = e11.length;

export const Timetable: React.FC = () => {
  const [dayType, setDayType] = useState<DayType>(getDayType());
  const [stopLeave, setStopLeave] = useState<number>(0);
  const [stopArrive, setStopArrive] = useState<number>(stopsAmount - 1);

  const stopLeaveHours = e11[stopLeave].dayTypes[dayType].hours;
  const stopArriveHours = e11[stopArrive].dayTypes[dayType].hours;

  const firstStopInMinutes = stopLeaveHours.map((stop) =>
    hoursAndMinutesToMinutes(stop.hour, stop.minute)
  );

  const nextBusHourInMinutes = firstStopInMinutes.find(
    (m) => m > currentTimeToMinutes
  );
  const indexOfNextBusHourInMinutes = firstStopInMinutes.indexOf(
    nextBusHourInMinutes ?? -1
  );

  const firstStopList = useMemo(
    () =>
      stopLeaveHours.map((stop, index) => (
        <div
          key={index}
          className={`${
            index === indexOfNextBusHourInMinutes ? "text-red-500" : ""
          } text-xl md:text-5xl leading-[1.4]`}
        >
          {stop.hour}:{minuteToDoubleDigit(stop.minute)}
        </div>
      )),
    [stopLeaveHours, indexOfNextBusHourInMinutes]
  );

  const secondStopList = useMemo(
    () =>
      stopArriveHours.map((stop, index) => (
        <div key={index} className="text-xl md:text-5xl leading-[1.4]">
          {stop.hour}:{minuteToDoubleDigit(stop.minute)}
        </div>
      )),
    [stopArriveHours]
  );

  const linesList = useMemo(
    () =>
      stopLeaveHours.map((_, index) => (
        <div
          key={index}
          className="relative w-[16vw] h-[15px] -left-[8vw] top-2 mb-[17px] bg-center bg-no-repeat opacity-30 md:mb-[41px] md:top-5 md:w-[40vw] md:-left-[20vw]"
          style={{ backgroundImage: `url(${rootArrow})` }}
        />
      )),
    [stopLeaveHours]
  );

  const leaveStopNames = e11.map((stop, index) => (
    <option key={index} value={index} disabled={index === stopsAmount - 1}>
      {stop.name}
    </option>
  ));

  const arriveStopNames = e11.map((stop, index) => (
    <option key={index} value={index} disabled={index <= stopLeave}>
      {stop.name}
    </option>
  ));

  return (
    <div>
      {/* Top Section */}
      <div className="bg-white sticky top-0 px-6 pt-4 z-10   after:content-[''] after:block after:h-6 after:w-full after:left-0 after:bg-gradient-to-b after:from-[#f0f1f2] after:to-transparent after:absolute">
        <div className="border-b border-black/10 pb-4">
          {/* <Header /> */}
          <select
            value={dayType}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setDayType(Number(e.target.value) as DayType)
            }
            className="appearance-none font-inherit leading-inherit font-normal text-current pr-4 bg-transparent rounded-none border-0 bg-[url('./caret-down.svg')] bg-no-repeat bg-[top_10px_right] outline-none"
          >
            <option value="0">Día laboral</option>
            <option value="1">Fin de semana</option>
            <option value="2">Día festivo</option>
          </select>
        </div>

        {/* Stops */}
        <header className="flex items-center">
          <div className="w-1/2 my-4">
            <div className="text-[10px] leading-4 font-bold tracking-[.05em]">
              SALIDA
            </div>
            <select
              value={stopLeave}
              onChange={(e) => setStopLeave(Number(e.target.value))}
              className="w-full appearance-none pr-4 bg-transparent bg-[url('./caret-down.svg')] bg-no-repeat bg-[top_10px_right] outline-none"
            >
              {leaveStopNames}
            </select>
          </div>

          <div className="mx-5">
            <img src={arrowLg} alt="arrow" />
          </div>

          <div className="w-1/2 my-4">
            <div className="text-[10px] leading-4 font-bold tracking-[.05em]">
              LLEGADA
            </div>
            <select
              value={stopArrive}
              onChange={(e) => setStopArrive(Number(e.target.value))}
              className="w-full appearance-none pr-4 bg-transparent bg-[url('./caret-down.svg')] bg-no-repeat bg-[top_10px_right] outline-none"
            >
              {arriveStopNames}
            </select>
          </div>
        </header>
      </div>

      {/* Hours */}
      <div className="flex py-4 pb-12">
        <div className="w-1/2 text-center flex justify-center">
          <div>{firstStopList}</div>
        </div>

        <div className="w-0">{linesList}</div>

        <div className="w-1/2 text-center flex justify-center">
          <div>{secondStopList}</div>
        </div>
      </div>

      {/* Bottom shadow */}
      <div className="h-6 w-full bg-gradient-to-t from-[#f0f1f2] to-transparent sticky bottom-0" />
    </div>
  );
};

