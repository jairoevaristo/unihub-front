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

export function ModalClassromParticipant() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="bg-blue hover:bg-blue-dark h-10 rounded-sm font-semibold">
            Adicionar nova turma
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold leading-tight">
              <h1>Participe de uma turma</h1>
            </DialogTitle>
            <DialogDescription className="text-xl mt-4">
              Qual o código da sua turma?
            </DialogDescription>
          </DialogHeader>

          <Input
            autoFocus
            type="text"
            placeholder="Código da turma"
            className="w-full h-12 font-semibold !text-lg"
          />

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button className="h-10" variant="outline">
                Fechar
              </Button>
            </DialogClose>
            <Button className="bg-blue h-10 font-semibold text-md hover:bg-blue-dark">
              Entrar na turma
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
