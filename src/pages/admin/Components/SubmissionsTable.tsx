import  Badge  from '@/components/ui/Badge'
import  Button  from '@/components/ui/button'
import { Eye, Check, X } from 'lucide-react'

export function SubmissionsTable({ submissions, getStatusBadge, t }: any) {
  return (
    <table className="w-full">
      <thead>
        <tr className="text-left text-sm">
          <th>Titre</th>
          <th>Réalisateur</th>
          <th>IA</th>
          <th>Statut</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {submissions.map((s: any) => (
          <tr key={s.id} className="border-t">
            <td>{s.title}</td>
            <td>{s.director}</td>
            <td>
              {s.aiTools.map((t: string) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </td>
            <td>{getStatusBadge(s.status)}</td>
            <td className="flex gap-1 justify-end">
              <Button size="icon" variant="ghost">
                <Eye />
              </Button>
              {s.status === 'pending' && (
                <>
                  <Button size="icon" variant="ghost">
                    <Check />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <X />
                  </Button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}