import { Card, CardContent } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/button'
import { Eye, Check, X } from 'lucide-react'

export function SubmissionCard({ submission, getStatusBadge, t }: any ) {
  return (
    <Card>
      <CardContent className="p-4 space-y-3">
        <div className="flex justify-between">
          <div>
            <h4 className="font-medium">{submission.title}</h4>
            <p className="text-sm text-muted-foreground">
              {submission.director}
            </p>
          </div>
          {getStatusBadge(submission.status)}
        </div>

        <div className="flex gap-1 flex-wrap">
          {submission.aiTools.map((tool: string) => (
            <Badge key={tool} variant="dark">
              {t(`ai.${tool.toLowerCase()}`)}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <Eye className="w-4 h-4 mr-1" /> Voir
          </Button>
          {submission.status === 'pending' && (
            <>
              <Button size="sm" variant="outline">
                <Check />
              </Button>
              <Button size="sm" variant="outline">
                <X />
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}