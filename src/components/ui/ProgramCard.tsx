import { Calendar, Users } from 'lucide-react';
import { ProgramCardProps } from '@/types/home';
import { cn } from '../../utils/utils';
import Badge from './Badge';
import { Card, CardContent } from './Card';
import IconBadge from './IconBadge';

export default function ProgramCard({
  title,
  description,
  date,
  capacity,
  variant = 'default',
  iconVariant,
  icon: Icon,
  className,
}: ProgramCardProps) {
  return (
    <Card className={cn('flex h-full flex-col items-center p-4 text-center', className)} variant={variant}>
      <CardContent className="text-muted-foreground flex w-full flex-col items-center justify-center gap-2 text-sm">
        <IconBadge icon={Icon} variant={iconVariant} />
        <h3 className="mt-2 font-bold">{title}</h3>
        <p className="text-muted-foreground mb-6 text-sm">{description}</p>
        <Badge icon={<Calendar className="h-3 w-3" />} variant="text">
          {date}
        </Badge>
        <Badge icon={<Users className="h-3 w-3" />} variant="text">
          {capacity}
        </Badge>
      </CardContent>
    </Card>
  );
}
