import { Link } from '@tanstack/react-router'
import { TicketCheck } from 'lucide-react'
import { UsersIcon } from './icons'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'

type CardClassromProps = {
  CourseId: string
  Name: string
  Code: string
}

export function CardClassrom({ Code, CourseId, Name }: CardClassromProps) {
  return (
    <Link to="/$classrom/dashboard" params={{ classrom: CourseId }}>
      <Card className="cursor-pointer hover:-translate-y-1 transition-transform">
        <CardHeader>
          <CardTitle className="text-xl">{Name}</CardTitle>
          <CardDescription className="text-md">
            Professor Renato
          </CardDescription>
        </CardHeader>
        <CardFooter className="w-full mt-5">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <UsersIcon className="size-4" />
              <p className="text-muted-foreground text-sm">20 alunos</p>
            </div>
            <div className="flex items-center gap-2">
              <TicketCheck className="size-4" />
              <p className="text-muted-foreground text-sm">
                Código da turma: {Code}
              </p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
