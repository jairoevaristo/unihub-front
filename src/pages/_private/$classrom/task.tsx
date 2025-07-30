import { useEffect, useState } from 'react'
import { Calendar, Clock, Eye, FileText, Plus, Upload } from 'lucide-react'
import { useUser } from '@clerk/clerk-react'
import { toast } from 'sonner'
import { createFileRoute } from '@tanstack/react-router'
import { ProtectedRoute } from '@/components/protected-router'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'

interface Task {
  id: string
  title: string
  description: string
  dueDate: string
  subject: string
  attachments: Array<string>
  submissions: number
  totalStudents: number
}

interface TaskDetail extends Task {
  fullDescription: string
  requirements: Array<string>
}

export const Route = createFileRoute('/_private/$classrom/task')({
  component: () => (
    <ProtectedRoute>
      <TaskPage />
    </ProtectedRoute>
  ),
})

function TaskPage() {
  const { user } = useUser()
  const [tasks, setTasks] = useState<Array<Task>>([])
  const [selectedTask, setSelectedTask] = useState<TaskDetail | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    subject: '',
    requirements: '',
  })

  useEffect(() => {
    const mockTasks: Array<Task> = [
      {
        id: '1',
        title: 'Ensaio sobre Literatura Brasileira',
        description:
          'Escreva um ensaio de 3 páginas sobre o Romantismo no Brasil',
        dueDate: '2024-02-15',
        subject: 'Português',
        attachments: ['guia_ensaio.pdf'],
        submissions: 18,
        totalStudents: 28,
      },
      {
        id: '2',
        title: 'Exercícios de Matemática - Cap. 5',
        description: 'Resolva os exercícios 1 a 20 do capítulo 5',
        dueDate: '2024-02-18',
        subject: 'Matemática',
        attachments: ['exercicios_cap5.pdf'],
        submissions: 12,
        totalStudents: 28,
      },
      {
        id: '3',
        title: 'Relatório de Experimento',
        description: 'Relatório sobre o experimento de reações químicas',
        dueDate: '2024-02-20',
        subject: 'Química',
        attachments: ['roteiro_experimento.pdf', 'tabela_resultados.xlsx'],
        submissions: 8,
        totalStudents: 28,
      },
    ]
    setTasks(mockTasks)
  }, [])

  const handleCreateTask = () => {
    if (
      !newTask.title ||
      !newTask.description ||
      !newTask.dueDate ||
      !newTask.subject
    ) {
      toast.error('Preencha todos os campos obrigatórios.')
      return
    }

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      dueDate: newTask.dueDate,
      subject: newTask.subject,
      attachments: [],
      submissions: 0,
      totalStudents: 28,
    }

    setTasks([task, ...tasks])
    setNewTask({
      title: '',
      description: '',
      dueDate: '',
      subject: '',
      requirements: '',
    })
    setIsCreateDialogOpen(false)

    toast.success('Tarefa criada com sucesso!')
  }

  const handleViewTask = (task: Task) => {
    const taskDetail: TaskDetail = {
      ...task,
      fullDescription: `${task.description}\n\nEsta tarefa tem como objetivo avaliar o conhecimento adquirido durante as aulas. Certifique-se de seguir todas as instruções e entregar dentro do prazo estabelecido.`,
      requirements: [
        'Formato: PDF ou DOC',
        'Tamanho máximo: 10MB',
        'Fonte: Times New Roman, tamanho 12',
        'Espaçamento: 1.5',
      ],
    }
    setSelectedTask(taskDetail)
    setIsDetailDialogOpen(true)
  }

  const handleSubmitTask = () => {
    toast.success('Tarefa enviada com sucesso!')
    setIsDetailDialogOpen(false)
  }

  const getDaysUntilDue = (dueDate: string) => {
    const days = Math.ceil(
      (new Date(dueDate).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24),
    )
    return days
  }

  const getStatusBadge = (dueDate: string) => {
    const days = getDaysUntilDue(dueDate)
    if (days < 0) return <Badge variant="destructive">Atrasado</Badge>
    if (days <= 2) return <Badge variant="secondary">Urgente</Badge>
    return <Badge variant="default">No prazo</Badge>
  }

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Tarefas</h1>
          <p className="text-gray-600">
            {user?.unsafeMetadata.role === 'ADMIN'
              ? 'Gerencie as tarefas da sua turma'
              : 'Visualize e entregue suas tarefas'}
          </p>
        </div>

        {user?.unsafeMetadata.role === 'ADMIN' && (
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4" />
                Criar Tarefa
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-2xl mx-auto max-h-[90vh] overflow-y-auto px-4 sm:px-6">
              <DialogHeader>
                <DialogTitle>Nova Tarefa</DialogTitle>
                <DialogDescription>
                  Crie uma nova tarefa para os alunos
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título</Label>
                    <Input
                      id="title"
                      value={newTask.title}
                      onChange={(e) =>
                        setNewTask({ ...newTask, title: e.target.value })
                      }
                      placeholder="Digite o título da tarefa"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Matéria</Label>
                    <Input
                      id="subject"
                      value={newTask.subject}
                      onChange={(e) =>
                        setNewTask({ ...newTask, subject: e.target.value })
                      }
                      placeholder="Ex: Matemática, Português"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dueDate">Prazo de Entrega</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) =>
                      setNewTask({ ...newTask, dueDate: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={newTask.description}
                    onChange={(e) =>
                      setNewTask({ ...newTask, description: e.target.value })
                    }
                    placeholder="Descreva a tarefa"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">Requisitos (opcional)</Label>
                  <Textarea
                    id="requirements"
                    value={newTask.requirements}
                    onChange={(e) =>
                      setNewTask({ ...newTask, requirements: e.target.value })
                    }
                    placeholder="Liste os requisitos da tarefa"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">Upload de anexo</Label>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">
                        Clique para selecionar arquivos ou arraste aqui
                      </p>
                      <input type="file" className="hidden" multiple />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button onClick={handleCreateTask}>Criar Tarefa</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <Card key={task.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="flex items-center space-x-2">
                    <span>{task.title}</span>
                    {getStatusBadge(task.dueDate)}
                  </CardTitle>
                  <CardDescription className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <FileText className="h-4 w-4" />
                      <span>{task.subject}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(task.dueDate).toLocaleDateString('pt-BR')}
                      </span>
                    </span>
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center justify-end mt-3 space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewTask(task)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  {user?.unsafeMetadata.role === 'ADMIN'
                    ? 'Visualizar'
                    : 'Ver Detalhes'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{task.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {task.attachments.length > 0 && (
                    <span className="text-sm text-gray-600">
                      {task.attachments.length} arquivo(s) anexado(s)
                    </span>
                  )}
                </div>

                {user?.unsafeMetadata.role === 'ADMIN' && (
                  <span className="text-sm text-gray-600">
                    {task.submissions}/{task.totalStudents} entregas
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog de detalhes da tarefa */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="!max-w-4xl max-h-[90vh] overflow-y-auto px-4 sm:px-6">
          {selectedTask && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <span>{selectedTask.title}</span>
                  {getStatusBadge(selectedTask.dueDate)}
                </DialogTitle>
                <DialogDescription className="flex items-center space-x-4">
                  <span>{selectedTask.subject}</span>
                  <span>
                    Prazo:{' '}
                    {new Date(selectedTask.dueDate).toLocaleDateString('pt-BR')}
                  </span>
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Descrição</h3>
                  <p className="text-gray-700 whitespace-pre-line">
                    {selectedTask.fullDescription}
                  </p>
                </div>

                {selectedTask.requirements.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Requisitos</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedTask.requirements.map((req, index) => (
                        <li key={index} className="text-gray-700">
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedTask.attachments.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Arquivos Anexados</h3>
                    <div className="space-y-2">
                      {selectedTask.attachments.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 p-2 border rounded"
                        >
                          <FileText className="h-4 w-4" />
                          <span className="text-sm">{file}</span>
                          <Button variant="ghost" size="sm">
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {user?.unsafeMetadata.role === 'MEMBER' && (
                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-2">Enviar Tarefa</h3>
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600">
                          Clique para selecionar arquivos ou arraste aqui
                        </p>
                        <input type="file" className="hidden" multiple />
                      </div>

                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => setIsDetailDialogOpen(false)}
                        >
                          Cancelar
                        </Button>
                        <Button onClick={handleSubmitTask}>
                          <Upload className="h-4 w-4 mr-2" />
                          Enviar Tarefa
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
