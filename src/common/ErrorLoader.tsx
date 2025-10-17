import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircleIcon, CheckCircle2Icon } from 'lucide-react'

export default function ErrorLoader() {
  return (
    <div className='min-h-[80vh] flex flex-col justify-center items-center'>
      <div className="grid w-full max-w-xl items-start gap-4">
        <Alert>
          <CheckCircle2Icon color='green' />
          <AlertTitle className='text-green-600'>Success! Your internet connection is working.</AlertTitle>
        </Alert>
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Unable to fetch content now</AlertTitle>
          <AlertDescription>
            <p>Please wait a moment and try again.</p>
            <ul className="list-inside list-disc text-sm">
              <li>Check your content category</li>
              <li>Possibly no content available</li>
              <li>Please contact admin for further help</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
