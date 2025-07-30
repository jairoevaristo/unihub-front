import { useEffect, useState } from 'react'
import { BookOpen, Calendar, Clock } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { UsersIcon } from '@/components/icons'

interface Task {
  id: string
  title: string
  dueDate: string
  subject: string
  status: 'pending' | 'completed'
}

export function StudentDashboard() {
  const [tasks, setTasks] = useState<Array<Task>>([])

  useEffect(() => {
    const mockTasks: Array<Task> = [
      {
        id: '1',
        title: 'Ensaio sobre Literatura Brasileira',
        dueDate: '2024-02-15',
        subject: 'Português',
        status: 'pending',
      },
      {
        id: '2',
        title: 'Exercícios de Matemática - Cap. 5',
        dueDate: '2024-02-18',
        subject: 'Matemática',
        status: 'pending',
      },
      {
        id: '3',
        title: 'Relatório de Experimento',
        dueDate: '2024-02-20',
        subject: 'Química',
        status: 'completed',
      },
    ]
    setTasks(mockTasks)
  }, [])

  const pendingTasks = tasks.filter((task) => task.status === 'pending')
  const completedTasks = tasks.filter((task) => task.status === 'completed')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard do Aluno</h1>
        <p className="text-gray-600">
          Bem-vindo de volta! Aqui está um resumo das suas atividades.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tarefas Pendentes
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingTasks.length}</div>
            <p className="text-xs text-muted-foreground">
              {pendingTasks.length === 1
                ? 'tarefa para entregar'
                : 'tarefas para entregar'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tarefas Concluídas
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTasks.length}</div>
            <p className="text-xs text-muted-foreground">
              {completedTasks.length === 1
                ? 'tarefa concluída'
                : 'tarefas concluídas'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alunos</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Número de alunos nessa disciplina
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Próximos Prazos</span>
            </CardTitle>
            <CardDescription>Tarefas com prazo próximo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-gray-600">{task.subject}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {new Date(task.dueDate).toLocaleDateString('pt-BR')}
                    </p>
                    <p className="text-xs text-gray-500">
                      {Math.ceil(
                        (new Date(task.dueDate).getTime() -
                          new Date().getTime()) /
                          (1000 * 60 * 60 * 24),
                      )}{' '}
                      dias
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Calendário de Atividades</CardTitle>
            <CardDescription>Visualização mensal dos prazos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                <div key={day} className="p-2 font-medium text-gray-500">
                  {day}
                </div>
              ))}
              {Array.from({ length: 35 }, (_, i) => {
                const day = i - 6
                const hasTask = tasks.some(
                  (task) =>
                    new Date(task.dueDate).getDate() === day &&
                    day > 0 &&
                    day <= 31,
                )
                return (
                  <div
                    key={i}
                    className={`p-2 text-sm ${
                      day > 0 && day <= 31
                        ? hasTask
                          ? 'bg-primary text-primary-foreground rounded-full'
                          : 'hover:bg-gray-100 rounded'
                        : 'text-gray-300'
                    }`}
                  >
                    {day > 0 && day <= 31 ? day : ''}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
