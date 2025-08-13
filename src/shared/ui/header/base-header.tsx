import arrow from "~/assets/arrow.svg";

export   function BaseHeader() {
  return (
    <header className="flex gap-4 items-center p-4">
    <div className="flex flex-col">

    <div className="text-base">Horario</div>
    <b className="flex items-center">
      E11.1 Mataró
      <img src={arrow} alt="arrow" className="mx-1.5" />
      Barcelona
    </b>
    </div>

     

  </header>
  )
}
