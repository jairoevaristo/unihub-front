import { useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { createCourse } from '@/services/create-course'

export function ModalCreateClassrom() {
  const { user } = useUser()
  const [name, setName] = useState('')

  const handleSubmit = () => {
    console.log(name, user)
    if (!name || !user) return

    createCourse(user.id, name).then((res) => console.log(res))
  }

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="bg-blue hover:bg-blue-dark h-10 rounded-sm font-semibold">
            Criar nova turma
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold leading-tight">
              Criar uma nova turma
            </DialogTitle>
            <DialogDescription className="text-xl mt-4">
              Qual o nome da sua turma?
            </DialogDescription>
          </DialogHeader>

          <Input
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome da turma"
            className="w-full h-12 font-semibold !text-lg"
          />

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button className="h-10" variant="outline">
                Fechar
              </Button>
            </DialogClose>
            <Button
              onClick={handleSubmit}
              type="submit"
              className="bg-blue h-10 font-semibold text-md hover:bg-blue-dark"
            >
              Criar uma turma
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
