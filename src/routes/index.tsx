import { createFileRoute } from '@tanstack/react-router'
import { Timetable } from '~/global/pages/timetable/timetable'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <Timetable/>
  )
}
