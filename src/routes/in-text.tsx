import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/in-text')({
  component: InTextPage,
})

function InTextPage() {
  return <div className="p-2">Hello from InTextPage!</div>
}