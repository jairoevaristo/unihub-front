import { useEffect, useState } from 'react'
import { Calendar, Plus, User } from 'lucide-react'
import { toast } from 'sonner'
import { useUser } from '@clerk/clerk-react'
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

interface News {
  id: string
  title: string
  content: string
  author: string
  date: string
}

export const Route = createFileRoute('/_private/$classrom/news')({
  component: () => (
    <ProtectedRoute>
      <NewsPage />
    </ProtectedRoute>
  ),
})

function NewsPage() {
  const { user } = useUser()
  const [news, setNews] = useState<Array<News>>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newNews, setNewNews] = useState({ title: '', content: '' })

  useEffect(() => {
    const mockNews: Array<News> = [
      {
        id: '1',
        title: 'Início do Novo Semestre Letivo',
        content:
          'Bem-vindos ao novo semestre! Estamos animados para começar mais um período de aprendizado e crescimento. Lembrem-se de verificar seus horários e materiais necessários.',
        author: 'Prof. João Silva',
        date: '2024-02-01',
      },
      {
        id: '2',
        title: 'Semana de Provas - Cronograma',
        content:
          'A semana de provas está se aproximando. Confiram o cronograma completo no portal do aluno e organizem seus estudos. Qualquer dúvida, procurem a coordenação.',
        author: 'Coordenação',
        date: '2024-01-28',
      },
      {
        id: '3',
        title: 'Projeto de Ciências - Inscrições Abertas',
        content:
          'Estão abertas as inscrições para o projeto de ciências deste semestre. Uma oportunidade única de aplicar conhecimentos teóricos em projetos práticos.',
        author: 'Prof. Maria Oliveira',
        date: '2024-01-25',
      },
    ]
    setNews(mockNews)
  }, [])

  const handleCreateNews = () => {
    if (!newNews.title || !newNews.content) {
      toast.warning('Preencha todos os campos obrigatórios.')
      return
    }

    const newsItem: News = {
      id: Date.now().toString(),
      title: newNews.title,
      content: newNews.content,
      author: user?.firstName || 'Autor',
      date: new Date().toISOString().split('T')[0],
    }

    setNews([newsItem, ...news])
    setNewNews({ title: '', content: '' })
    setIsDialogOpen(false)

    toast.success('Notícia criada com sucesso!')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notícias</h1>
          <p className="text-gray-600">
            Fique por dentro das últimas novidades
          </p>
        </div>

        {user?.unsafeMetadata.role === 'ADMIN' && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Cadastrar Notícia
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nova Notícia</DialogTitle>
                <DialogDescription>
                  Crie uma nova notícia para compartilhar com os alunos
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={newNews.title}
                    onChange={(e) =>
                      setNewNews({ ...newNews, title: e.target.value })
                    }
                    placeholder="Digite o título da notícia"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Conteúdo</Label>
                  <Textarea
                    id="content"
                    value={newNews.content}
                    onChange={(e) =>
                      setNewNews({ ...newNews, content: e.target.value })
                    }
                    placeholder="Digite o conteúdo da notícia"
                    rows={5}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button onClick={handleCreateNews}>Publicar</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid gap-6">
        {news.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription className="flex items-center space-x-4">
                <span className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{item.author}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(item.date).toLocaleDateString('pt-BR')}</span>
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{item.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
