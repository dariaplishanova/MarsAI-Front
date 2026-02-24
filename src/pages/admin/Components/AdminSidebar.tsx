import { Calendar, Settings, Upload, X as XIcon } from 'lucide-react'
import  Button  from '@/components/ui/button'

type Festival = {
  id: string
  name: string
  status: string
}

type Props = {
  festivals: Festival[]
  selectedFestival: string
  onSelectFestival: (id: string) => void
  sidebarOpen: boolean
  onClose: () => void
  t: (key: string) => string
}

export function AdminSidebar({
  festivals,
  selectedFestival,
  onSelectFestival,
  sidebarOpen,
  onClose,
  t,
}: Props) {
  return (
    <aside
      className={`
        ${sidebarOpen ? 'fixed' : 'hidden lg:block'} 
        lg:relative top-30 lg:top-15 left-0 
        w-72 lg:w-64 h-[calc(100vh-120px)] lg:h-[calc(100vh-60px)]
        border-r border-border bg-background lg:bg-card/30 backdrop-blur-sm 
        p-4 z-30 overflow-auto
        ${sidebarOpen ? 'shadow-2xl' : ''}
      `}
    >
      {/* Close mobile */}
      <div className="lg:hidden absolute top-2 right-2 z-10">
        <Button variant="ghost" size="icon" onClick={onClose}>
          <XIcon className="w-4 h-4" />
        </Button>
      </div>

      {/* Festivals */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          {t('admin.festival.instance')}
        </h3>

        <div className="space-y-2">
          {festivals.map(festival => (
            <button
              key={festival.id}
              onClick={() => {
                onSelectFestival(festival.id)
                onClose()
              }}
              className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                selectedFestival === festival.id
                  ? 'bg-primary/10 text-primary border border-primary/50'
                  : 'hover:bg-muted text-muted-foreground'
              }`}
            >
              <div className="font-medium text-sm">{festival.name}</div>
              <div className="text-xs opacity-70">{festival.status}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 border-t border-border">
        <h3 className="text-sm font-semibold text-muted-foreground mb-3">
          Actions Rapides
        </h3>
        <div className="space-y-2">
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <Upload className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <Settings className="w-4 h-4 mr-2" />
            Paramètres
          </Button>
        </div>
      </div>
    </aside>
  )
}