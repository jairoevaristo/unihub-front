'use client'

import { useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  MoreHorizontal,
  Search,
  Trash2,
} from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

const studentsData = [
  {
    id: 1,
    name: 'Ana Silva',
    email: 'ana.silva@email.com',
    imageUrl: '/placeholder.svg?height=40&width=40&text=AS',
    status: 'Ativo',
  },
  {
    id: 2,
    name: 'Bruno Santos',
    email: 'bruno.santos@email.com',
    imageUrl: '/placeholder.svg?height=40&width=40&text=BS',
    status: 'Ativo',
  },
  {
    id: 3,
    name: 'Carla Oliveira',
    email: 'carla.oliveira@email.com',
    imageUrl: '/placeholder.svg?height=40&width=40&text=CO',
    status: 'Inativo',
  },
  {
    id: 4,
    name: 'Diego Ferreira',
    email: 'diego.ferreira@email.com',
    imageUrl: '/placeholder.svg?height=40&width=40&text=DF',
    status: 'Ativo',
  },
  {
    id: 5,
    name: 'Elena Costa',
    email: 'elena.costa@email.com',
    imageUrl: '/placeholder.svg?height=40&width=40&text=EC',
    status: 'Ativo',
  },
  {
    id: 6,
    name: 'Felipe Lima',
    email: 'felipe.lima@email.com',
    imageUrl: '/placeholder.svg?height=40&width=40&text=FL',
    status: 'Inativo',
  },
  {
    id: 7,
    name: 'Gabriela Rocha',
    email: 'gabriela.rocha@email.com',
    imageUrl: '/placeholder.svg?height=40&width=40&text=GR',
    status: 'Ativo',
  },
  {
    id: 8,
    name: 'Henrique Alves',
    email: 'henrique.alves@email.com',
    imageUrl: '/placeholder.svg?height=40&width=40&text=HA',
    status: 'Ativo',
  },
  {
    id: 9,
    name: 'Isabela Martins',
    email: 'isabela.martins@email.com',
    imageUrl: '/placeholder.svg?height=40&width=40&text=IM',
    status: 'Ativo',
  },
  {
    id: 10,
    name: 'João Pedro',
    email: 'joao.pedro@email.com',
    imageUrl: '/placeholder.svg?height=40&width=40&text=JP',
    status: 'Inativo',
  },
  {
    id: 11,
    name: 'Larissa Souza',
    email: 'larissa.souza@email.com',
    imageUrl: '/placeholder.svg?height=40&width=40&text=LS',
    status: 'Ativo',
  },
  {
    id: 12,
    name: 'Mateus Ribeiro',
    email: 'mateus.ribeiro@email.com',
    imageUrl: '/placeholder.svg?height=40&width=40&text=MR',
    status: 'Ativo',
  },
]

export default function StudantsTable() {
  const [students, setStudents] = useState(studentsData)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [turmaFilter, setTurmaFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filtrar alunos baseado na pesquisa e filtros
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      statusFilter === 'all' || student.status === statusFilter
    const matchesTurma = turmaFilter === 'all'

    return matchesSearch && matchesStatus && matchesTurma
  })

  // Calcular paginação
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentStudents = filteredStudents.slice(startIndex, endIndex)

  // Resetar página quando filtros mudarem
  const handleFilterChange = () => {
    setCurrentPage(1)
  }

  const handleEdit = (studentId: number) => {
    console.log('Editar aluno:', studentId)
    // Implementar lógica de edição
  }

  const handleDelete = (studentId: number) => {
    console.log('Excluir aluno:', studentId)
    setStudents(students.filter((student) => student.id !== studentId))
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Lista de Alunos</CardTitle>
          <CardDescription>
            Gerencie os alunos da turma com facilidade
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Barra de pesquisa e filtros */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Pesquisar por nome ou email..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  handleFilterChange()
                }}
                className="pl-10"
              />
            </div>
            <Select
              value={statusFilter}
              onValueChange={(value) => {
                setStatusFilter(value)
                handleFilterChange()
              }}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Inativo">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tabela */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Foto</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentStudents.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-8 text-muted-foreground"
                    >
                      Nenhum aluno encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  currentStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={student.imageUrl || '/placeholder.svg'}
                            alt={student.name}
                          />
                          <AvatarFallback>
                            {getInitials(student.name)}
                          </AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium">
                        {student.name}
                      </TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            student.status === 'Ativo' ? 'default' : 'secondary'
                          }
                        >
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Abrir menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleEdit(student.id)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(student.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between space-x-2 py-4">
              <div className="text-sm text-muted-foreground">
                Mostrando {startIndex + 1} a{' '}
                {Math.min(endIndex, filteredStudents.length)} de{' '}
                {filteredStudents.length} alunos
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Anterior
                </Button>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="w-8 h-8 p-0"
                      >
                        {page}
                      </Button>
                    ),
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Próximo
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
