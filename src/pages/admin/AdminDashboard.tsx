import { useState } from 'react';
import { Settings, Upload, Film, Users, Calendar, Globe, Palette, Youtube, Plus, Trash2, CheckCircle, Search, Eye, Check, X as XIcon, AlertCircle, TrendingUp, Menu, Icon, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card.js';
import  Button  from '@/components/ui/button.js';
import { Input } from '@/components/ui/form.js';
import { Label } from '@/components/ui/form.js';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.js';
import  Badge  from '@/components/ui/Badge.js';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.js';
import { useTranslation } from 'react-i18next';
import { AdminSidebar } from './Components/AdminSidebar.js';
import { StatsGrid } from './Components/StatsGrid.js';
import type {DashboardStat}  from './Components/StatsGrid.js';
import JuryPanel from './Components/JuryPanel.js';
import BrandingForm from './Components/BrandingForm.js';



const festivalInstances = [
  { id: '2026', name: 'Marseille 2026', year: 2026, status: 'active' },
  { id: '2027', name: 'Marseille 2027', year: 2027, status: 'à venir' },
  { id: '2025', name: 'Marseille 2025', year: 2025, status: 'archivé' },
];

const mockSubmissions = [
  {
    id: 1,
    title: 'Rêves Numériques',
    director: 'Marie Dubois',
    country: 'FR',
    status: 'validated',
    submittedAt: '2026-01-10',
    aiTools: ['Script', 'Image', 'Video'],
  },
  {
    id: 2,
    title: 'Visions de Silicium',
    director: 'John Smith',
    country: 'US',
    status: 'pending',
    submittedAt: '2026-01-12',
    aiTools: ['Image', 'Sound'],
  },
  {
    id: 3,
    title: 'Narrations Neuronales',
    director: 'Yuki Tanaka',
    country: 'JP',
    status: 'validated',
    submittedAt: '2026-01-08',
    aiTools: ['Script', 'Video', 'Sound'],
  },
  {
    id: 4,
    title: 'Art Algorithmique',
    director: 'Klaus Weber',
    country: 'DE',
    status: 'rejected',
    submittedAt: '2026-01-05',
    aiTools: ['Image'],
  },
  {
    id: 5,
    title: 'Mémoires Machines',
    director: 'Emma Thompson',
    country: 'GB',
    status: 'pending',
    submittedAt: '2026-01-14',
    aiTools: ['Script', 'Image', 'Video', 'Sound'],
  },
];

export function AdminDashboard() {
  const { t } = useTranslation();
  const [selectedFestival, setSelectedFestival] = useState(festivalInstances[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [brandingSettings, setBrandingSettings] = useState({
    logo: '',
    primaryColor: '#00F2FF',
    youtubeApiKey: '',
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
const [jury, setJury] = useState([
    { id: 1, email: 'jury1@test.com' },
    { id: 2, email: 'jury2@test.com' },
  ])
  const currentFestival = festivalInstances.find(f => f.id === selectedFestival);
  
  const stats: DashboardStat[] = [
    { label: t('admin.stats.films'), value: 247, icon: Film, color: 'text-primary' },
    { label: t('admin.stats.countries'), value: 42, icon: Users, color: 'text-primary'},
    { label: t('admin.stats.rating'), value: '7.8/10', icon: Palette, color: 'text-primary' },
    { label: t('admin.stats.selection'), value: 45, icon: TrendingUp, color: 'text-primary' },
  ];

  const filteredSubmissions = mockSubmissions.filter(sub => {
    if (searchQuery && !sub.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !sub.director.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (statusFilter !== 'all' && sub.status !== statusFilter) {
      return false;
    }
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'validated':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/50">{t('common.validated') || 'Validé'}</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">{t('common.pending') || 'En attente'}</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/50">{t('common.rejected') || 'Rejeté'}</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
   

      <div className="flex flex-col lg:flex-row mt-[60px]">
        {/* Mobile Header with Sidebar Toggle */}
        <div className="lg:hidden sticky top-[60px] z-20 bg-background/95 backdrop-blur-sm border-b border-border px-4 py-3 flex items-center justify-between">
          <div>
            <h3 className="font-medium text-card-foreground text-sm">Dashboard Admin</h3>
            <p className="text-xs text-muted-foreground">{currentFestival?.name}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="border-primary/30"
          >
            <Menu className="w-4 h-4 mr-2" />
            Menu
          </Button>
        </div>

        {/* Sidebar - Festival Instances - Responsive */}
        <AdminSidebar
  festivals={festivalInstances}
  selectedFestival={selectedFestival}
  onSelectFestival={setSelectedFestival}
  sidebarOpen={sidebarOpen}
  onClose={() => setSidebarOpen(false)}
  t={t}
/>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-20 top-[120px]"
          />
        )}

        {/* Main Content - Responsive */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {/* Stats Grid */}
          <div className="flex sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 md:mb-8">
            <StatsGrid stats={stats} />
             
        
          </div>

          {/* Configuration Tabs */}
          <Tabs defaultValue="submissions" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 md:mb-8 h-auto">
              <TabsTrigger value="submissions" className="gap-1 md:gap-2 text-xs md:text-sm py-2">
                <Film className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">Soumissions</span>
                <span className="sm:hidden">Films</span>
              </TabsTrigger>
              <TabsTrigger value="branding" className="gap-1 md:gap-2 text-xs md:text-sm py-2">
                <Palette className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">{t('admin.tabs.branding')}</span>
                <span className="sm:hidden">Style</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="gap-1 md:gap-2 text-xs md:text-sm py-2">
                <Users className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">{t('admin.tabs.users')}</span>
                <span className="sm:hidden">Jury</span>
              </TabsTrigger>
            </TabsList>

            {/* Submissions Table */}
            <TabsContent value="submissions">
              <Card className="border-border/50 bg-card/50">
                <CardHeader className="p-4 md:p-6">
                  <div className="flex flex-col gap-4">
                    <div>
                      <CardTitle className="text-lg md:text-xl">Gestion des Soumissions</CardTitle>
                      <CardDescription className="text-sm">
                        {currentFestival?.name} - {filteredSubmissions.length} soumission(s)
                      </CardDescription>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          placeholder="Rechercher..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 border-border/50"
                        />
                      </div>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full sm:w-40 border-border/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tous statuts</SelectItem>
                          <SelectItem value="pending">En attente</SelectItem>
                          <SelectItem value="validated">Validé</SelectItem>
                          <SelectItem value="rejected">Rejeté</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  {/* Mobile Cards View */}
                  <div className="block md:hidden space-y-3">
                    {filteredSubmissions.map((submission, index) => (
                      <motion.div
                        key={submission.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Card className="border-border/30 bg-background/50">
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h4 className="font-medium text-card-foreground mb-1">{submission.title}</h4>
                                  <p className="text-sm text-muted-foreground">{submission.director}</p>
                                </div>
                                {getStatusBadge(submission.status)}
                              </div>
                              
                              <div className="flex items-center gap-2 text-sm">
                                <Badge variant="dark" className="text-xs border-border/50">
                                  {submission.country}
                                </Badge>
                                <span className="text-muted-foreground">•</span>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(submission.submittedAt).toLocaleDateString('fr-FR')}
                                </span>
                              </div>

                              <div className="flex flex-wrap gap-1">
                                {submission.aiTools.map(tool => (
                                  <Badge key={tool} variant="green" className="text-xs bg-primary/10 border-primary/30">
                                    {t(`ai.${tool.toLowerCase()}`)}
                                  </Badge>
                                ))}
                              </div>

                              <div className="flex gap-2 pt-2">
                                <Button variant="outline" size="sm" className="flex-1">
                                  <Eye className="w-4 h-4 mr-1" />
                                  Voir
                                </Button>
                                {submission.status === 'pending' && (
                                  <>
                                    <Button variant="outline" size="sm" className="text-green-500 hover:text-green-400">
                                      <Check className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" size="sm" className="text-red-500 hover:text-red-400">
                                      <XIcon className="w-4 h-4" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  {/* Desktop Table View */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-border/50">
                        <tr className="text-left text-sm text-muted-foreground">
                          <th className="pb-3 font-medium">Titre</th>
                          <th className="pb-3 font-medium">Réalisateur</th>
                          <th className="pb-3 font-medium">Pays</th>
                          <th className="pb-3 font-medium">Outils IA</th>
                          <th className="pb-3 font-medium">Date</th>
                          <th className="pb-3 font-medium">Statut</th>
                          <th className="pb-3 font-medium text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredSubmissions.map((submission, index) => (
                          <motion.tr
                            key={submission.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="border-b border-border/30 hover:bg-muted/50 transition-colors"
                          >
                            <td className="py-4">
                              <div className="font-medium text-card-foreground">{submission.title}</div>
                            </td>
                            <td className="py-4 text-muted-foreground">{submission.director}</td>
                            <td className="py-4">
                              <Badge variant="green" className="text-xs border-border/50">
                                {submission.country}
                              </Badge>
                            </td>
                            <td className="py-4">
                              <div className="flex flex-wrap gap-1">
                                {submission.aiTools.slice(0, 2).map(tool => (
                                  <Badge key={tool} variant="dark" className="text-xs bg-primary/10 border-primary/30">
                                    {t(`ai.${tool.toLowerCase()}`)}
                                  </Badge>
                                ))}
                                {submission.aiTools.length > 2 && (
                                  <Badge variant="dark" className="text-xs bg-primary/10 border-primary/30">
                                    +{submission.aiTools.length - 2}
                                  </Badge>
                                )}
                              </div>
                            </td>
                            <td className="py-4 text-sm text-muted-foreground">
                              {new Date(submission.submittedAt).toLocaleDateString('fr-FR')}
                            </td>
                            <td className="py-4">{getStatusBadge(submission.status)}</td>
                            <td className="py-4">
                              <div className="flex gap-1 justify-end">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                {submission.status === 'pending' && (
                                  <>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-green-500 hover:text-green-400">
                                      <Check className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-400">
                                      <XIcon className="w-4 h-4" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {filteredSubmissions.length === 0 && (
                    <div className="text-center py-12">
                      <AlertCircle className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                      <p className="text-muted-foreground">Aucune soumission trouvée.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Branding Tab */}
            <TabsContent value="branding">
              <BrandingForm brandingSettings={brandingSettings} value={brandingSettings.primaryColor} onChange={setBrandingSettings} t={t} onSave={function (): void {
                console.log('Branding settings saved:', brandingSettings);
              }} onCancel={function (): void {
                console.log('Branding settings cancelled');
              }} />
            </TabsContent>

            {/* Users Tab */}
               <TabsContent value="users">
      <JuryPanel
        jury={jury}
        onAdd={(email) =>
          setJury((prev) => [
            ...prev,
            { id: Date.now(), email },
          ])
        }
        onRemove={(id) =>
          setJury((prev) => prev.filter((j) => j.id !== id))
        }
        t={t}
      />
    </TabsContent>
          </Tabs>
        </main>
      </div>

    </div>
  );
}